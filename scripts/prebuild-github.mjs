#!/usr/bin/env node
import { mkdir, readFile, writeFile } from 'fs/promises'

const LANGUAGE_COLORS = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Java: '#b07219',
  'C++': '#f34b7d',
  Go: '#00ADD8',
  Rust: '#dea584',
  Ruby: '#701516',
  PHP: '#4F5D95',
  Swift: '#ffac45',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',
  Shell: '#89e051',
}

function buildContributionMatrix(events, repos, weeks = 20) {
  const today = new Date()
  const activityMap = {}

  events.forEach(event => {
    const date = event.created_at.split('T')[0]
    activityMap[date] = (activityMap[date] || 0) + 1
  })

  repos.forEach(repo => {
    const pushDate = repo.pushed_at?.split('T')[0]
    if (pushDate) {
      activityMap[pushDate] = (activityMap[pushDate] || 0) + 1
    }
  })

  const days = []
  for (let w = weeks - 1; w >= 0; w--) {
    for (let d = 0; d < 7; d++) {
      const date = new Date(today)
      date.setDate(date.getDate() - (w * 7 + (6 - d)))
      const dateStr = date.toISOString().split('T')[0]
      const count = activityMap[dateStr] || 0

      let level = 0
      if (count > 0) level = 1
      if (count >= 3) level = 2
      if (count >= 6) level = 3
      if (count >= 10) level = 4

      days.push({ date: dateStr, count, level })
    }
  }

  return days
}

function parseEnv(text) {
  const out = {}
  text
    .split(/\r?\n/)
    .map(l => l.trim())
    .filter(l => l && !l.startsWith('#'))
    .forEach(line => {
      const idx = line.indexOf('=')
      if (idx === -1) return
      const key = line.slice(0, idx).trim()
      let val = line.slice(idx + 1).trim()
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1)
      }
      out[key] = val
    })
  return out
}

async function getToken() {
  // Prefer environment variables from CI
  if (process.env.GITHUB_TOKEN) return process.env.GITHUB_TOKEN
  if (process.env.VITE_GITHUB_TOKEN) return process.env.VITE_GITHUB_TOKEN

  // Fallback: parse .env.local if present (local dev)
  try {
    const txt = await readFile('.env.local', 'utf8')
    const env = parseEnv(txt)
    return env.VITE_GITHUB_TOKEN || null
  } catch {
    return null
  }
}

async function main() {
  const username = process.env.GITHUB_USERNAME || process.env.VITE_GITHUB_USERNAME || 's6ft256'
  const token = await getToken()
  if (!token) {
    console.warn('[prebuild-github] No token found; generating with unauthenticated API may hit rate limits or skip GraphQL contributions.')
  }

  const headers = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }

  const reqInit = { headers }

  // User
  const userRes = await fetch(`https://api.github.com/users/${username}`, reqInit)
  if (!userRes.ok) throw new Error(`Failed to fetch user: ${userRes.status}`)
  const user = await userRes.json()

  // Repos (paginate)
  const perPage = 100
  const repos = []
  for (let page = 1; page <= 10; page++) {
    const res = await fetch(
      `https://api.github.com/users/${username}/repos?per_page=${perPage}&page=${page}`,
      reqInit
    )
    if (!res.ok) throw new Error(`Failed to fetch repos page ${page}: ${res.status}`)
    const batch = await res.json()
    repos.push(...batch)
    if (batch.length < perPage) break
  }

  // Recent public events for fallback contributions
  const events = []
  for (let page = 1; page <= 3; page++) {
    try {
      const res = await fetch(
        `https://api.github.com/users/${username}/events/public?per_page=100&page=${page}`,
        reqInit
      )
      if (!res.ok) break
      const batch = await res.json()
      events.push(...batch)
      if (batch.length < 100) break
    } catch (err) {
      break
    }
  }

  // Totals
  const totalStars = repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0)
  const totalForks = repos.reduce((sum, r) => sum + (r.forks_count || 0), 0)

  // Languages
  const langCounts = {}
  for (const r of repos) {
    if (r.language) langCounts[r.language] = (langCounts[r.language] || 0) + 1
  }
  const topLanguages = Object.entries(langCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, count]) => ({ name, count, color: LANGUAGE_COLORS[name] || '#6e7681' }))

  // Top repos by stars (exclude forks)
  const topRepos = repos
    .filter(r => !r.fork)
    .sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0))
    .slice(0, 6)
    .map(r => ({ name: r.name, stars: r.stargazers_count || 0, forks: r.forks_count || 0, url: r.html_url }))

  // Contributions via GraphQL (exact calendar) when token is present
  let totalContributions = 0
  let contributionDays = []
  if (token) {
    const now = new Date()
    const from = new Date(now)
    from.setDate(from.getDate() - 20 * 7)
    const gqlRes = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'X-GitHub-Api-Version': '2022-11-28',
      },
      body: JSON.stringify({
        query: `query($login:String!,$from:DateTime!,$to:DateTime!){
          user(login:$login){
            contributionsCollection(from:$from,to:$to){
              contributionCalendar{ totalContributions weeks{ contributionDays{ date contributionCount } } }
            }
          }
        }`,
        variables: { login: username, from: from.toISOString(), to: now.toISOString() },
      }),
    })
    if (gqlRes.ok) {
      const gql = await gqlRes.json()
      const cal = gql?.data?.user?.contributionsCollection?.contributionCalendar
      if (cal) {
        totalContributions = cal.totalContributions || 0
        const days = []
        for (const w of cal.weeks || []) {
          for (const d of w.contributionDays || []) {
            const c = d.contributionCount || 0
            let level = 0
            if (c >= 1) level = 1
            if (c >= 3) level = 2
            if (c >= 6) level = 3
            if (c >= 10) level = 4
            days.push({ date: d.date, count: c, level })
          }
        }
        contributionDays = days
      }
    }
  }

  if (!contributionDays.length) {
    contributionDays = buildContributionMatrix(events, repos)
    totalContributions = contributionDays.reduce((sum, day) => sum + day.count, 0)
  }

  const out = {
    stats: {
      publicRepos: user.public_repos || 0,
      followers: user.followers || 0,
      totalStars,
      totalForks,
      totalContributions,
      topLanguages,
    },
    contributions: contributionDays,
    topRepos,
    generatedAt: new Date().toISOString(),
  }

  await mkdir('public/data', { recursive: true })
  await writeFile('public/data/github.json', JSON.stringify(out, null, 2))
  console.log('[prebuild-github] Wrote public/data/github.json')
}

main().catch(err => {
  console.error('[prebuild-github] Failed:', err?.message || err)
  process.exit(1)
})

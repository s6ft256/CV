import { useState, useEffect, useCallback } from 'react'
import Section from './Section'
import Card from './Card'
import { ContributionGrid, LanguageStats, StatsOverview, ContributionDay } from './github'

interface GitHubStats {
  publicRepos: number
  followers: number
  totalStars: number
  totalForks: number
  totalContributions: number
  topLanguages: { name: string; count: number; color: string }[]
}

const LANGUAGE_COLORS: Record<string, string> = {
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

type GitHubUserResponse = {
  public_repos: number
  followers: number
  following: number
}

type GitHubRepoResponse = {
  stargazers_count: number
  forks_count: number
  language?: string | null
  pushed_at?: string
  id: number
  name: string
  html_url: string
  homepage?: string | null
}

type GitHubEventResponse = {
  type: string
  repo: { name: string }
  created_at: string
  payload?: { commits?: { message?: string }[] }
}

type GQLContribDay = { date: string; contributionCount: number }
type GQLContribResponse = {
  data?: {
    user?: {
      contributionsCollection?: {
        contributionCalendar?: {
          totalContributions: number
          weeks: { contributionDays: GQLContribDay[] }[]
        }
      }
    }
  }
}

export default function GitHubStats() {
  const [stats, setStats] = useState<GitHubStats | null>(null)
  const [contributions, setContributions] = useState<ContributionDay[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const username = import.meta.env.VITE_GITHUB_USERNAME || 's6ft256'

  const fetchGitHubData = useCallback(async () => {
    try {
      const token = import.meta.env.VITE_GITHUB_TOKEN as string | undefined
      const headers: HeadersInit = {
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
      }
      if (token) headers['Authorization'] = `Bearer ${token}`
      const reqInit: RequestInit = { headers }

      const userRes = await fetch(`https://api.github.com/users/${username}`, reqInit)
      if (!userRes.ok) throw new Error('Failed to fetch GitHub data')
      const user: GitHubUserResponse = await userRes.json()

      // GitHub REST API allows up to 3 pages × 100 = 300 public events (the API hard limit)
      const events: GitHubEventResponse[] = []
      for (let page = 1; page <= 3; page++) {
        const res = await fetch(
          `https://api.github.com/users/${username}/events/public?per_page=100&page=${page}`,
          reqInit
        )
        if (!res.ok) break
        const batch: GitHubEventResponse[] = await res.json()
        events.push(...batch)
        if (batch.length < 100) break
      }

      // Fetch all repository pages to ensure totals are accurate
      const perPage = 100
      const repos: GitHubRepoResponse[] = []
      for (let page = 1; page <= 10; page++) {
        const res = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=${perPage}&page=${page}`,
          reqInit
        )
        if (!res.ok) throw new Error('Failed to fetch GitHub repos')
        const batch: GitHubRepoResponse[] = await res.json()
        repos.push(...batch)
        if (batch.length < perPage) break
      }

      const totalStars = repos.reduce(
        (sum: number, repo: GitHubRepoResponse) => sum + repo.stargazers_count,
        0
      )
      const totalForks = repos.reduce(
        (sum: number, repo: GitHubRepoResponse) => sum + repo.forks_count,
        0
      )

      const langCounts: Record<string, number> = {}
      repos.forEach((repo: GitHubRepoResponse) => {
        if (repo.language) {
          langCounts[repo.language] = (langCounts[repo.language] || 0) + 1
        }
      })

      const topLanguages = Object.entries(langCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([name, count]) => ({
          name,
          count,
          color: LANGUAGE_COLORS[name] || '#6e7681',
        }))

      // --- GraphQL contribution calendar (exact match to GitHub profile) ---
      let totalContributions = 0
      let usedGraphQL = false

      if (token) {
        try {
          const now = new Date()
          const from = new Date(now)
          from.setDate(from.getDate() - 20 * 7) // 20-week window
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
                    contributionCalendar{
                      totalContributions
                      weeks{ contributionDays{ date contributionCount } }
                    }
                  }
                }
              }`,
              variables: {
                login: username,
                from: from.toISOString(),
                to: now.toISOString(),
              },
            }),
          })
          if (gqlRes.ok) {
            const gql: GQLContribResponse = await gqlRes.json()
            const calendar = gql.data?.user?.contributionsCollection?.contributionCalendar
            if (calendar) {
              totalContributions = calendar.totalContributions
              const days: ContributionDay[] = calendar.weeks.flatMap(w =>
                w.contributionDays.map(d => {
                  const c = d.contributionCount
                  let level: 0 | 1 | 2 | 3 | 4 = 0
                  if (c >= 1) level = 1
                  if (c >= 3) level = 2
                  if (c >= 6) level = 3
                  if (c >= 10) level = 4
                  return { date: d.date, count: c, level }
                })
              )
              setContributions(days)
              usedGraphQL = true
            }
          }
        } catch {
          // fall through to event-based fallback
        }
      }

      if (!usedGraphQL) generateContributionMatrix(events, repos)

      setStats({
        publicRepos: user.public_repos,
        followers: user.followers,
        totalStars,
        totalForks,
        totalContributions,
        topLanguages,
      })
    } catch (err) {
      console.error('Error fetching GitHub data:', err)
      setError('Unable to load GitHub statistics')
    } finally {
      setLoading(false)
    }
  }, [username])

  useEffect(() => {
    fetchGitHubData()
  }, [fetchGitHubData])

  const generateContributionMatrix = (
    events: GitHubEventResponse[],
    repos: GitHubRepoResponse[]
  ) => {
    const today = new Date()
    const weeks = 20
    const days: ContributionDay[] = []

    const activityMap: Record<string, number> = {}
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

    for (let w = weeks - 1; w >= 0; w--) {
      for (let d = 0; d < 7; d++) {
        const date = new Date(today)
        date.setDate(date.getDate() - (w * 7 + (6 - d)))
        const dateStr = date.toISOString().split('T')[0]
        const count = activityMap[dateStr] || 0

        let level: 0 | 1 | 2 | 3 | 4 = 0
        if (count > 0) level = 1
        if (count >= 3) level = 2
        if (count >= 6) level = 3
        if (count >= 10) level = 4

        days.push({ date: dateStr, count, level })
      }
    }

    setContributions(days)
  }

  if (loading) {
    return (
      <Section
        id="github-stats"
        title="GitHub Activity"
        subtitle="Contribution matrix and activity overview"
      >
        <div className="space-y-8">
          {/* Stats skeleton */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Card key={i}>
                <div className="animate-pulse text-center">
                  <div className="h-7 bg-surface-hover rounded w-16 mx-auto mb-2" />
                  <div className="h-3 bg-surface-hover rounded w-24 mx-auto" />
                </div>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <div className="animate-pulse">
                  <div className="h-5 bg-surface-hover rounded w-40 mb-4" />
                  <div className="h-40 bg-surface-hover rounded" />
                </div>
              </Card>
            </div>
            <div>
              <Card>
                <div className="animate-pulse space-y-3">
                  <div className="h-5 bg-surface-hover rounded w-32" />
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="space-y-2">
                      <div className="h-4 bg-surface-hover rounded" />
                      <div className="h-2 bg-surface-hover rounded" />
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </Section>
    )
  }

  if (error || !stats) {
    return (
      <Section
        id="github-stats"
        title="GitHub Activity"
        subtitle="Contribution matrix and activity overview"
      >
        <div className="text-center text-muted">{error || 'Unable to load data'}</div>
      </Section>
    )
  }

  return (
    <Section
      id="github-stats"
      title="GitHub Activity"
      subtitle="Contribution matrix and activity overview"
    >
      <div className="space-y-8">
        <StatsOverview
          publicRepos={stats.publicRepos}
          totalStars={stats.totalStars}
          totalForks={stats.totalForks}
          followers={stats.followers}
          totalContributions={stats.totalContributions}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <h3 className="text-lg font-semibold text-text mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
                Contribution Activity
              </h3>
              <ContributionGrid contributions={contributions} />
            </Card>
          </div>

          <div>
            <Card>
              <h3 className="text-lg font-semibold text-text mb-4 flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
                Top Languages
              </h3>
              <LanguageStats languages={stats.topLanguages} totalRepos={stats.publicRepos} />
            </Card>
          </div>
        </div>

        <div className="text-center">
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors font-medium"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
            View Full GitHub Profile
          </a>
        </div>
      </div>
    </Section>
  )
}

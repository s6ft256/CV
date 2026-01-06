import { useState, useEffect } from 'react'
import Section from './Section'
import Card from './Card'

interface GitHubStats {
  publicRepos: number
  followers: number
  following: number
  totalStars: number
  totalForks: number
  topLanguages: { name: string; count: number; color: string }[]
  recentActivity: {
    type: string
    repo: string
    date: string
    message?: string
  }[]
}

interface ContributionDay {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
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

export default function GitHubStats() {
  const [stats, setStats] = useState<GitHubStats | null>(null)
  const [contributions, setContributions] = useState<ContributionDay[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const username = import.meta.env.VITE_GITHUB_USERNAME || 's6ft256'

  useEffect(() => {
    fetchGitHubData()
  }, [])

  const fetchGitHubData = async () => {
    try {
      // Fetch user profile and repos in parallel
      const [userRes, reposRes, eventsRes] = await Promise.all([
        fetch(`https://api.github.com/users/${username}`),
        fetch(`https://api.github.com/users/${username}/repos?per_page=100`),
        fetch(`https://api.github.com/users/${username}/events/public?per_page=30`),
      ])

      if (!userRes.ok || !reposRes.ok) throw new Error('Failed to fetch GitHub data')

      const user = await userRes.json()
      const repos = await reposRes.json()
      const events = eventsRes.ok ? await eventsRes.json() : []

      // Calculate stats
      const totalStars = repos.reduce((sum: number, repo: any) => sum + repo.stargazers_count, 0)
      const totalForks = repos.reduce((sum: number, repo: any) => sum + repo.forks_count, 0)

      // Count languages
      const langCounts: Record<string, number> = {}
      repos.forEach((repo: any) => {
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

      // Parse recent activity
      const recentActivity = events
        .filter((e: any) => ['PushEvent', 'CreateEvent', 'PullRequestEvent', 'IssuesEvent'].includes(e.type))
        .slice(0, 5)
        .map((e: any) => ({
          type: e.type.replace('Event', ''),
          repo: e.repo.name.split('/')[1],
          date: new Date(e.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          message: e.payload?.commits?.[0]?.message?.slice(0, 50) || undefined,
        }))

      setStats({
        publicRepos: user.public_repos,
        followers: user.followers,
        following: user.following,
        totalStars,
        totalForks,
        topLanguages,
        recentActivity,
      })

      // Generate contribution data (simulated from events since GraphQL requires auth)
      generateContributionMatrix(events, repos)

    } catch (err) {
      console.error('Error fetching GitHub data:', err)
      setError('Unable to load GitHub statistics')
    } finally {
      setLoading(false)
    }
  }

  const generateContributionMatrix = (events: any[], repos: any[]) => {
    const today = new Date()
    const weeks = 20 // Show ~5 months of data
    const days: ContributionDay[] = []

    // Create a map of activity dates from events
    const activityMap: Record<string, number> = {}
    events.forEach((event: any) => {
      const date = event.created_at.split('T')[0]
      activityMap[date] = (activityMap[date] || 0) + 1
    })

    // Add repo push dates
    repos.forEach((repo: any) => {
      const pushDate = repo.pushed_at?.split('T')[0]
      if (pushDate) {
        activityMap[pushDate] = (activityMap[pushDate] || 0) + 1
      }
    })

    // Generate days for the matrix
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

  const getContributionColor = (level: number) => {
    const colors = [
      'bg-gray-100 dark:bg-gray-800', // 0
      'bg-green-200 dark:bg-green-900', // 1
      'bg-green-400 dark:bg-green-700', // 2
      'bg-green-500 dark:bg-green-600', // 3
      'bg-green-600 dark:bg-green-500', // 4
    ]
    return colors[level] || colors[0]
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'Push':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
          </svg>
        )
      case 'Create':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        )
      case 'PullRequest':
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
        )
      default:
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        )
    }
  }

  if (loading) {
    return (
      <Section id="github-stats" title="GitHub Activity" subtitle="Contribution matrix and activity overview">
        <div className="text-center text-muted">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-primary border-r-transparent"></div>
          <p className="mt-2">Loading GitHub statistics...</p>
        </div>
      </Section>
    )
  }

  if (error || !stats) {
    return (
      <Section id="github-stats" title="GitHub Activity" subtitle="Contribution matrix and activity overview">
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
        {/* Stats Overview */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <Card>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{stats.publicRepos}</div>
              <div className="text-sm text-muted mt-1">Repositories</div>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-500">{stats.totalStars}</div>
              <div className="text-sm text-muted mt-1">Total Stars</div>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-500">{stats.totalForks}</div>
              <div className="text-sm text-muted mt-1">Total Forks</div>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-500">{stats.followers}</div>
              <div className="text-sm text-muted mt-1">Followers</div>
            </div>
          </Card>
          <Card>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-500">{stats.following}</div>
              <div className="text-sm text-muted mt-1">Following</div>
            </div>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Contribution Matrix */}
          <div className="lg:col-span-2">
            <Card>
              <h3 className="text-lg font-semibold text-text mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                Contribution Activity
              </h3>
              
              {/* Contribution Grid */}
              <div className="overflow-x-auto">
                <div className="inline-flex flex-col gap-0.5 min-w-max">
                  {/* Day labels */}
                  <div className="flex items-center gap-0.5 mb-1">
                    <div className="w-8"></div>
                    {['Mon', '', 'Wed', '', 'Fri', '', ''].map((day, i) => (
                      <div key={i} className="w-3 h-3 text-[8px] text-muted flex items-center justify-center">
                        {day}
                      </div>
                    ))}
                  </div>
                  
                  {/* Grid - 7 rows (days) x 20 cols (weeks) */}
                  {[0, 1, 2, 3, 4, 5, 6].map(dayIndex => (
                    <div key={dayIndex} className="flex gap-0.5">
                      <div className="w-8"></div>
                      {Array.from({ length: 20 }).map((_, weekIndex) => {
                        const contrib = contributions[weekIndex * 7 + dayIndex]
                        return (
                          <div
                            key={weekIndex}
                            className={`w-3 h-3 rounded-sm ${getContributionColor(contrib?.level || 0)} transition-colors cursor-pointer hover:ring-1 hover:ring-primary`}
                            title={contrib ? `${contrib.date}: ${contrib.count} contributions` : ''}
                          />
                        )
                      })}
                    </div>
                  ))}
                </div>
              </div>

              {/* Legend */}
              <div className="flex items-center justify-end gap-2 mt-4 text-xs text-muted">
                <span>Less</span>
                {[0, 1, 2, 3, 4].map(level => (
                  <div
                    key={level}
                    className={`w-3 h-3 rounded-sm ${getContributionColor(level)}`}
                  />
                ))}
                <span>More</span>
              </div>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Top Languages */}
            <Card>
              <h3 className="text-lg font-semibold text-text mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
                Top Languages
              </h3>
              <div className="space-y-3">
                {stats.topLanguages.map(lang => (
                  <div key={lang.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-text font-medium">{lang.name}</span>
                      <span className="text-muted">{lang.count} repos</span>
                    </div>
                    <div className="h-2 bg-surface-hover rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${(lang.count / stats.publicRepos) * 100}%`,
                          backgroundColor: lang.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Recent Activity */}
            <Card>
              <h3 className="text-lg font-semibold text-text mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Recent Activity
              </h3>
              <div className="space-y-3">
                {stats.recentActivity.length > 0 ? (
                  stats.recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3 text-sm">
                      <div className="text-primary mt-0.5">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-text truncate">{activity.repo}</span>
                          <span className="text-muted text-xs whitespace-nowrap">{activity.date}</span>
                        </div>
                        {activity.message && (
                          <p className="text-muted text-xs truncate">{activity.message}</p>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-muted text-sm">No recent activity</p>
                )}
              </div>
            </Card>
          </div>
        </div>

        {/* GitHub Profile Link */}
        <div className="text-center">
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors font-medium"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
            View Full GitHub Profile
          </a>
        </div>
      </div>
    </Section>
  )
}

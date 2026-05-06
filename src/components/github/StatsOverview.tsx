import Card from '../Card'

interface StatsOverviewProps {
  publicRepos: number
  totalStars: number
  totalForks: number
  followers: number
  totalContributions: number
}

export default function StatsOverview({
  publicRepos,
  totalStars,
  totalForks,
  followers,
  totalContributions,
}: StatsOverviewProps) {
  const stats = [
    {
      value: totalContributions,
      label: 'Contributions',
      color: 'text-green-500',
      hint: '(last 20 wks)',
    },
    { value: publicRepos, label: 'Repositories', color: 'text-primary', hint: undefined },
    { value: totalStars, label: 'Total Stars', color: 'text-yellow-500', hint: undefined },
    { value: totalForks, label: 'Total Forks', color: 'text-blue-500', hint: undefined },
    { value: followers, label: 'Followers', color: 'text-purple-500', hint: undefined },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      {stats.map(stat => (
        <Card key={stat.label}>
          <div className="text-center">
            <div className={`text-2xl md:text-3xl font-bold ${stat.color}`}>
              {Intl.NumberFormat().format(stat.value)}
            </div>
            <div className="text-xs md:text-sm text-muted mt-0.5">{stat.label}</div>
            {stat.hint && <div className="text-xs text-muted/60 mt-0.5">{stat.hint}</div>}
          </div>
        </Card>
      ))}
    </div>
  )
}

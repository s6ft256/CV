import Card from '../Card'

interface StatsOverviewProps {
  publicRepos: number
  totalStars: number
  totalForks: number
  followers: number
  following: number
}

export default function StatsOverview({ 
  publicRepos, 
  totalStars, 
  totalForks, 
  followers, 
  following 
}: StatsOverviewProps) {
  const stats = [
    { value: publicRepos, label: 'Repositories', color: 'text-primary' },
    { value: totalStars, label: 'Total Stars', color: 'text-yellow-500' },
    { value: totalForks, label: 'Total Forks', color: 'text-blue-500' },
    { value: followers, label: 'Followers', color: 'text-green-500' },
    { value: following, label: 'Following', color: 'text-purple-500' },
  ]

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      {stats.map(stat => (
        <Card key={stat.label}>
          <div className="text-center">
            <div className={`text-2xl md:text-3xl font-bold ${stat.color}`}>{stat.value}</div>
            <div className="text-xs md:text-sm text-muted mt-1">{stat.label}</div>
          </div>
        </Card>
      ))}
    </div>
  )
}

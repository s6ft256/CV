import { useTranslation } from 'react-i18next'
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
  const { t } = useTranslation()
  const stats = [
    {
      value: totalContributions,
      label: t('github.contributions'),
      color: 'text-green-500',
      hint: t('github.contributionsHint'),
    },
    { value: publicRepos, label: t('github.repositories'), color: 'text-primary', hint: undefined },
    { value: totalStars, label: t('github.totalStars'), color: 'text-yellow-500', hint: undefined },
    { value: totalForks, label: t('github.totalForks'), color: 'text-blue-500', hint: undefined },
    { value: followers, label: t('github.followers'), color: 'text-purple-500', hint: undefined },
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

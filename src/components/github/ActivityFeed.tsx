interface Activity {
  type: string
  repo: string
  date: string
  message?: string
}

interface ActivityFeedProps {
  activities: Activity[]
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

export default function ActivityFeed({ activities }: ActivityFeedProps) {
  if (activities.length === 0) {
    return <p className="text-muted text-sm">No recent activity</p>
  }

  return (
    <div className="space-y-3">
      {activities.map((activity, index) => (
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
      ))}
    </div>
  )
}

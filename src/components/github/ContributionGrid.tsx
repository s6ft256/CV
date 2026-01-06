interface ContributionDay {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

interface ContributionGridProps {
  contributions: ContributionDay[]
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

export default function ContributionGrid({ contributions }: ContributionGridProps) {
  return (
    <div>
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
    </div>
  )
}

export type { ContributionDay }

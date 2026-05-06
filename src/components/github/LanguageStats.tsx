interface Language {
  name: string
  count: number
  color: string
}

interface LanguageStatsProps {
  languages: Language[]
  totalRepos: number
}

export default function LanguageStats({ languages, totalRepos }: LanguageStatsProps) {
  return (
    <div className="space-y-3">
      {languages.map(lang => (
        <div key={lang.name}>
          <div className="flex justify-between items-center text-sm mb-1">
            <span className="inline-flex items-center gap-2 text-text font-medium">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: lang.color }}
                aria-hidden="true"
              />
              {lang.name}
            </span>
            <span className="text-muted">
              {Math.round((lang.count / totalRepos) * 100)}% · {lang.count} repos
            </span>
          </div>
          <div className="h-2 bg-surface-hover rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${(lang.count / totalRepos) * 100}%`,
                backgroundColor: lang.color,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

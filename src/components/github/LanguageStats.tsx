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
          <div className="flex justify-between text-sm mb-1">
            <span className="text-text font-medium">{lang.name}</span>
            <span className="text-muted">{lang.count} repos</span>
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

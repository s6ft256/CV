import { useTranslation } from 'react-i18next'

export default function LanguageSwitcher() {
  const { i18n } = useTranslation()

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'ar' : 'en')
  }

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card-bg border border-border hover:border-primary transition-colors"
      aria-label="Toggle language"
    >
      <span className="text-sm font-medium">{i18n.language === 'en' ? 'AR' : 'EN'}</span>
    </button>
  )
}

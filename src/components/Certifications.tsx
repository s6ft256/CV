import Section from './Section'
import Card from './Card'
import { certifications } from '../data/resume'

export default function Certifications() {
  return (
    <Section
      id="certifications"
      title="Certifications"
      subtitle="Professional certifications and credentials"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certifications.map(cert => (
          <Card key={cert.id} hover>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-primary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
              </div>
              <div className="flex-grow">
                <h3 className="text-lg font-bold text-text mb-1">{cert.name}</h3>
                <p className="text-sm text-primary font-medium mb-2">{cert.issuer}</p>
                <p className="text-xs text-muted">
                  Issued: {cert.issueDate}
                  {cert.expiryDate && ` • Expires: ${cert.expiryDate}`}
                </p>
                {cert.credentialUrl && (
                  <a
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary-dark text-sm font-medium mt-2 inline-block"
                  >
                    View Credential →
                  </a>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  )
}

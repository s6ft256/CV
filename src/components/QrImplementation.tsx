import Section from './Section'
import Card from './Card'

export default function QrImplementation() {
  return (
    <Section
      id="qr-implementation"
      title="QR Code Implementation at JBL5"
      subtitle="Innovative QR design for plant and equipment tracking"
      gradient
    >
      <Card hover glow="accent">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <img
            src="Qrcode Implementation-old.jpeg"
            alt="QR code implementation on plant and equipment at JBL5"
            className="w-full max-w-xs md:max-w-sm rounded shadow-glow border border-border"
          />
          <div>
            <h3 className="text-lg md:text-xl font-semibold mb-2">QR Code Design & Deployment</h3>
            <p className="text-muted mb-3">
              At JBL5, a custom QR code system was designed and implemented for plant and equipment.
              Each asset received a unique QR code, enabling instant access to maintenance records,
              safety documentation, and operational checklists via mobile devices.
            </p>
            <ul className="list-disc pl-5 text-muted space-y-1">
              <li>Streamlined equipment tracking and inspection workflows</li>
              <li>Reduced paperwork and improved data accuracy</li>
              <li>Enhanced safety compliance and audit readiness</li>
              <li>Empowered field teams with real-time information</li>
            </ul>
            <div className="mt-4 text-xs text-muted">
              Image: QR code label on plant equipment at JBL5 project site
            </div>
          </div>
        </div>
      </Card>
    </Section>
  )
}

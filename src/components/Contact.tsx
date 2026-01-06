import { useState, FormEvent } from 'react'
import Section from './Section'
import Card from './Card'
import Button from './Button'
import { personalInfo } from '../data/resume'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  // Formspree endpoint - set VITE_FORMSPREE_ENDPOINT in .env or replace with your form ID
  const formspreeEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT || 'https://formspree.io/f/YOUR_FORM_ID'

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('sending')

    try {
      const response = await fetch(formspreeEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `Portfolio Contact: ${formData.name}`,
        }),
      })

      if (response.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', message: '' })
        setTimeout(() => setStatus('idle'), 5000)
      } else {
        throw new Error('Form submission failed')
      }
    } catch (error) {
      console.error('Contact form error:', error)
      setStatus('error')
      setTimeout(() => setStatus('idle'), 5000)
    }
  }

  const contactMethods = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
      label: 'Email',
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
      label: 'GitHub',
      value: '@s6ft256',
      href: personalInfo.github,
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
      label: 'LinkedIn',
      value: 'Connect',
      href: personalInfo.linkedin,
    },
  ]

  return (
    <Section
      id="contact"
      title="Get In Touch"
      subtitle="Let's discuss your next project or opportunity"
      gradient
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
        {/* Contact Info */}
        <div className="space-y-8">
          <div>
            <h3 className="text-2xl font-bold text-text mb-4">Let's work together</h3>
            <p className="text-muted leading-relaxed">
              I'm always interested in hearing about new projects and opportunities. 
              Whether you have a question or just want to say hi, feel free to reach out!
            </p>
          </div>
          
          {/* Contact Methods */}
          <div className="space-y-4">
            {contactMethods.map((method) => (
              <a
                key={method.label}
                href={method.href}
                target={method.href.startsWith('http') ? '_blank' : undefined}
                rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="flex items-center gap-4 p-4 rounded-xl bg-card-bg/50 border border-border/50 hover:border-primary/30 hover:bg-primary/5 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-[var(--button-text)] transition-colors">
                  {method.icon}
                </div>
                <div>
                  <div className="text-sm text-muted">{method.label}</div>
                  <div className="text-text font-medium">{method.value}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
        
        {/* Contact Form */}
        <Card glow="accent">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-text mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                required
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 bg-bg/50 border border-border/50 rounded-xl text-text placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 bg-bg/50 border border-border/50 rounded-xl text-text placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-text mb-2">
                Message
              </label>
              <textarea
                id="message"
                required
                rows={5}
                value={formData.message}
                onChange={e => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 bg-bg/50 border border-border/50 rounded-xl text-text placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none transition-all"
                placeholder="Tell me about your project..."
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={status === 'sending'}
              className="w-full"
            >
              {status === 'sending' ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Sending...
                </span>
              ) : status === 'success' ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Sent!
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Send Message
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              )}
            </Button>

            {status === 'success' && (
              <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-center">
                <p className="text-green-400 text-sm">
                  Message sent successfully! I'll get back to you soon.
                </p>
              </div>
            )}
            {status === 'error' && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-center">
                <p className="text-red-400 text-sm">
                  Something went wrong. Please try again.
                </p>
              </div>
            )}
          </form>
        </Card>
      </div>
    </Section>
  )
}

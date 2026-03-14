import { contactLinks, contactInfo } from '@/lib/data'

export function ContactSection() {
  return (
    <div className="space-y-3">
      <p className="text-green-400 font-bold">[CONTACT INFORMATION]</p>
      <div className="space-y-1">
        {contactLinks.map(({ label, display, href }) => (
          <div key={label} className="flex gap-2">
            <span className="text-cyan-400 w-20 shrink-0">{label}:</span>
            <a
              href={href}
              target={href.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-cyan-300 hover:underline transition-colors"
            >
              {display}
            </a>
          </div>
        ))}
        {contactInfo.map(({ label, value }) => (
          <div key={label} className="flex gap-2">
            <span className="text-cyan-400 w-20 shrink-0">{label}:</span>
            <span className="text-gray-300">{value}</span>
          </div>
        ))}
      </div>
      <div className="pt-1 space-y-1">
        <p className="text-gray-400">Feel free to reach out for opportunities, collaborations, or just to chat about tech!</p>
        <p className="text-gray-500">Response time: usually within 24 hours</p>
      </div>
    </div>
  )
}

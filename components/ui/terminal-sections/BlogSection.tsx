import { articles, devToUrl } from '@/lib/data'

const statusColors = {
  published: 'text-green-400',
  draft:     'text-yellow-400',
  planned:   'text-gray-500',
} as const

const statusLabel = {
  published: '[PUBLISHED]',
  draft:     '[DRAFT]    ',
  planned:   '[PLANNED]  ',
} as const

export function BlogSection() {
  return (
    <div className="space-y-5">
      <p className="text-green-400 font-bold">[BLOG & WRITING]</p>
      <p className="text-gray-500 text-sm">
        Technical writing on Angular, AI tooling, and frontend engineering.{' '}
        <a
          href={devToUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-400 hover:text-purple-300 hover:underline transition-colors"
        >
          dev.to/moemenali
        </a>
      </p>
      {articles.map((article) => (
        <div key={article.title} className="space-y-1">
          <div className="flex items-start gap-3">
            <span className={`text-xs font-mono shrink-0 pt-0.5 ${statusColors[article.status]}`}>
              {statusLabel[article.status]}
            </span>
            <div className="space-y-0.5">
              {article.link ? (
                <a
                  href={article.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 hover:underline transition-colors font-semibold"
                >
                  {article.title}
                </a>
              ) : (
                <p className="text-white font-semibold">{article.title}</p>
              )}
              <p className="text-gray-400 text-sm">{article.description}</p>
              <p className="text-gray-600 text-xs">
                {article.tags.map((tag) => `#${tag}`).join('  ')}
              </p>
            </div>
          </div>
        </div>
      ))}
      <p className="text-gray-600 text-sm pt-2">
        More articles at{' '}
        <a
          href={devToUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-400 hover:text-purple-300 hover:underline transition-colors"
        >
          {devToUrl}
        </a>
      </p>
    </div>
  )
}

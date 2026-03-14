// lib/data.ts

// ── ABOUT ─────────────────────────────────────────────────────────────────────

export const aboutFields = [
  { label: 'Name',       value: "Mo'men El-Sayeh" },
  { label: 'Role',       value: 'Senior Frontend Engineer' },
  { label: 'Location',   value: 'Egypt' },
  { label: 'Experience', value: '4+ years in production SaaS environments' },
  { label: 'Status',     value: 'Open to new opportunities' },
]

export const bio =
  'Frontend Engineer with 4+ years building large-scale Angular applications in production SaaS ' +
  'environments. Strong focus on frontend architecture, performance optimization, and reusable ' +
  'systems across multiple products. Passionate about AI and actively integrates AI-assisted ' +
  'workflows and tooling — LLM-powered features, automation, and agentic tools.'

export const credibilityStats = [
  { label: 'Companies',     value: 'TrianglZ LLC · Enozom Software' },
  { label: 'Products live', value: '4 production products, KSA · UAE · Qatar' },
  { label: 'UI library',    value: '80+ components serving 4 products' },
  { label: 'Tech sessions', value: 'AI tooling (n8n, BMAD, Claude Code), Angular Signals' },
]

// ── PROJECTS ──────────────────────────────────────────────────────────────────

export type Project = {
  title: string
  company: string
  stack: string
  bullets: string[]
  challenge?: string
  liveDemo?: string
  github?: string
}

export const projects: Project[] = [
  {
    title: 'Daycare — YNMO Core Product',
    company: 'TrianglZ LLC',
    stack: 'Angular, Angular Signals, NGXS, SCSS',
    bullets: [
      'Owned end-to-end delivery for 200+ daycare centers across KSA, UAE & Qatar',
      'Led cross-functional team (Frontend, Backend, Mobile, QC, PM)',
      'Extended platform internationalization from 2 to 8 languages across GCC region',
    ],
    challenge:
      'Calendar page was loading in 5–6 s due to deeply nested reactive forms. ' +
      'Refactored to signal-based architecture → reduced load time to 1.2 s (~75% improvement).',
  },
  {
    title: 'Shared UI Component Library',
    company: 'TrianglZ LLC',
    stack: 'Angular, Storybook, SCSS',
    bullets: [
      'Architected a library of 80+ components serving 4 production products',
      'Reduced duplication across white-label and core YNMO offerings',
    ],
    challenge:
      'Four separate products were duplicating UI logic with inconsistent behaviour. ' +
      'Designed a shared token-based design system with Storybook docs consumed by all products.',
  },
  {
    title: 'Messaging & Live Chat Module',
    company: 'TrianglZ LLC',
    stack: 'Angular, Matrix server, TypeScript',
    bullets: [
      'Built and shipped real-time messaging (Matrix server + Angular) as a reusable library',
      'Adopted by 100+ daycare centers, structured for drop-in multi-product integration',
    ],
    challenge:
      'Matrix protocol has no official Angular SDK. Built a thin Angular service layer ' +
      'on top of matrix-js-sdk, encapsulated all side-effects, and published as an internal library.',
  },
  {
    title: 'Website Builder Platform',
    company: 'TrianglZ LLC',
    stack: 'Angular Signals, Firebase, service-based state management',
    bullets: [
      'Co-architected platform using Firebase and Angular Signals for multi-product rollout',
      'Scoped for Feb 2026 launch — independently deployable per white-label brand',
    ],
    challenge:
      'Needed a single builder codebase to power multiple white-label brands ' +
      'with zero shared-state leakage. Solved via strict module boundaries + Firebase tenant isolation.',
  },
  {
    title: 'AI Assistant Backend Service',
    company: 'TrianglZ LLC',
    stack: 'NestJS, TypeScript, LLM APIs',
    bullets: [
      'Co-built NestJS service for summarizing assessments and reports via LLM',
      'Shipped to production as a live premium feature',
    ],
    challenge:
      'Streaming LLM responses to Angular frontend while keeping the REST contract clean. ' +
      'Used Server-Sent Events (SSE) via NestJS and Angular HttpClient event streaming.',
  },
  {
    title: 'Life Connect SAS — Real Estate Platform',
    company: 'Enozom Software',
    stack: 'Angular, TypeScript, SCSS',
    bullets: [
      'Sole frontend engineer on a multinational real estate platform',
      'Owned Angular migrations, UI design sessions, and cross-border collaboration',
    ],
    challenge:
      'Cross-timezone collaboration with a French PM and design team while maintaining ' +
      'high delivery pace as the only frontend engineer on the project.',
  },
]

// ── EXPERIENCE ────────────────────────────────────────────────────────────────

export type Job = {
  period: string
  title: string
  company: string
  bullets: string[]
}

export const jobs: Job[] = [
  {
    period: 'Sep 2023 – Present',
    title: 'Senior Frontend Engineer',
    company: 'TrianglZ LLC',
    bullets: [
      'Owned end-to-end delivery of Daycare — active in 200+ daycare centers across KSA, UAE & Qatar',
      'Led cross-functional team (Frontend, Backend, Mobile, QC, PM) for delivery & planning',
      'Architected shared UI component library of 80+ components serving 4 production products',
      'Extended internationalization from 2 to 8 languages across Angular portal & WordPress',
      'Built real-time messaging & live chat module (Matrix + Angular) — adopted by 100+ centers',
      'Partially migrated RxJS Observables to Angular Signals for granular re-renders',
      'Refactored reactive calendar form: load time 5–6 s → 1.2 s (~75% reduction)',
      'Co-architected website builder platform (Firebase + Angular Signals) — ships Feb 2026',
      'Co-built NestJS AI assistant service for summaries — live in production',
      'Pioneered AI-assisted dev practices: n8n, BMAD, Claude Code via internal tech talks',
    ],
  },
  {
    period: 'Jul 2021 – Aug 2023',
    title: 'Frontend Developer',
    company: 'Enozom Software',
    bullets: [
      'Sole frontend engineer on Life Connect SAS — multinational real estate platform',
      'Led frontend revamp of Dayoff, migrating legacy portal to modern Angular app end-to-end',
      'Upgraded Angular from v12 to v15 across legacy projects, resolving breaking changes',
      'Primary engineer across 10+ projects; deep ownership on 4 (HR, real estate, gov portal, storage)',
      'Go-to engineer for production issues, legacy refactoring, and unblocking teams',
    ],
  },
]

// ── SKILLS ────────────────────────────────────────────────────────────────────

export type SkillCategory = {
  label: string
  items: { name: string; level: number }[]
}

export const skillCategories: SkillCategory[] = [
  {
    label: 'Languages',
    items: [
      { name: 'TypeScript',      level: 92 },
      { name: 'JavaScript',      level: 90 },
    ],
  },
  {
    label: 'Frameworks',
    items: [
      { name: 'Angular',         level: 95 },
      { name: 'React',           level: 80 },
      { name: 'Redux/Toolkit',   level: 78 },
      { name: 'NGXS',            level: 85 },
    ],
  },
  {
    label: 'Styling',
    items: [
      { name: 'SCSS',            level: 90 },
      { name: 'Tailwind CSS',    level: 82 },
      { name: 'Bootstrap',       level: 80 },
    ],
  },
  {
    label: 'Tools',
    items: [
      { name: 'Storybook',       level: 80 },
      { name: 'Git / GitHub',    level: 90 },
    ],
  },
  {
    label: 'AI & Automation',
    items: [
      { name: 'Claude Code',     level: 85 },
      { name: 'Cursor',          level: 75 },
      { name: 'MCP / Code Rabbit', level: 75 },
      { name: 'n8n',             level: 70 },
      { name: 'BMAD',            level: 70 },
    ],
  },
]

// ── EDUCATION ─────────────────────────────────────────────────────────────────

export type EducationEntry = {
  period: string
  degree: string
  institution: string
}

export const education: EducationEntry[] = [
  {
    period: '2016 – 2021',
    degree: 'B.Sc. Mechanical Engineering',
    institution: 'Alexandria University',
  },
  {
    period: '2024',
    degree: 'DOTNET Full Stack Development',
    institution: 'Digital Egypt Pioneers Initiative',
  },
]

export const continuousLearning = [
  'Angular Advanced Patterns (ongoing)',
  'AI Agent tooling — n8n, BMAD, Claude Code',
  'System Design & Distributed Architecture',
]

// ── CONTACT ───────────────────────────────────────────────────────────────────

export type ContactLink = {
  label: string
  href: string
  display: string
  color: string
}

export const contactLinks: ContactLink[] = [
  {
    label: 'Email',
    href: 'mailto:moemenelsayeh@gmail.com',
    display: 'moemenelsayeh@gmail.com',
    color: 'text-cyan-400',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/moemen-ali',
    display: 'github.com/moemen-ali',
    color: 'text-cyan-400',
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/moemenelsayeh',
    display: 'linkedin.com/in/moemenelsayeh',
    color: 'text-cyan-400',
  },
  {
    label: 'Blog',
    href: 'https://dev.to/moemenali',
    display: 'dev.to/moemenali',
    color: 'text-purple-400',
  },
]

export const contactInfo = [
  { label: 'Phone',    value: '(+20) 109 259 4104' },
  { label: 'Location', value: 'Egypt (open to remote / relocation)' },
]

// ── METRICS ───────────────────────────────────────────────────────────────────

export type Metric = {
  category: string
  label: string
  value: string
  context: string
}

export const metrics: Metric[] = [
  {
    category: 'Performance',
    label: 'Calendar load time',
    value: '5–6 s → 1.2 s',
    context: 'Reactive form refactor — ~75% reduction. Presented in internal tech review.',
  },
  {
    category: 'Scale',
    label: 'Daycare reach',
    value: '200+ centers',
    context: 'Active YNMO users across KSA, UAE & Qatar',
  },
  {
    category: 'Reuse',
    label: 'UI component library',
    value: '80+ components',
    context: 'Serving 4 production products, eliminating duplication across white-label offerings',
  },
  {
    category: 'Reach',
    label: 'i18n expansion',
    value: '2 → 8 languages',
    context: 'Extended Angular portal + WordPress landing page across GCC region',
  },
  {
    category: 'Adoption',
    label: 'Live chat rollout',
    value: '100+ centers',
    context: 'Real-time messaging module (Matrix + Angular) adopted across daycare network',
  },
  {
    category: 'AI',
    label: 'AI assistant',
    value: 'Live in production',
    context: 'NestJS + LLM service for premium report & assessment summaries',
  },
]

// ── BLOG ──────────────────────────────────────────────────────────────────────

export const devToUrl = 'https://dev.to/moemenali'

export type Article = {
  title: string
  status: 'published' | 'draft' | 'planned'
  description: string
  link?: string
  tags: string[]
}

export const articles: Article[] = [
  // ── Published ──
  {
    title: 'AI Tools Every Software Engineer Has to Try in 2026',
    status: 'published',
    description:
      'A curated breakdown of AI tools that are genuinely changing how engineers work — ' +
      'from code generation to agentic workflows and automation.',
    link: 'https://dev.to/moemenali/ai-tools-every-software-engineer-has-to-try-in-2026-1fkc',
    tags: ['AI', 'Productivity', 'Tools'],
  },
  {
    title: 'Tailwind vs Bootstrap: Choosing the Right CSS Framework for Your Project',
    status: 'published',
    description:
      'A practical comparison of Tailwind CSS and Bootstrap to help developers pick ' +
      'the right tool based on project type, team size, and design needs.',
    link: 'https://dev.to/moemenali/tailwind-vs-bootstrap-choosing-the-right-css-framework-for-your-project-cek',
    tags: ['CSS', 'Tailwind', 'Bootstrap'],
  },
  {
    title: 'Simplify Language Translation in Angular with ngx-translate',
    status: 'published',
    description:
      'Step-by-step guide to adding multi-language support in Angular apps using ngx-translate — ' +
      'covering setup, lazy loading translations, and dynamic switching.',
    link: 'https://dev.to/moemenali/simplify-language-translation-in-angular-with-ngx-translate-1h6',
    tags: ['Angular', 'i18n', 'ngx-translate'],
  },
  // ── Planned ──
  {
    title: 'Angular Signals in Production — What No Tutorial Tells You',
    status: 'planned',
    description:
      'Real-world lessons from migrating a large NGXS store to Angular Signals, ' +
      'including edge cases with async effects and derived state.',
    tags: ['Angular', 'Signals', 'State Management'],
  },
  {
    title: 'Building a Reusable Chat Module with Matrix & Angular',
    status: 'planned',
    description:
      'How we built a production-ready, drop-in Angular chat library on top of Matrix protocol ' +
      'with zero coupling to the host application.',
    tags: ['Angular', 'Matrix', 'Library Design'],
  },
]

// ── ARCHITECTURE ──────────────────────────────────────────────────────────────

export type ArchitectureNote = {
  title: string
  description: string
  diagram: string
}

export const architectureNotes: ArchitectureNote[] = [
  {
    title: 'Angular Feature Module Architecture',
    description:
      'Pattern used across all YNMO products: strict lazy-loaded feature modules with ' +
      'a shared barrel lib, smart/dumb component split, and service-scoped state.',
    diagram: `
  ┌─────────────────────────────────────────────────┐
  │                  App Shell                       │
  │  ┌──────────┐  ┌──────────┐  ┌──────────────┐  │
  │  │  Feature │  │  Feature │  │   Shared Lib  │  │
  │  │  Module A│  │  Module B│  │  (UI + Utils)│  │
  │  └────┬─────┘  └────┬─────┘  └──────────────┘  │
  │       │             │                            │
  │  ┌────▼─────────────▼───────────────────────┐   │
  │  │           Core Services Layer             │   │
  │  │  Auth · HTTP · State · Routing Guards    │   │
  │  └───────────────────────────────────────────┘  │
  └─────────────────────────────────────────────────┘`,
  },
  {
    title: 'Signal-Based State Flow',
    description:
      'How Angular Signals replace RxJS BehaviorSubjects for component-level state — ' +
      'synchronous, composable, and garbage-collected automatically.',
    diagram: `
  User Action
      │
      ▼
  signal.update()  ◄── writable signal (source of truth)
      │
      ▼
  computed()       ◄── derived state (auto-memoized)
      │
      ▼
  Template {{ }}   ◄── fine-grained DOM updates (no zone.js)`,
  },
  {
    title: 'Microfrontend Integration Pattern',
    description:
      'Conceptual layout for a Module Federation setup where each YNMO product ' +
      'is an independently deployable remote consumed by the shell.',
    diagram: `
  ┌──────────────────────────────────────┐
  │           YNMO Shell (Host)          │
  │  loads remotes at runtime via MF     │
  └───────┬──────────┬───────────┬───────┘
          │          │           │
  ┌───────▼──┐ ┌─────▼────┐ ┌───▼──────┐
  │ Daycare  │ │ Website  │ │  Shared  │
  │ Remote   │ │ Builder  │ │   Lib    │
  │ (own CI) │ │ Remote   │ │(npm pkg) │
  └──────────┘ └──────────┘ └──────────┘`,
  },
]

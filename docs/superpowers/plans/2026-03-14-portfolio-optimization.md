# Portfolio Optimization Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Elevate the terminal portfolio from a 7/10 to a 9/10 by strengthening content depth, adding credibility signals, and introducing three new commands (`metrics`, `articles`, `architecture`).

**Architecture:** All content is extracted to a single `lib/data.ts` type-safe file so each terminal section imports from one source of truth. New sections follow the same pattern as existing ones: a plain `.tsx` file that receives no props and renders themed terminal output. New commands are registered in the main terminal component and `HelpSection` in a final wiring task.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript 5, Tailwind CSS 4, no test framework (manual verification steps provided instead of TDD).

---

## Chunk 1: Content Data Layer + Existing Section Enhancements

### Task 1: Extract all content to `lib/data.ts`

**Files:**
- Create: `lib/data.ts`
- Modify: `components/ui/terminal-sections/AboutSection.tsx`
- Modify: `components/ui/terminal-sections/ProjectsSection.tsx`
- Modify: `components/ui/terminal-sections/ExperienceSection.tsx`
- Modify: `components/ui/terminal-sections/SkillsSection.tsx`
- Modify: `components/ui/terminal-sections/EducationSection.tsx`
- Modify: `components/ui/terminal-sections/ContactSection.tsx`

**Why:** All content is currently hardcoded inside each component. A single data file makes future updates trivial and is a prerequisite for the new sections.

- [ ] **Step 1: Create `lib/data.ts` with typed exports**

```typescript
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
      { name: 'Cursor',   level: 75 },
      { name: 'MCP / Code Rabbit', level: 75 },
      { name: 'n8n',             level: 70 },
       { name: 'BMAD',             level: 70 },
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
```

- [ ] **Step 2: Update `AboutSection.tsx` to import from `lib/data.ts`**

Replace the entire file content:

```tsx
// components/ui/terminal-sections/AboutSection.tsx
import { aboutFields, bio, credibilityStats } from '@/lib/data'

export function AboutSection() {
  return (
    <div className="space-y-3">
      <p className="text-green-400 font-bold">[ABOUT]</p>
      <div className="space-y-1">
        {aboutFields.map(({ label, value }) => (
          <div key={label} className="flex gap-2">
            <span className="text-cyan-400 w-24 shrink-0">{label}:</span>
            <span className="text-gray-300">{value}</span>
          </div>
        ))}
      </div>
      <div className="space-y-1 pt-1">
        <p className="text-cyan-400">Bio:</p>
        <p className="text-gray-300 leading-relaxed">{bio}</p>
      </div>
      <div className="space-y-1 pt-1 border-t border-gray-800">
        <p className="text-cyan-400 pt-1">Credibility:</p>
        {credibilityStats.map(({ label, value }) => (
          <div key={label} className="flex gap-2">
            <span className="text-gray-500 w-24 shrink-0">{label}:</span>
            <span className="text-gray-300">{value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Update `ProjectsSection.tsx` to import from `lib/data.ts` and show challenge + links**

Replace the entire file content:

```tsx
// components/ui/terminal-sections/ProjectsSection.tsx
import { projects } from '@/lib/data'

export function ProjectsSection() {
  return (
    <div className="space-y-5">
      <p className="text-green-400 font-bold">[PROJECT PORTFOLIO]</p>
      {projects.map((project, index) => (
        <div key={project.title} className="space-y-1">
          <p className="text-white">
            <span className="text-gray-500">{index + 1}.</span>{' '}
            <span className="text-cyan-400 font-semibold">{project.title}</span>
            <span className="text-gray-500"> — {project.company}</span>
          </p>
          <p className="text-gray-500 pl-4">
            Stack: <span className="text-gray-400">{project.stack}</span>
          </p>
          {project.bullets.map((bullet) => (
            <p key={bullet} className="text-gray-300 pl-4">• {bullet}</p>
          ))}
          {project.challenge && (
            <p className="text-yellow-400 pl-4 pt-1">
              ⚡ Challenge: <span className="text-gray-300">{project.challenge}</span>
            </p>
          )}
          <div className="flex gap-4 pl-4 pt-0.5">
            {project.liveDemo && (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-400 hover:text-green-300 hover:underline transition-colors text-sm"
              >
                [live demo]
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-400 hover:text-cyan-300 hover:underline transition-colors text-sm"
              >
                [github]
              </a>
            )}
          </div>
        </div>
      ))}
      <p className="text-gray-500 pt-1">
        GitHub:{' '}
        <a
          href="https://github.com/moemen-ali"
          target="_blank"
          rel="noopener noreferrer"
          className="text-cyan-400 hover:text-cyan-300 hover:underline transition-colors"
        >
          https://github.com/moemen-ali
        </a>
      </p>
    </div>
  )
}
```

- [ ] **Step 4: Update `ExperienceSection.tsx` to import from `lib/data.ts`**

Replace the entire file content:

```tsx
// components/ui/terminal-sections/ExperienceSection.tsx
import { jobs } from '@/lib/data'

export function ExperienceSection() {
  return (
    <div className="space-y-5">
      <p className="text-green-400 font-bold">[WORK EXPERIENCE]</p>
      {jobs.map((job) => (
        <div key={job.company} className="space-y-1">
          <p>
            <span className="text-gray-500">{job.period}</span>
            <span className="text-gray-500"> | </span>
            <span className="text-cyan-400 font-semibold">{job.title}</span>
          </p>
          <p className="text-white font-semibold">{job.company}</p>
          {job.bullets.map((bullet) => (
            <p key={bullet} className="text-gray-300 pl-2">• {bullet}</p>
          ))}
        </div>
      ))}
    </div>
  )
}
```

- [ ] **Step 5: Update `SkillsSection.tsx` to import from `lib/data.ts`**

Read the current `SkillsSection.tsx` first, then replace the hardcoded data array with an import from `lib/data` using the `skillCategories` export. Keep the rendering logic and progress bar JSX identical — only swap the data source.

- [ ] **Step 6: Update `EducationSection.tsx` to import from `lib/data.ts`**

Read the current `EducationSection.tsx` first, then replace the hardcoded data with imports of `education` and `continuousLearning` from `lib/data`. Keep rendering logic identical.

- [ ] **Step 7: Update `ContactSection.tsx` to import from `lib/data.ts`**

Read the current `ContactSection.tsx` first, then replace hardcoded data with imports of `contactLinks` and `contactInfo` from `lib/data`. Keep rendering logic identical.

- [ ] **Step 8: Verify the app builds cleanly**

```bash
cd "d:/Work/Portfolio" && npm run build
```

Expected: No TypeScript errors, no import resolution errors.

- [ ] **Step 9: Commit**

```bash
cd "d:/Work/Portfolio"
git add lib/data.ts components/ui/terminal-sections/
git commit -m "refactor: extract all content to lib/data.ts, enrich project challenges"
```

---

### Task 2: Enhance WelcomeSection with stronger value proposition

**Files:**
- Modify: `components/ui/terminal-sections/WelcomeSection.tsx`

**Why:** The first thing a visitor sees should communicate specialization immediately, not just "Frontend Engineer".

- [ ] **Step 1: Replace `WelcomeSection.tsx` content**

```tsx
// components/ui/terminal-sections/WelcomeSection.tsx
export function WelcomeSection() {
  return (
    <div className="space-y-2">
      <pre className="text-green-400 text-xs leading-tight overflow-x-auto">{`
 ███╗   ███╗ ██████╗ ███████╗███╗   ███╗███████╗███╗   ██╗
 ████╗ ████║██╔═══██╗██╔════╝████╗ ████║██╔════╝████╗  ██║
 ██╔████╔██║██║   ██║█████╗  ██╔████╔██║█████╗  ██╔██╗ ██║
 ██║╚██╔╝██║██║   ██║██╔══╝  ██║╚██╔╝██║██╔══╝  ██║╚██╗██║
 ██║ ╚═╝ ██║╚██████╔╝███████╗██║ ╚═╝ ██║███████╗██║ ╚████║
 ╚═╝     ╚═╝ ╚═════╝ ╚══════╝╚═╝     ╚═╝╚══════╝╚═╝  ╚═══╝`}</pre>
      <p className="text-green-400">[SYSTEM INITIALIZED] — Terminal Portfolio v2.0</p>
      <div className="space-y-0.5 pl-2 border-l-2 border-green-800">
        <p className="text-gray-300">
          <span className="text-cyan-400">Specialist:</span>{' '}
          Angular Architecture · Microfrontends · Performance Engineering
        </p>
        <p className="text-gray-300">
          <span className="text-cyan-400">Stack:    </span>{' '}
          Angular · React · TypeScript · NestJS
        </p>
        <p className="text-gray-300">
          <span className="text-cyan-400">Reach:    </span>{' '}
          Products live in KSA, UAE & Qatar — 200+ daycare centers
        </p>
        <p className="text-gray-300">
          <span className="text-cyan-400">Status:   </span>{' '}
          <span className="text-green-400 animate-pulse">●</span> Open to Senior / Lead roles
        </p>
      </div>
      <p className="text-gray-500 pt-1">
        Type <span className="text-cyan-400">help</span> to see available commands
        or <span className="text-cyan-400">about</span> to learn more.
      </p>
    </div>
  )
}
```

- [ ] **Step 2: Verify visually in dev server**

```bash
cd "d:/Work/Portfolio" && npm run dev
```

Open `http://localhost:3000` — confirm the welcome section shows 4 info rows with the specialization, stack, reach, and status lines.

- [ ] **Step 3: Commit**

```bash
cd "d:/Work/Portfolio"
git add components/ui/terminal-sections/WelcomeSection.tsx
git commit -m "feat: strengthen WelcomeSection with specialization, reach, and status signals"
```

---

## Chunk 2: New Terminal Sections

### Task 3: Create `MetricsSection` component

**Files:**
- Create: `components/ui/terminal-sections/MetricsSection.tsx`

**Why:** Concrete numbers are the single biggest differentiator between junior and senior portfolios.

- [ ] **Step 1: Create `MetricsSection.tsx`**

```tsx
// components/ui/terminal-sections/MetricsSection.tsx
import { metrics } from '@/lib/data'

const categoryColors: Record<string, string> = {
  Performance:  'text-green-400',
  Scale:        'text-cyan-400',
  Reuse:        'text-yellow-400',
  Architecture: 'text-purple-400',
  AI:           'text-pink-400',
}

export function MetricsSection() {
  return (
    <div className="space-y-4">
      <p className="text-green-400 font-bold">[ENGINEERING METRICS]</p>
      <p className="text-gray-500 text-sm">Real numbers from production work.</p>
      {metrics.map((metric) => (
        <div key={metric.label} className="space-y-0.5">
          <div className="flex items-baseline gap-3">
            <span
              className={`text-xs font-semibold uppercase tracking-widest w-24 shrink-0 ${categoryColors[metric.category] ?? 'text-gray-400'}`}
            >
              [{metric.category}]
            </span>
            <span className="text-white font-semibold">{metric.value}</span>
          </div>
          <p className="text-gray-500 pl-28 text-sm">
            <span className="text-gray-400">{metric.label}</span> — {metric.context}
          </p>
        </div>
      ))}
    </div>
  )
}
```

- [ ] **Step 2: Verify it renders (wire temporarily — see Task 6 for proper wiring)**

No manual wiring needed yet. Continue to next task.

---

### Task 4: Create `BlogSection` component

**Files:**
- Create: `components/ui/terminal-sections/BlogSection.tsx`

**Why:** Published articles signal thought leadership. Real links make it immediately verifiable.

- [ ] **Step 1: Create `BlogSection.tsx`**

```tsx
// components/ui/terminal-sections/BlogSection.tsx
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
```

---

### Task 5: Create `ArchitectureSection` component

**Files:**
- Create: `components/ui/terminal-sections/ArchitectureSection.tsx`

**Why:** Senior engineers show thinking. Architecture diagrams in a terminal portfolio are a strong differentiator that demonstrates system-design depth.

- [ ] **Step 1: Create `ArchitectureSection.tsx`**

```tsx
// components/ui/terminal-sections/ArchitectureSection.tsx
import { architectureNotes } from '@/lib/data'

export function ArchitectureSection() {
  return (
    <div className="space-y-6">
      <p className="text-green-400 font-bold">[ARCHITECTURE NOTES]</p>
      <p className="text-gray-500 text-sm">
        Patterns and diagrams from real production systems.
      </p>
      {architectureNotes.map((note) => (
        <div key={note.title} className="space-y-2">
          <p className="text-cyan-400 font-semibold">▶ {note.title}</p>
          <p className="text-gray-400 text-sm pl-4">{note.description}</p>
          <pre className="text-green-300 text-xs leading-tight pl-4 overflow-x-auto">
            {note.diagram}
          </pre>
        </div>
      ))}
    </div>
  )
}
```

---

## Chunk 3: Wire New Commands + Update HelpSection

### Task 6: Register `metrics`, `blog`, `architecture` in the main terminal

**Files:**
- Modify: `components/ui/interactive-portfolio-terminal-component.tsx`
- Modify: `components/ui/terminal-sections/HelpSection.tsx`

**Why:** New section components are useless until they're registered as commands in the terminal's command map.

- [ ] **Step 1: Read the main terminal component to understand the command map structure**

Read `components/ui/interactive-portfolio-terminal-component.tsx` fully before editing.

- [ ] **Step 2: Add imports for the three new sections at the top of the terminal component**

After the existing terminal-section imports, add:

```tsx
import { MetricsSection }      from '@/components/ui/terminal-sections/MetricsSection'
import { BlogSection }         from '@/components/ui/terminal-sections/BlogSection'
import { ArchitectureSection } from '@/components/ui/terminal-sections/ArchitectureSection'
```

- [ ] **Step 3: Add the three new commands to the commands map**

Locate the `commands` object/record in the component (the one mapping command strings to JSX). Add:

```tsx
metrics:      <MetricsSection />,
blog:         <BlogSection />,
architecture: <ArchitectureSection />,
```

- [ ] **Step 4: Add new commands to the autocomplete list**

Locate the array that defines valid command strings for autocomplete (used by `CommandDropdown` and `fuzzy-match`). Add `'metrics'`, `'blog'`, `'architecture'` to that array.

- [ ] **Step 5: Read `HelpSection.tsx` fully before editing**

- [ ] **Step 6: Add the three new commands to `HelpSection.tsx`**

In the commands array (or wherever existing commands are listed), add:

```tsx
{ command: 'metrics',      description: 'Key engineering metrics from production work' },
{ command: 'blog',         description: 'Published articles & writing on dev.to' },
{ command: 'architecture', description: 'Architecture diagrams and engineering patterns' },
```

- [ ] **Step 7: Verify all three new commands work end-to-end in the dev server**

```bash
cd "d:/Work/Portfolio" && npm run dev
```

In the terminal:
1. Type `metrics` → should render MetricsSection
2. Type `blog` → should render BlogSection with 3 published + 2 planned articles
3. Type `architecture` → should render ArchitectureSection
4. Type `help` → all three new commands should appear in the list
5. Type `blo` → autocomplete should suggest `blog`
6. Type `arhitectur` (deliberate typo) → typo detection should suggest `architecture`

- [ ] **Step 8: Run the production build to catch any TypeScript errors**

```bash
cd "d:/Work/Portfolio" && npm run build
```

Expected: Build succeeds with no errors.

- [ ] **Step 9: Commit**

```bash
cd "d:/Work/Portfolio"
git add components/ui/terminal-sections/MetricsSection.tsx \
        components/ui/terminal-sections/BlogSection.tsx \
        components/ui/terminal-sections/ArchitectureSection.tsx \
        components/ui/interactive-portfolio-terminal-component.tsx \
        components/ui/terminal-sections/HelpSection.tsx
git commit -m "feat: add metrics, blog, and architecture commands to terminal portfolio"
```

---

## Final Verification Checklist

Before declaring the branch ready for merge, manually verify each of the following in a production build (`npm run build && npm run start`):

- [ ] Welcome screen shows specialization, stack, reach, and status in the info block
- [ ] `about` command shows credibility signals (companies, products live, tech sessions)
- [ ] `projects` command shows challenge notes in yellow for each project
- [ ] `experience` command shows the "76% faster" metric in the calendar bullet
- [ ] `metrics` command renders all 6 metrics with category labels
- [ ] `blog` command renders 3 published (with clickable links) + 2 planned articles
- [ ] `blog` command shows dev.to URL prominently in header and footer
- [ ] `architecture` command renders 3 ASCII diagrams
- [ ] `help` command lists all 8 original + 3 new commands (11 total)
- [ ] Tab autocomplete works for `metrics`, `blog`, `architecture`
- [ ] Typo detection suggests the nearest command for mistyped new commands
- [ ] `contact` command shows dev.to/moemenali link in purple
- [ ] No layout overflow on mobile (resize to 375px width)
- [ ] Build output: 0 TypeScript errors, 0 ESLint errors

---

## What This Plan Achieves Against the Review Feedback

| Feedback Point                        | Task(s) That Address It             |
|---------------------------------------|-------------------------------------|
| Hero section is weak                  | Task 2 (WelcomeSection)             |
| Projects not strong enough            | Task 1, Step 3 (challenges + links) |
| Missing engineering depth             | Task 3, 4, 5 (metrics/articles/arch)|
| Missing credibility signals           | Task 1 Step 2 (AboutSection)        |
| Real metrics needed                   | Task 3 (MetricsSection)             |
| Technical sessions not visible        | Task 1 data.ts, Task 2 welcome      |
| Architecture thinking not shown       | Task 5 (ArchitectureSection)        |
| Blog / articles section missing       | Task 4 (BlogSection) + dev.to link  |

# Graph Report - portfolio  (2026-09-07)

## Corpus Check
- 54 files · ~239,687 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 203 nodes · 312 edges · 13 communities (10 shown, 2 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Community 0
- Community 1
- Community 2
- Community 3
- Community 4
- Community 5
- Community 6
- Community 7
- Community 8
- Community 9
- Community 10
- Community 11

## God Nodes (most connected - your core abstractions)
1. `useTranslation()` - 23 edges
2. `compilerOptions` - 16 edges
3. `react` - 13 edges
4. `gsap` - 10 edges
5. `useProjects()` - 8 edges
6. `cn()` - 7 edges
7. `tailwind` - 6 edges
8. `aliases` - 6 edges
9. `scripts` - 5 edges
10. `Footer()` - 5 edges

## Surprising Connections (you probably didn't know these)
- `LanguageSwitcher()` --calls--> `useTranslation()`  [EXTRACTED]
  src/app/components/LanguageSwitcher.tsx → src/app/i18n/I18nContext.tsx
- `LoadingScreen()` --calls--> `useTranslation()`  [EXTRACTED]
  src/app/components/LoadingScreen.tsx → src/app/i18n/I18nContext.tsx
- `ProjectDetailClient()` --calls--> `useTranslation()`  [EXTRACTED]
  src/app/projects/[slug]/ProjectDetailClient.tsx → src/app/i18n/I18nContext.tsx
- `GlobalUI()` --calls--> `useTranslation()`  [EXTRACTED]
  src/app/providers.tsx → src/app/i18n/I18nContext.tsx
- `ProjectTileProps` --references--> `Project`  [EXTRACTED]
  src/components/ui/ProjectTile.tsx → src/app/i18n/useProjects.ts

## Import Cycles
- None detected.

## Communities (13 total, 2 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.07
Nodes (25): nextConfig, name, private, scripts, build, dev, lint, start (+17 more)

### Community 1 - "Community 1"
Cohesion: 0.14
Nodes (19): gsap, react, CursorRevealProps, LanguageSwitcher(), LoadingScreen(), LoadingScreenProps, StaggeredMenu(), StaggeredMenuItem (+11 more)

### Community 2 - "Community 2"
Cohesion: 0.09
Nodes (22): aliases, components, hooks, lib, ui, utils, iconLibrary, menuAccent (+14 more)

### Community 3 - "Community 3"
Cohesion: 0.12
Nodes (16): clsx, lucide-react, tailwind-merge, geistMono, geistSans, inter, metadata, RootLayout() (+8 more)

### Community 4 - "Community 4"
Cohesion: 0.18
Nodes (13): FeaturedProjects(), Footer(), Hero(), WaveParticle, STACK_STATIC, StackTranslation, TechStack(), ROLE_PERIODS (+5 more)

### Community 5 - "Community 5"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 6 - "Community 6"
Cohesion: 0.15
Nodes (13): BrowserFrame(), containerStagger, fadeIn, hoverScale, itemVariants, perspective3D, scaleIn, scrollFadeIn (+5 more)

### Community 7 - "Community 7"
Cohesion: 0.20
Nodes (9): Project, ProjectDetailClient(), getClampedAspectRatio(), getObjectFit(), ProjectTile(), ProjectTileProps, allSlugs, ProjectMeta (+1 more)

### Community 8 - "Community 8"
Cohesion: 0.15
Nodes (13): dependencies, @base-ui/react, class-variance-authority, clsx, gsap, lucide-react, motion, next (+5 more)

### Community 9 - "Community 9"
Cohesion: 0.20
Nodes (10): devDependencies, babel-plugin-react-compiler, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, @types/node, @types/react (+2 more)

## Knowledge Gaps
- **108 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+103 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 122 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `Community 1` to `Community 0`, `Community 4`, `Community 6`, `Community 7`?**
  _High betweenness centrality (0.161) - this node is a cross-community bridge._
- **Why does `gsap` connect `Community 1` to `Community 0`, `Community 4`, `Community 6`?**
  _High betweenness centrality (0.088) - this node is a cross-community bridge._
- **Why does `dependencies` connect `Community 8` to `Community 0`?**
  _High betweenness centrality (0.087) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _108 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.13675213675213677 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.08695652173913043 - nodes in this community are weakly interconnected._
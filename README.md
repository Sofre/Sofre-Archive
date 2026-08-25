# Sofre Archive

Sofre Archive is a Warhammer-inspired engineering portfolio built with Vue 3, TypeScript, and Vite.

The project presents one portfolio data source through two operating protocols:
- Mechanicus Interface (graphical portfolio)
- Spirit Command // Cogitus (terminal portfolio)

## Versioning

## Version 1.0 (Previous Version)
Version 1.0 was the original graphical archive portfolio experience:
- Single-interface portfolio flow (GUI-focused)
- Themed visual sections for profile, education, experience, projects, research, and contact
- Wargear as a visual technical archive section
- Navigation and animation system based on section scrolling

## Version 2.0 (Base Release)
Version 2.0 introduced a full operating-system style interaction model on top of the original site.

### Implemented in 2.0
- Added a two-stage startup pipeline:
  - Legacy archive loading-bar boot sequence first
  - New Mechanicus protocol boot and interface selection flow second
- Added global interface protocol support:
  - Mechanicus Interface (existing GUI)
  - Spirit Command // Cogitus (terminal-only mode)
- Added persistent interface preference in local storage
- Added runtime switching between interfaces
- Added full-screen Spirit Command terminal experience
- Added command parser and archive query workflows in terminal mode
- Added command history, keyboard navigation, and command assist
- Added mobile terminal shortcut command bar
- Added shared portfolio data aggregation for terminal access
- Kept the GUI archive sections in place while extending with terminal protocol support

### Spirit Command command set (2.0)
- /help
- /ls
- /open
- /srch "category"
- /srch "category"-"item"
- /find "query"
- /status
- /about
- /projects
- /experience
- /education
- /research
- /contact
- /wargear
- /ai
- /automation
- /cv
- /clear
- /gui

## Version 2.0.1 (Current Version)
Version 2.0.1 refines interaction behavior, responsive controls, and terminal visual consistency.

### Implemented in 2.0.1
- Improved startup flow behavior after protocol selection and persisted mode handling
- Updated mobile navigation integration for Spirit Command entry
- Removed duplicate CLI entry behavior on mobile by enforcing a single mobile trigger path
- Increased desktop CLI floating button size for better visibility and accessibility
- Applied consistent CRT-green terminal styling across additional archive terminal text blocks
- Adjusted mobile interface-protocol selector sizing for better phone readability

## Stack
- Vue 3
- TypeScript
- Vite
- Vue Router
- GSAP
- Sass

## Project Structure
- src/views: top-level page views
- src/components: UI components and terminal interfaces
- src/composables: reusable reactive logic
- src/data: portfolio content and data modules

## Development
Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## Notes
- Version 2.0 is additive and extends the original archive with protocol-based interaction.
- Version 1.0 refers to the previous GUI-first baseline before protocolized terminal operation was introduced.

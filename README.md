# Sofre Archive - Imperium Archive // Warhammer 40k Inspired Engineering Portfolio


## SOON

- Decker Mobile Version 

## PATCH 2.0.1 (Current Version)
Version 2.0.1 refines interaction behavior, responsive controls, and terminal visual consistency.

### Implemented in 2.0.0
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


## Tech Stack

### Development 
- Vue 3
- TypeScript
- Vite
- Vue Router
- GSAP

### Deployment
- Vercel
- Production deployment via Git repository
- Automatic deployments on push

### Version Control
- Git
- GitHub

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



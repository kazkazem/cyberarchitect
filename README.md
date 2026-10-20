# Cyberarchitect

Workflow audits and considered Revit tools for architecture and interior practices.

This repository contains the studio website, public product descriptions and release documentation. Built with Kaz's direction and AI-assisted implementation.

## Run locally

Requires Node.js 22 or later. No package installation is needed.

```sh
npm test
npm run build
npm run dev
```

Open the local URL printed by the server. Static output is written to `dist/`.

## Content

- `content/products.json`: product descriptions and release readiness.
- `content/site.json`: public studio contact and repository URL.
- `src/`: page templates, original diagrams, styling and interactions.
- `docs/`: release notes and documentation method.

## Release status

The website is a studio preview. Product illustrations are conceptual, not recordings of working software. The featured plugins are in development; downloads and paid checkout are not yet available.

Before enabling a download, confirm live testing, compatibility, distribution rights, package integrity and documentation. Before enabling purchase, also configure approved pricing, licence, seller information and verified payment/delivery.

No permission to redistribute proprietary plugin code is granted by this website repository. Individual product licence terms will accompany releases.

## Accessibility

The website supports keyboard navigation, visible focus, responsive layouts and reduced-motion preferences. Animations settle rather than loop continuously.

## Publication

The `dist/` directory is the static deployment root. Hosting configuration is in `.openai/hosting.json`. The GitHub repository and the private hosted preview are separate publication destinations.

# MIN HON (من هون)

**AI-enabled Palestinian heritage e-commerce prototype**  
**2nd Place in the AI Track, Innovate IT Hackathon**

[Live Demo](https://minhon.vercel.app) · Team project developed at An-Najah National University

MIN HON ("From Here") is a bilingual e-commerce experience built around Palestinian heritage products. The prototype combines a modern storefront with product customization, cart interactions, and an AI concierge that helps users discover products and learn about the story behind them.

## Engineering highlights

- Responsive React + TypeScript storefront
- Product customization flow for designs and Arabic/English text
- AI shopping concierge connected through a server-side API endpoint
- Cart and recently viewed state for a complete prototype journey
- Express + TypeScript backend with shared validation schemas
- Structured pnpm monorepo with shared API, database, and integration packages
- Server-side credential handling for external AI requests

## My Role

I served as **Technical Team Leader** for MIN HON. I coordinated technical delivery across the project, helped break the concept into implementable features, aligned the storefront, customization, and AI-assistant flows, and supported integration decisions between the frontend and backend work.

The project was built collaboratively during the hackathon, so this repository documents the system and the technical work without presenting the team project as a solo build.

MIN HON placed **2nd in the AI Track at the Innovate IT Hackathon** and was later selected for support by **Arab Student Aid International**.

## Tech Stack

**Frontend:** React, TypeScript, Vite, Tailwind CSS, Radix UI, TanStack React Query, Wouter  
**Backend:** Node.js, Express, TypeScript, OpenAI API integration  
**Data & validation:** Drizzle ORM, Zod  
**Tooling:** pnpm workspaces, TypeScript, Pino

## Architecture

```text
artifacts/
├── min-hon/          # React storefront and product experience
└── api-server/       # Express API, including the AI concierge endpoint

lib/
├── api-client-react/ # Shared client helpers
├── api-zod/          # API schemas and generated types
├── db/               # Drizzle database layer
└── integrations-*    # AI integration packages
```

## AI Concierge

The concierge connects the storefront to a server-side chat endpoint. It is grounded in MIN HON's product catalogue and can answer questions about products, customization, sizing, care, and Palestinian design context while returning product IDs that the UI renders as recommendations.

Keeping the AI request on the server avoids exposing API credentials in the browser and gives the backend one place to control prompts, validation, and response handling.

No API keys or credentials are stored in this repository. Runtime credentials are expected through environment variables.

## Engineering lessons

- Shared schemas reduce drift between frontend requests and backend expectations.
- Server-side AI calls protect credentials and centralize integration logic.
- Clear module boundaries matter even more when a team is building under hackathon time pressure.
- Full user flows should be tested across integration points, not only as isolated screens.
- A working prototype is stronger when the code structure makes the next iteration easier instead of harder.

## Possible next steps

- Add authenticated customer accounts and persistent carts.
- Add automated tests for customization, cart behavior, API validation, and AI endpoint failures.
- Add CI checks for type errors and tests before deployment.
- Improve error handling and loading states across API-dependent flows.
- Evaluate concierge answers against a fixed set of product questions.
- Add database persistence for production-like user and inventory flows.

## Team & Attribution

MIN HON was built as a **team hackathon project**. This repository is published from the team's shared project source for portfolio and learning purposes; it is not presented as a solo project.

- **Yousef AbuBaker:** Technical Team Leader
- **Qusay Al Taslaq:** Team collaborator · [GitHub](https://github.com/QusayAlTaslaq)

## Source Note

The original hosted hackathon demo used a separate media-asset bundle that was not included in the team's public source archive. The application source and architecture are preserved here; the live demo above reflects the complete presentation version.

# MIN HON (من هون)

**AI-enabled Palestinian heritage e-commerce prototype**  
**2nd Place — AI Track, Innovate IT Hackathon**

[Live Demo](https://minhon.vercel.app) · Team project developed at An-Najah National University

MIN HON ("From Here") is a bilingual e-commerce experience built around Palestinian heritage products. The prototype combines a modern storefront with product customization, cart interactions, and an AI concierge that helps users discover products and learn about the story behind them.

## Highlights

- Bilingual Palestinian heritage storefront with product collections and detail pages
- Guided product-customization flow for designs and Arabic/English text
- AI shopping concierge with product-aware recommendations
- Cart and recently viewed interactions for a complete prototype journey
- Responsive React interface backed by a TypeScript/Express API
- Structured pnpm monorepo with shared API, database, and integration packages

## My Role

I served as **Technical Team Leader** for MIN HON. I coordinated the technical delivery with the wider project team, helped translate the product concept into implementable features, aligned the shopping, customization, and AI-assistant experiences, and supported the final product presentation.

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

No API keys or credentials are stored in this repository. Runtime credentials are expected through environment variables.

## Team & Attribution

MIN HON was built as a **team hackathon project**. This repository is published from the team's shared project source for portfolio and learning purposes; it is not presented as a solo project.

- **Yousef AbuBaker** — Technical Team Leader
- **Qusay Al Taslaq** — Team collaborator · [GitHub](https://github.com/QusayAlTaslaq)

## Source Note

The original hosted hackathon demo used a separate media-asset bundle that was not included in the team's public source archive. The application source and architecture are preserved here; the live demo above reflects the complete presentation version.

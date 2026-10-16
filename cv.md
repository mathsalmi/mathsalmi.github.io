# Matheus Salmi — CV

Software Architect & Tech Lead · Remote from Brazil

- Email: mathsalmi@gmail.com
- Site: https://msalmi.com
- LinkedIn: https://www.linkedin.com/in/matheus-salmi/
- GitHub: https://github.com/mathsalmi
- PDF version: https://msalmi.com/cv.pdf

I design systems end to end: how they’re built and scale, what they cost and return, and how AI helps them do more and know more.

## Experience

### StartCHURCH (US) — Software Architect & Tech Lead
Jul 2018 – present · remote

SaaS and services platform for churches and nonprofits: billing, CRM, sites and admin tools. Contracted via Scalable Path until May 2022, then hired directly.

**Architecture & platform**

- Own the architecture and day-to-day operation of the core platform (admin console, billing, public site, site builder, APIs); the only engineer active in every year since 2019, authoring ~70% of all commits since 2021.
- Re-platformed the infrastructure: Bitbucket → GitHub Actions, Docker and AWS ECS (2021); cut 4 production apps over to Kubernetes in 5 days (2023); moved the remaining DigitalOcean stack to AWS (2024); upgraded EKS from 1.27 to 1.35 with under 5 minutes of downtime.
- Led framework modernization: Symfony 3.4 → 6.4, PHP 8.3, Flow → TypeScript, legacy views → React; migrated two legacy Zend applications to containerized Symfony 6 apps with their own CI.
- Made deploys zero-downtime by root-causing five distinct failure modes, verified with zero non-2xx responses under synthetic load; release cadence ~2–3 production releases per week.

**Business impact**

- Run the AWS cost program: staging compute down ~80–87% (Graviton Spot + Karpenter, weekday sleep), databases down 22%, shared load balancing for preview environments, and a ~30% month-over-month drop in the AWS bill.
- Keep billing and payments reliable: automated workflows that saved the billing team days of manual work per cycle, restored stalled scheduled payments, stopped duplicate renewal charges, and fixed reporting errors used for revenue decisions.
- Built a bidirectional HubSpot CRM sync and migrated ten years of operational data — millions of notes — keeping sales and finance on one source of truth; split job queues and added a webhook server so syncs no longer block the admin console.
- Rebuilt the admin console for mobile and accessibility, letting sales close invoices from their phones.

**AI**

- Built a self-hosted MCP server giving the team read-only, AI-assisted access to production data through Claude, choosing to keep the data in-house over a third-party connector.

**Leadership**

- Technical direction across five managers and a full turnover of the original team; recognized internally as the company’s architect.
- Mentored a UX designer from bootcamp to ~2,500 production commits in two years; onboard, review and train new engineers; advise on hiring profiles and interviews.

### Scalable Path (US) — Software Engineer
Jul 2017 – May 2022 · remote

- Designed and built solutions embedded in US client teams (2017–2018), then placed with StartCHURCH until it hired me directly in 2022.

### Instituto Euvaldo Lodi (IEL-GO) — Technical Architect
Aug 2014 – Jul 2017 · Goiânia, Brazil

Industry Federation of Goiás (FIEG) organization for corporate management, entrepreneurial education and careers.

- Started as senior engineer maintaining ~10 legacy Java systems; became the bridge between development, infrastructure and business.
- Set up the Linux environment on AWS and hardened SQL Server to security best practices.
- Designed a new microservices architecture and front-end stack, proven with internal projects in Angular and React.

### Squadra Tecnologia — Software Engineer
Oct 2012 – Jul 2014 · Anápolis, Brazil

- Features and fixes across dozens of applications: Ministry of Education (MEC) systems in PHP/Zend and Oracle, Java projects, a .NET/SQL Server system, and a PhoneGap app for iOS and Android.

### IIDAC — Web Developer
Jul 2007 – Oct 2012 · Anápolis, Brazil

- PHP/MySQL applications for social programs of a UN-partner NGO, reaching young people across Brazil; worked with UN Volunteers from five countries.

## Skills

- **Cloud & platform:** AWS (EKS, ECS, RDS, ALB, Parameter Store), Kubernetes, Karpenter, Docker, Terraform, GitHub Actions, Cloudflare, Linux
- **Backend:** PHP / Symfony, Go, Node.js / TypeScript, Java, C#; REST APIs, RabbitMQ, Redis
- **Data:** MySQL, PostgreSQL, SQL Server, Oracle; migrations, performance tuning, reporting
- **Front end:** React, React Native, TypeScript
- **Integrations:** HubSpot, Stripe, Authorize.net, Sentry
- **AI:** LLM integration, Model Context Protocol (MCP), AI-assisted engineering

## Education & languages

- **M.Sc.:** Logistics Engineering, Instituto Tecnológico de Aeronáutica (ITA) · not completed: all coursework and credits finished; left in 2023 before the thesis defense
- **B.S.:** Information Systems, Universidade Estadual de Goiás · 2011 – 2015
- **Languages:** Portuguese (native), English (professional working), Spanish (limited working), Italian and French (elementary)

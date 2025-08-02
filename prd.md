## Product Requirements Document (PRD) for Club Website

### 1. Purpose and Objectives

- **Purpose**: Build a responsive, maintainable website that showcases the club, its projects, and offers a future kit store.  
- **Objectives**:  
  1. Clearly communicate who we are and what we do.  
  2. Highlight past and ongoing projects with rich content and community interaction.  
  3. Provide secure user accounts for members to track orders and access resources.  
  4. Enable an e-commerce "Kit Store" ready for future product launches.  
  5. Integrate Stripe for seamless payments.  
  6. Offer an admin area for content and order management.  
  7. Embed Google Calendar for event visualization.

---

### 2. Key Features & Functional Requirements

| Feature                              | Description                                                                                                 | Priority    |
|--------------------------------------|-------------------------------------------------------------------------------------------------------------|-------------|
| Homepage                             | Hero section with club mission, brief intro, call-to-action buttons.                                        | High        |
| Projects Section                     | Blog-style posts with guides, photos, comments, and tagging.                                                | High        |
| Kit Store (Future)                   | Product listing, detail pages, shopping cart, and checkout via Stripe.                                       | Medium      |
| User Accounts                        | Sign-up, login, profile management.                                                                           | High        |
| Checkout & Payments                  | Secure payment flow using Stripe APIs.                                                                       | High        |
| Admin Dashboard                      | CRUD for products, blog posts, news, order overview.                                                         | High        |
| File Storage & Downloads             | Manual and image uploads managed by Supabase storage.                                                        | Medium      |
| Google Calendar Embed                | Visual calendar showing upcoming club events.                                                                | Low         |


#### User Stories

1. **As a visitor**, I want to see what the club does so I can decide to join.  
2. **As a member**, I want to log in and access my orders and resources.  
3. **As an admin**, I want to add or update project posts and products easily.  
4. **As a shopper**, I want a smooth checkout experience with my preferred payment method.

---

### 3. Technical Architecture & Stack

- **Frontend**  
  - Framework: Next.js (React + SSR)  
  - Styling: Tailwind CSS

- **Backend & Services**  
  - Database & Auth: Supabase (PostgreSQL)  
  - File Storage: Supabase Storage  
  - Payment Processing: Stripe  

- **Hosting**  
  - **Vercel** for Next.js deployment (auto-deploy on push, serverless functions)  
  - **Supabase** managed PostgreSQL and storage in production

---

### 4. Design & Aesthetic

- **Look & Feel**  
  - Clean, modern, approachable  
  - Emphasize community and maker spirit through imagery and color accents  
  - Consistent typography and spacing via Tailwind utility classes

- **Branding**  
  - Primary colors: #1A202C (dark slate), #EDF2F7 (light gray), accent #2B6CB0 (blue)  
  - Imagery: high-quality photos of club projects and members in action

---

### 5. Setup & Development Workflow

1. **Next.js & Tailwind**  
   ```bash
   npx create-next-app@latest club-website --typescript --app
   cd club-website
   npm install -D tailwindcss @tailwindcss/postcss postcss
   npx tailwindcss init -p
   # Configure tailwind.config.js and globals.css
   npm run dev
   ```
2. **Supabase**  
   ```bash
   npm install @supabase/supabase-js\ npx supabase init
   npx supabase start
   ```
   - Configure client in `lib/supabaseClient.ts`  
   - Define database schema and storage policies
3. **Stripe**  
   - Install `stripe` package  
   - Securely store API keys in environment variables  
   - Implement checkout session and webhooks

---

### 6. Timeline & Milestones

| Milestone                      | Estimated Completion |
|--------------------------------|----------------------|
| Project kickoff & repo setup   | Week 1               |
| Homepage & layout              | Week 2               |
| Projects section & CMS         | Week 3–4             |
| Auth & user profiles           | Week 5               |
| Stripe integration & store     | Week 6–7             |
| Admin dashboard                | Week 8               |
| Testing & QA                   | Week 9               |
| Launch & deployment            | Week 10              |

---

### 7. Questions & Decisions

- **Hosting**: Vercel is ideal for Next.js—supports serverless, instant cache, and CI/CD pipelines.  
- **Aesthetic**: Lean toward a modern, minimal design with maker/hobbyist touches (hand-drawn icons or subtle textures).


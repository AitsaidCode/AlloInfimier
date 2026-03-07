# 🏥 Allo Infirmier

**Soins Infirmiers à Domicile — Rabat & Salé**

> Professional home nursing care coordination platform. Book qualified nurses for at-home medical care in the Rabat-Salé region, Morocco.

🌐 **Live Site:** [alloinfimier.vercel.app](https://alloinfimier.vercel.app)

---

## ✨ Features

- 🌍 **Trilingual** — Full support for French, English, and Arabic (with RTL layout)
- 🌙 **Dark / Light Mode** — Theme toggle with saved user preference
- 📱 **Fully Responsive** — Optimized for desktop, tablet, and mobile
- 📝 **Online Booking** — Request nursing services via an integrated form
- 🗄️ **Supabase Backend** — Bookings stored in a PostgreSQL database via serverless API
- 📧 **Email Notifications** — Instant booking alerts via [Resend](https://resend.com/)
- 💬 **WhatsApp Button** — One-click direct contact via WhatsApp
- ⚡ **Lazy Loading** — Code-split pages for fast initial load
- 🔍 **SEO Ready** — Meta tags via `react-helmet-async`
- 🚀 **Deployed on Vercel** — Auto-deploy on push to `main`

---

## 🛠️ Tech Stack

| Category       | Technology                                                                 |
|----------------|---------------------------------------------------------------------------|
| **Framework**  | [React 19](https://react.dev/) + [Vite](https://vite.dev/)               |
| **Routing**    | [React Router v7](https://reactrouter.com/)                               |
| **i18n**       | [i18next](https://www.i18next.com/) + [react-i18next](https://react.i18next.com/) |
| **Forms**      | [React Hook Form](https://react-hook-form.com/)                           |
| **Backend**    | [Supabase](https://supabase.com/) (PostgreSQL)                             |
| **Email**      | [Resend](https://resend.com/)                                               |
| **API**        | [Vercel Serverless Functions](https://vercel.com/docs/functions)           |
| **Icons**      | [React Icons](https://react-icons.github.io/react-icons/)                 |
| **SEO**        | [react-helmet-async](https://github.com/staylor/react-helmet-async)       |
| **Hosting**    | [Vercel](https://vercel.com/)                                              |

---

## 📁 Project Structure

```
AlloInfimier/
├── api/                     # Vercel Serverless Functions
│   ├── _lib/
│   │   └── supabase.js      # Server-side Supabase client
│   └── bookings.js          # POST /api/bookings endpoint
├── public/
│   ├── favicon.svg
│   └── images/              # Logo & static assets
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Navbar.jsx       # Navigation bar with language switcher
│   │   ├── Footer.jsx       # Site footer
│   │   ├── ThemeToggle.jsx  # Dark/light mode switch
│   │   ├── WhatsAppButton.jsx
│   │   └── PageLoader.jsx   # Loading spinner
│   ├── pages/               # Route pages
│   │   ├── Home.jsx         # Landing page with hero & services overview
│   │   ├── Services.jsx     # Detailed nursing services
│   │   ├── About.jsx        # About the company & team
│   │   ├── Contact.jsx      # Contact info & map
│   │   ├── RequestForm.jsx  # Service booking form (Supabase)
│   │   └── NotFound.jsx     # 404 page
│   ├── i18n/                # Translations
│   │   ├── fr.json          # 🇫🇷 French
│   │   ├── en.json          # 🇬🇧 English
│   │   ├── ar.json          # 🇲🇦 Arabic (RTL)
│   │   └── i18n.js          # i18next configuration
│   ├── styles/              # Global CSS
│   ├── App.jsx              # Root component & routes
│   ├── main.jsx             # Entry point
│   └── config.js            # App configuration
├── .env.example             # Environment variable template
├── vercel.json              # Vercel SPA rewrite rules
├── package.json
└── vite.config.js
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

### Installation

```bash
# Clone the repository
git clone https://github.com/AitsaidCode/AlloInfimier.git
cd AlloInfimier

# Install dependencies
npm install

# Copy environment variables
cp .env.example .env
# → Fill in your Supabase credentials in .env
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
npm run build
npm run preview
```

---

## 🗄️ Supabase Setup

Booking requests are stored in a [Supabase](https://supabase.com/) PostgreSQL database via a serverless API route.

1. Create a free project at [supabase.com](https://supabase.com/)
2. Run the following SQL in the **SQL Editor** to create the bookings table:

```sql
CREATE TABLE bookings (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name        TEXT NOT NULL,
  phone       TEXT NOT NULL,
  email       TEXT NOT NULL,
  service     TEXT NOT NULL,
  address     TEXT NOT NULL,
  pref_time   TEXT DEFAULT 'morning',
  message     TEXT,
  status      TEXT DEFAULT 'new',
  created_at  TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public inserts"
  ON bookings FOR INSERT
  WITH CHECK (true);
```

3. Copy your credentials into `.env`:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

> **Note:** The service role key is only used server-side in Vercel API routes — it is never exposed to the browser.

---

## 📧 Resend Setup (Email Notifications)

When a booking is submitted, the API route sends an email notification via [Resend](https://resend.com/).

1. Sign up free at [resend.com](https://resend.com/signup)
2. Create an **API Key** in the dashboard
3. Add to `.env`:

```env
RESEND_API_KEY=re_xxxxxxxxxxxx
NOTIFICATION_EMAIL=your-email@example.com
```

> **Note:** On the free tier, emails are sent from `onboarding@resend.dev`. To use a custom sender address (e.g. `noreply@alloinfimier.com`), verify your domain in Resend's dashboard.

---

## 🌐 Deployment

The project is deployed on **Vercel** with GitHub integration. Every push to the `main` branch triggers an automatic deployment.

```bash
# Manual deploy via CLI
npx vercel deploy --prod
```

> **Note:** For Vercel deployments, add all environment variables in your [Vercel project settings](https://vercel.com/docs/environment-variables).

---

## 📄 License

This project is proprietary. All rights reserved.

---

## 📞 Contact

- **Website:** [alloinfimier.vercel.app](https://alloinfimier.vercel.app)
- **WhatsApp:** Available via the website
- **Location:** Rabat & Salé, Morocco

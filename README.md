# 🏥 Allo Infirmier

**Soins Infirmiers à Domicile — Rabat & Salé**

> Professional home nursing care services platform. Book qualified nurses for at-home medical care in the Rabat-Salé region, Morocco.

🌐 **Live Site:** [alloinfimier.vercel.app](https://alloinfimier.vercel.app)

---

## ✨ Features

- 🌍 **Trilingual** — Full support for French, English, and Arabic (with RTL layout)
- 🌙 **Dark / Light Mode** — Theme toggle with saved user preference
- 📱 **Fully Responsive** — Optimized for desktop, tablet, and mobile
- 📝 **Online Booking** — Request nursing services via an integrated form (EmailJS)
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
| **Email**      | [EmailJS](https://www.emailjs.com/)                                       |
| **Icons**      | [React Icons](https://react-icons.github.io/react-icons/)                 |
| **SEO**        | [react-helmet-async](https://github.com/staylor/react-helmet-async)       |
| **Hosting**    | [Vercel](https://vercel.com/)                                              |

---

## 📁 Project Structure

```
AlloInfimier/
├── public/
│   ├── favicon.svg
│   └── images/              # Logo & static assets
├── src/
│   ├── assets/              # Imported assets
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
│   │   ├── RequestForm.jsx  # Service booking form (EmailJS)
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
# → Fill in your EmailJS credentials in .env
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

## 📧 EmailJS Setup

This project uses [EmailJS](https://www.emailjs.com/) to send form submissions directly from the browser.

1. Create a free account at [emailjs.com](https://www.emailjs.com/)
2. Create an **Email Service** (e.g., Gmail)
3. Create an **Email Template**
4. Copy your credentials into `.env`:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

> **Note:** For Vercel deployments, add these as Environment Variables in your [Vercel project settings](https://vercel.com/docs/environment-variables).

---

## 🌐 Deployment

The project is deployed on **Vercel** with GitHub integration. Every push to the `main` branch triggers an automatic deployment.

```bash
# Manual deploy via CLI
npx vercel deploy --prod
```

---

## 📄 License

This project is proprietary. All rights reserved.

---

## 📞 Contact

- **Website:** [alloinfimier.vercel.app](https://alloinfimier.vercel.app)
- **WhatsApp:** Available via the website
- **Location:** Rabat & Salé, Morocco

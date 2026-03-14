# Access Nest 🚀

**Access Nest** is a premium, high-performance marketplace for digital products, software assets, and premium licenses. Designed with cutting-edge web technologies like **Next.js 15 (App Router)**, **Prisma ORM**, and **PostgreSQL**, it guarantees a seamless purchasing experience for buyers alongside powerful operations tools for administrators.

---

## ✨ Core Features

- 🛒 **Digital Marketplace**: A highly optimized storefront with real-time categorizing, intelligent searching, and sorting via backend APIs.
- 🛡️ **Seamless Checkout**: Includes robust cart functionalities and smooth, secure guest checkouts alongside authenticated payments. Delivery emails are automated instantly via **Nodemailer**.
- ⭐ **Customer Reviews**: Dynamic product review system highlighting real-time star ratings and authentic user feedback directly on the product's detail pages.
- 👤 **Smart Dashboard**:
  - **For Users**: Easy access to past order histories securely tied to user accounts, direct digital downloads, and account-level settings like password resetting & multi-language toggles.
  - **For Admins**: Deep control panels to effortlessly add/edit/delete products, manage global user sessions, track overall metrics, oversee live interactions, and authorize access requests.
- 📊 **Analytics & Tracking**:
  - Deep integration of **Meta Pixel** (Client-side & Server-side CAPI validation).
  - Robust **Google Tag Manager** and Search Console Verification configured for superior SEO and e-commerce tracking performance.
- 🔒 **Security & Authentication**: Scalable **NextAuth** integration handling comprehensive login/signup modules alongside sophisticated lost-password recovery tokens via unique SMTP logic.
- 🌍 **Multilingual Localization**: A blazing-fast static dictionary pattern translating complex UI chunks in pure, isolated boundaries.
- 🌓 **Dynamic UI**: Unparalleled UI design enriched with micro-animations, premium custom local fonts (Bangla & Inter), and an ultra-modern aesthetic powered completely by Vanilla CSS mixed effectively with optimized Tailwind boundaries.

---

## 🛠️ Technology Stack

| Technology | Description |
|---|---|
| **Framework** | [Next.js 16 (Turbopack Powered App Router)](https://nextjs.org/) |
| **Database** | [PostgreSQL](https://www.postgresql.org/) manipulated with [Prisma ORM](https://www.prisma.io/) |
| **Authentication** | [NextAuth.js](https://next-auth.js.org/) alongside secure token cryptographic features |
| **Styling** | Vanilla CSS interlinked with utility-focused TailwindCSS |
| **Icons** | Rich graphics leveraging [Lucide React](https://lucide.dev/) |
| **Global State** | Optimized client-side stores via [Zustand](https://zustand-demo.pmnd.rs/) |
| **Emails** | Trigger-based notifications via [Nodemailer](https://nodemailer.com/) |

---

## 🚀 Getting Started

Follow these instructions to quickly deploy your local copy of the platform.

### 1. Clone the repository
```bash
git clone https://github.com/Injamhossan/accessnest.git
cd accessnest
```

### 2. Install dependencies
```bash
pnpm install
```

### 3. Environment Config Setup
Create a `.env` file in your root folder mimicking the following required schema:

```env
# Database Credentials
DATABASE_URL="your_postgresql_url"

# NextAuth Variables
NEXTAUTH_SECRET="your_unique_cryptographic_secret"
NEXTAUTH_URL="http://localhost:3000"

# Tracking & Analytics (Leave blank to disable)
NEXT_PUBLIC_FACEBOOK_PIXEL_ID="914097424872748"
FB_ACCESS_TOKEN="your_fb_capi_token"
NEXT_PUBLIC_GTM_ID="GTM-K58TGK78"

# SMTP Email Configuration 
MAIL_HOST="your_smtp_host"
MAIL_USER="your_email"
MAIL_PASS="your_security_app_password"
```

### 4. Database Schema Migration
Ensure your database URL is active, and synchronize your Prisma schemas:
```bash
pnpm prisma generate
pnpm prisma db push
```

### 5. Start Development Server
```bash
pnpm dev
```

Sit back and monitor the App on [http://localhost:3000](http://localhost:3000).

---

## 🏗️ Folder Structure

- `/src/app`: Top-level application routing, API endpoints, layouts, and page templates.
- `/src/components`: Distinct reusable UI layers and Client-side interactive layouts.
- `/src/lib`: Essential global utility functions (Prisma instances, Session handling, Tracking).
- `/src/store`: Granular Zustand instances manipulating the Cart data, local configurations, etc.
- `/src/assets`: Bundled local typographies and optimized image fragments.
- `/prisma`: Relational definitions describing your exact Database structure configurations.

---

## 📝 License

Distributed under the MIT License. See [`LICENSE`](./LICENSE) for more information.

---

## 🤝 Contact and Support

Access Nest has been engineered intricately for high demand.
For enterprise support or related inquiries, reach out to us:
- **Email:** [accessnestbd@gmail.com](mailto:accessnestbd@gmail.com)
- **Website Contact:** [Access Nest Contact Page](https://www.accessnest.tech/contact)

Built with ❤️ by the **Access Nest Development Team**.

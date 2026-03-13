# Access Nest 🚀

**Access Nest** is a premium marketplace for digital products, assets, and licenses. Built with **Next.js 15**, **Prisma**, and **PostgreSQL**, it offers a seamless experience for both buyers and administrators.

---

## ✨ Features

- 🛒 **Digital Marketplace**: Secure platform to browse and buy premium software and assets.
- 🛡️ **Secure Checkout**: Integrated payment verification system.
- 👤 **Smart Dashboard**:
  - **Users**: Order history, billing, and permanent access to purchased digital assets.
  - **Admins & Super Admins**: Advanced tools to manage products, monitor users, and track global sales.
- 📊 **Analytics & Tracking**:
  - **Meta Pixel (Client & Server-side CAPI)** for accurate marketing ads.
  - **Google Tag Manager** for comprehensive event tracking.
- 📧 **Automated Delivery**: Instant email notifications and dashboard access upon successful purchase.
- 🌍 **Multilingual Support**: Dictionary-based localization.
- 🌓 **Dynamic UI**: Responsive design with rich aesthetics and premium local fonts.

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) with [Prisma ORM](https://www.prisma.io/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Styling**: Vanilla CSS & TailwindCSS (customized)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Email**: [Nodemailer](https://nodemailer.com/)

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Injamhossan/accessnest.git
cd accessnest
```

### 2. Install dependencies
```bash
pnpm install
```

### 3. Environment Setup
Create a `.env` file in the root directory and add the following:

```env
# Database
DATABASE_URL="your_postgresql_url"

# NextAuth
NEXTAUTH_SECRET="your_secret"
NEXTAUTH_URL="http://localhost:3000"

# Tracking (Optional but Recommended)
NEXT_PUBLIC_FACEBOOK_PIXEL_ID="914097424872748"
FB_ACCESS_TOKEN="your_fb_capi_token"
NEXT_PUBLIC_GTM_ID="GTM-K58TGK78"

# Email (SMTP)
MAIL_HOST="your_smtp_host"
MAIL_USER="your_email"
MAIL_PASS="your_password"
```

### 4. Database Migration
```bash
npx prisma generate
npx prisma db push
```

### 5. Run Development Server
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

---

## 🏗️ Folder Structure

- `/src/app`: Routes and layouts.
- `/src/components`: Reusable UI components.
- `/src/lib`: Utility functions and shared instances (Prisma, Auth).
- `/src/store`: Global state management.
- `/prisma`: Database schema and migrations.
- `/public`: Static assets (icons, images).

---

## 📝 License

This project is licensed under the MIT License.

---

## 🤝 Support

For support, email [support@accessnest.tech](mailto:support@accessnest.tech) or visit our [Contact Page](https://www.accessnest.tech/contact).

Built with ❤️ by the **Access Nest Team**.

# Michel's Personal Portfolio & Admin Dashboard

A dynamic, full-stack personal portfolio website built with **Next.js 15 (App Router)** and **TypeScript**. This project features a completely custom, secure **Admin Dashboard** powered by **Firebase**, allowing the owner to update projects, skills, quotes, and resume details on the fly without touching any code.

## 🚀 Features

- **Dynamic Showcase**: Beautifully designed frontend to showcase projects, skills, and timelines.
- **Rich Content Builder**: Projects support dynamic content blocks. From the admin panel, you can mix and match Markdown text blocks and Cloudinary image uploads to build detailed project case studies.
- **Secure Admin Dashboard**: Firebase Authentication ensures only authorized emails can access the dashboard.
- **Cloudinary Integration**: Seamlessly upload and serve optimized images for project covers and rich content blocks directly from the admin panel.
- **Markdown Support**: Project details render Markdown natively, making it easy to add formatting, links, and lists.

## 🛠 Tech Stack

- **Frontend framework**: [Next.js (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [CSS Modules](https://github.com/css-modules/css-modules) / [Tailwind CSS](https://tailwindcss.com/)
- **Backend & Database**: [Firebase Firestore](https://firebase.google.com/)
- **Authentication**: Firebase Auth
- **Image Hosting**: [Cloudinary](https://cloudinary.com/)
- **Markdown Rendering**: `react-markdown`

## ⚙️ Local Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/Michel2618/Portofolio.git
   cd Portofolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env.local` file in the root directory and add your Firebase and Cloudinary credentials:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🔐 Admin Dashboard Access

The `/admin` route is protected. Only explicitly whitelisted email addresses (configured in the `dashboard/page.tsx` file) are allowed to view and modify the database after logging in with Google via Firebase Auth.

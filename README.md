# Pony Club

A web application built with Next.js and React.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (v15.2)
- **UI Library**: [React](https://react.dev/) (v19)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (v3.4)
- **UI Components**: [Radix UI](https://www.radix-ui.com/)
- **Package Manager**: [pnpm](https://pnpm.io/)
- **Form Management**: [React Hook Form](https://react-hook-form.com/) with Zod
  validation
- **Typescript**: For type safety and developer experience
- **Visualization**: Recharts for data visualization
- **Icons**: Lucide React
- **Maps**: Google Maps Embed (via @next/third-parties)

## Local Development

### Prerequisites

- Node.js (v18 or later recommended)
- pnpm package manager

### Installation

1. Clone the repository:

   ```bash
   git clone [repository-url]
   cd ponyclub-v0
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Start the development server:

   ```bash
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see
   the application.

## Production Build

To create and run a production build locally:

```bash
pnpm build
pnpm start
```

## Deployment to Vercel

### Option 1: Deploy from the Vercel Dashboard

1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "New Project"
4. Import your repository
5. Configure project settings:
   - Framework Preset: Next.js
   - Build Command: next build (default)
   - Output Directory: .next (default)
   - Install Command: pnpm install (make sure to select pnpm as package manager)
6. Click "Deploy"

### Option 2: Deploy using Vercel CLI

1. Install Vercel CLI:

   ```bash
   pnpm install -g vercel
   ```

2. Log in to Vercel:

   ```bash
   vercel login
   ```

3. Deploy from your project directory:

   ```bash
   vercel
   ```

4. For production deployment:
   ```bash
   vercel --prod
   ```

For more deployment options and configuration, refer to the
[Vercel documentation](https://vercel.com/docs).

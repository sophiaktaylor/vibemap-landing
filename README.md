# VibeMap Landing Page

A modern, production-ready landing page for VibeMap—an event discovery app that brings together local events, hidden spots, and campus happenings on a unified map.

## Features

- **Interactive Map Preview**: Live Leaflet map with demo events and smart filtering
- **Responsive Design**: Mobile-first design that works on all devices
- **Smooth Animations**: Framer Motion animations for engaging interactions
- **Modern UI**: Built with Tailwind CSS and custom shadcn/ui components
- **Accessibility**: Semantic HTML and ARIA labels throughout
- **Performance**: Optimized Next.js setup with code splitting

## Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Maps**: Leaflet
- **UI Components**: Custom shadcn/ui components

## Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the landing page.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
vibemap-landing/
├── pages/
│   ├── _app.tsx          # Next.js app wrapper
│   └── index.tsx         # Main landing page
├── components/
│   └── ui/
│       ├── button.tsx    # Button component
│       └── card.tsx      # Card components
├── globals.css           # Global styles
├── tailwind.config.js    # Tailwind configuration
├── next.config.js        # Next.js configuration
└── tsconfig.json         # TypeScript configuration
```

## Key Sections

- **Navbar**: Sticky navigation with smooth scrolling links
- **Hero**: Main headline with value propositions and email signup
- **Map Preview**: Interactive Leaflet map with demo events and filters
- **Features**: 6 key features with icons and descriptions
- **How It Works**: 3-step process explanation
- **Pricing**: Free and premium tier options
- **Testimonials**: Student quotes and feedback
- **CTA**: Final call-to-action for waitlist signup
- **FAQ**: Common questions and answers
- **Footer**: Links and copyright info

## Customization

### Update Event Data

Edit the `demoEvents` array in `pages/index.tsx` to change the demo events shown on the map.

### Modify Colors

Update the Tailwind config in `tailwind.config.js` or use Tailwind's built-in color utilities directly in components.

### Add Email Integration

In the `onSubmit` function in `pages/index.tsx`, integrate with your email service (Mailchimp, Supabase, etc.):

```typescript
const onSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  // Add your email service integration here
  await fetch('/api/subscribe', { method: 'POST', body: JSON.stringify({ email }) });
  setSubmitted(true);
};
```

## Deployment

### Deploy to Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify

```bash
npm run build
# Upload the .next folder to Netlify
```

## License

MIT License - feel free to use this for your project!

## Support

For issues or questions, please open an issue on GitHub or contact the development team.

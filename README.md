# Toolzia — Free AI-Powered Tools

A modern Next.js website with AI-powered tools for creators.

## Stack

- **Next.js 14** (App Router)
- **Tailwind CSS** (dark mode, custom design system)
- **TypeScript**
- **next-themes** (dark/light mode)
- **@imgly/background-removal** (client-side AI background removal)
- **Claude API** (username & bio generation via Anthropic)

## Tools

| Tool | Description |
|------|-------------|
| 🖼️ Background Remover | Remove image backgrounds locally using AI |
| @ Username Generator | Generate creative usernames via Claude AI |
| 📸 Instagram Bio Generator | Craft engaging Instagram bios via Claude AI |

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Create a `.env.local` file:

```env
# Not needed for background remover (runs in browser)
# Username Generator and Instagram Bio use Claude API directly from the client
# For production, proxy these calls through your own API route to protect your key
ANTHROPIC_API_KEY=your_key_here
```

> ⚠️ **Production Note**: The username generator and bio generator call the Anthropic API directly from the client. For production, create Next.js API routes (`/api/generate-username`, `/api/generate-bio`) that proxy the requests server-side to protect your API key.

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for production

```bash
npm run build
npm start
```

## Project Structure

```
toolzia/
├── app/
│   ├── layout.tsx              # Root layout with ThemeProvider
│   ├── page.tsx                # Homepage
│   ├── globals.css             # Global styles + fonts
│   └── tools/
│       ├── background-remover/ # Background removal tool
│       ├── username-generator/ # Username generation tool
│       └── instagram-bio/      # Instagram bio tool
├── components/
│   ├── Navbar.tsx              # Responsive navbar with dark mode
│   ├── Footer.tsx              # Footer with links
│   ├── ThemeProvider.tsx       # next-themes wrapper
│   └── ToolPageHeader.tsx      # Shared tool page header
└── tailwind.config.ts          # Custom Tailwind configuration
```

## Adding More Tools

1. Create a new folder under `app/tools/[tool-name]/`
2. Add `page.tsx` with SEO metadata
3. Add a `[ToolName]Client.tsx` for client-side logic
4. Add the tool to the `tools` array in `components/Navbar.tsx` and `app/page.tsx`

## API Routes (Recommended for Production)

Create `app/api/generate/route.ts` to proxy Anthropic API calls server-side:

```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY!,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return NextResponse.json(data);
}
```

## License

MIT

# Ape or Fade

Mobile-first React/Vite game prototype prepared for deployment as a Base App standard web app.

## Local run

```powershell
npm install
npm run dev -- --port 5173
```

Open `http://127.0.0.1:5173`.

## Production build

```powershell
npm run build
```

## Monetization

The app uses Base Pay for optional USDC tips.

Create a Vercel environment variable before production deploy:

```text
VITE_BASE_PAY_RECIPIENT=0xYourBaseWalletAddress
```

Use a wallet address you control on Base. Without this variable, the tip buttons will not send payments.

## Add to Base App

1. Deploy the app to a public HTTPS domain, for example Vercel.
2. Open `https://base.dev` and create/register a project.
3. Set the primary URL to the deployed app URL.
4. Fill app metadata:
   - Name: `Ape or Fade`
   - Category: `games`
   - Tagline: `Ape or fade fast`
   - Description: `Read the signal, choose APE or FADE, and survive the degen deck.`
   - Tags: `game`, `base`, `crypto`, `mobile`
5. Add icon, hero image, and screenshots.
6. Test the public URL inside Base App.

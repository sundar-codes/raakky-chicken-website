# The Raakky Chicken — Website V1

Responsive React + TypeScript + Vite + Tailwind CSS business website.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Configuration before launch

In `src/App.tsx`, update these values when the owner confirms them:
- `branchCount`: currently 3.
- `deliveryRadiusKm`: set the confirmed delivery radius in kilometres. It is intentionally `null` until confirmed.
- `onlineOrderUrl`: add the first-party Raakky Chicken ordering-app URL when ready. No Swiggy URL is used.

The first verified branch is Press Colony:
- Address: 81, Thiruvalluvar Nagar, Press Colony, Coimbatore, Veerapandi, Tamil Nadu 641019
- Phone: +91 98435 99030
- Monday–Saturday: 7 AM–9 PM
- Sunday: 4 AM–9 PM

The live open/closed label calculates using India Standard Time and refreshes every 30 seconds. The other two branch addresses/hours are not fabricated; add them after confirmation.

The footer SD Web Studio logo links to https://sdwebstudio.vercel.app. Product photos are illustrative placeholders and should be replaced with the shop's actual product photography before launch.

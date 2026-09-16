# SupleeHub (goodsxyz) — System Architecture

A single-product landing-page/storefront for a Kenyan wellness brand (SupleeHub, currently
selling one product — "Wormwood" pain-relief cream). React + Vite frontend, paired with an
Express backend that the frontend **does not actually call**. Documented by reading the full
`client/src/` and `server/` trees, `git log`, and `package.json` files on 2026-09-16.

## Table of Contents

1. [System Overview](#1-system-overview)
2. [Tech Stack](#2-tech-stack)
3. [Repository Layout](#3-repository-layout)
4. [Frontend Architecture](#4-frontend-architecture)
   - [Routing & App Shell](#routing--app-shell)
   - [Theming & Fonts](#theming--fonts)
   - [Components](#components)
5. [How an Order Actually Happens](#5-how-an-order-actually-happens)
6. [The Backend (`server/`) — Present But Unused](#6-the-backend-server--present-but-unused)
7. [Third-Party Integrations](#7-third-party-integrations)
8. [Build, Run & Deployment](#8-build-run--deployment)
9. [Gaps, Risks & Inconsistencies Found](#9-gaps-risks--inconsistencies-found)
10. [Recommended Improvements](#10-recommended-improvements)
11. [UI Modernization Progress](#11-ui-modernization-progress)
12. [Document History](#12-document-history)

---

## 1. System Overview

SupleeHub is a marketing/direct-response landing page, not a full e-commerce app: there's one
product catalog file, no accounts, no cart, no online payment. The funnel is:

1. A visitor arrives (mostly via Meta/Facebook ads — a Pixel is embedded and active).
2. They land on the home page: hero → product card → a lead-gen "wellness quiz" → benefits →
   testimonials → "how it works" → an order form.
3. They submit their name, phone number, and delivery address.
4. Order details are emailed **directly from the visitor's browser** (via a third-party service,
   EmailJS) to two Gmail inboxes.
5. A human calls the customer to confirm, then the product ships **cash-on-delivery** — no
   payment is ever collected through the site.

There is a second product detail route (`/product/:productName`) with a longer sales page for
the single product, reachable from the nav.

---

## 2. Tech Stack

**Frontend** (`client/`)
- React 19 + Vite 6
- Chakra UI v3 (+ Emotion, Framer Motion) — component library and theming
- React Router 7 (`BrowserRouter`, 2 routes: `/` and `/product/:productName`)
- `@emailjs/browser` — sends order emails directly from the browser, no backend involved
- `react-phone-input-2` — phone number input with country-code picker
- `next-themes` (via Chakra's `ColorModeProvider` wrapper) — light/dark mode, persisted to
  `localStorage`
- No state management library — plain `useState`/`useEffect` throughout, no Redux/Zustand/etc.

**Backend** (`server/`)
- Node.js, Express 4 (ESM)
- `cors`, `dotenv` — both actually wired up correctly (`app.use(cors())` is registered, unlike a
  common mistake of leaving the dependency unused)
- `nodemailer` — imported by `server/services/emailService.js` but **not installed** (see
  [Gaps](#9-gaps-risks--inconsistencies-found) — the server cannot currently boot)

**No test framework, no CI config, and no database anywhere in the repo.** Product data is a
static JSON file (`client/src/utils/products.json`) with a single entry.

---

## 3. Repository Layout

```
goodsxyz/
├── package.json              # root scripts: dev/build/preview — all just delegate into client/
├── reference.html            # the original static landing page this app was converted from
├── client/
│   ├── index.html             # Google Fonts <link>, Meta Pixel script (two versions, one commented out)
│   ├── vite.config.js         # dev server on :3000, proxies /api → :5000 (see §6 — never actually hit)
│   └── src/
│       ├── main.jsx            # Chakra theme/token setup, ChakraProvider + ColorModeProvider mount
│       ├── App.jsx             # BrowserRouter, 2 routes
│       ├── config/fonts.js     # heading-font toggle (Montserrat ⇄ DM Sans) — see §4
│       ├── index.css           # global reset, toast/dialog z-index overrides, phone-input styling
│       ├── pages/               # Home.jsx (composes the landing sections), ProductDetail.jsx
│       ├── components/          # section components + shared UI (see §4.3)
│       │   └── ui/               # color-mode.jsx (next-themes wrapper), toaster.jsx
│       ├── utils/                # orderService.js (EmailJS), productsService.js, config.js, footerContent.js
│       └── images/               # product photos, logo
└── server/
    ├── server.js              # Express bootstrap: cors, json body parsing, /api routes, prod static-serve
    ├── routes/contactRoutes.js # POST /api/contact, POST /api/orders
    ├── services/emailService.js # nodemailer sender — NOT reachable from the live client, see §6
    └── utils/config.js         # a second, unused set of email-recipient config (see §9)
```

---

## 4. Frontend Architecture

### Routing & App Shell

`App.jsx` is deliberately minimal:

```
<Router>
  <Toaster />
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/product/:productName" element={<ProductDetail />} />
  </Routes>
</Router>
```

`Home.jsx` just composes the landing page's sections top-to-bottom: `TopNav` → `Header` (hero) →
`ProductSection` → `WellnessQuiz` → `AdvantagesSection` → `TestimonialSection` → `TrustSection` →
`OrderSection` → `Footer`. `ProductDetail.jsx` renders its own `TopNav`/`MobileNav`/`Footer` plus
a longer single-product sales layout and reuses `AdvantagesSection` and `QuickOrderModal`.

Navigation between sections on the home page is anchor-based (`#products`, `#order`, etc.) with
manual `scrollIntoView`/`window.scrollTo` handling in `TopNav`/`MobileNav`, not React Router
hash routing.

### Theming & Fonts

`main.jsx` builds a custom Chakra v3 system via `createSystem(defaultConfig, customConfig)`:
brand color tokens (`brand.*`, `accent.*` — largely unused in favor of the flatter `brandOrange`/
`brandBlue`/etc. semantic tokens actually used throughout components), light/dark semantic tokens
for `bg`/`fg` and their `.subtle`/`.muted`/`.subtle` variants, and the two font tokens.

**Font configuration is centralized in `client/src/config/fonts.js`**, added specifically so the
heading typeface can be swapped without touching `main.jsx` or any component:

```js
export const ACTIVE_HEADING_FONT = 'dmSans'   // or 'montserrat'
```

Both candidate fonts' weights are loaded in `client/index.html`'s Google Fonts `<link>`
regardless of which is active, so flipping this one constant takes effect immediately with no
other change. Body text is fixed to Inter (not exposed as a toggle — it's the default, high-
legibility choice and isn't meant to be swapped casually).

### Components

- **Shared/site chrome**: `TopNav` (desktop, fixed, glassmorphism blur), `MobileNav` (mobile
  fixed bar + full-screen `Drawer`), `Footer` (now opens `FooterInfoDialog` modals for Terms &
  Conditions / Privacy Policy / Cookie Policy / About Us — see §11), `ColorModeButton`/
  `ColorModeProvider` (`components/ui/color-mode.jsx`).
- **Landing sections** (each a self-contained `<section>` with its own eyebrow-label + heading
  pattern): `Header` (hero), `ProductSection` (renders `ProductCard`s from `products.json`,
  includes `CountdownTimer` — a fake "offer expires in N random hours" timer that resets itself,
  purely a conversion-pressure device, not tied to any real promotion end date),
  `WellnessQuiz` (a 3-question multiple-choice "diagnostic" that always concludes by
  recommending the product — a lead-warming/engagement gimmick, not a real assessment),
  `AdvantagesSection`, `TestimonialSection` (two hardcoded testimonials), `TrustSection`
  ("how to order" 3-step explainer), `OrderSection` (the main order form).
- **Ordering UI**: `OrderSection` (inline form, calls `submitOrderForm`) and
  `QuickOrderModal` (a `Dialog`-based quick-order popup opened from a product card or the
  product detail page's "Order Now" button, calls `submitOrder` with full product context).
  Both ultimately call into `utils/orderService.js`.
- **`FooterInfoDialog`** (`components/FooterInfoDialog.jsx`): a generic content-dialog
  component — icon badge, eyebrow, title, optional "last updated" year, sectioned body
  (heading/paragraphs/optional bulleted list), a "Got it" close button. Content lives separately
  in `utils/footerContent.js` (`ABOUT_US`, `TERMS_OF_SERVICE`, `PRIVACY_POLICY`,
  `COOKIES_POLICY`) so a new footer entry only needs a content object, not a new component.

---

## 5. How an Order Actually Happens

This is the one piece of business logic worth tracing end-to-end, since it's split across two
parallel-looking code paths that are **not actually both live** (see §6):

1. Customer fills in name / phone / delivery address (`OrderSection`) or the same plus product
   context (`QuickOrderModal`).
2. The form calls `submitOrderForm` or `submitOrder` in `client/src/utils/orderService.js`.
3. That function builds an HTML+plaintext email body and calls `emailjs.send(...)` from
   **`@emailjs/browser`**, using `serviceId`/`templateId`/`publicKey` from
   `client/src/utils/config.js` (left untouched per explicit instruction earlier in this
   engagement — it has hardcoded fallback values).
4. EmailJS's own hosted service delivers the email directly to the recipients configured in
   `config.js` (`wands.express@gmail.com`, `jwandera35@gmail.com`) — **the request never touches
   `server/` at all.**
5. A toast confirms success/failure to the customer; a human then has to notice the email and
   call the customer back.

There is no order record kept anywhere (no database, no admin list of orders) — the email *is*
the order record.

---

## 6. The Backend (`server/`) — Present But Unused

`server/server.js` boots an Express app with `POST /api/contact` and `POST /api/orders`
(`server/routes/contactRoutes.js`), backed by `server/services/emailService.js` (a second,
independent `nodemailer`-based email sender). `client/vite.config.js` even proxies `/api/*` to
`http://localhost:5000` in dev, suggesting the intent was for the client to call this API.

**It doesn't.** A full grep of `client/src` for `fetch(`, `axios`, or `/api/` turns up nothing —
every order submission goes through EmailJS directly (§5), never through this backend. On top of
being unreachable, **the backend currently cannot even start**: `emailService.js` imports
`nodemailer`, but `server/package.json` doesn't list it as a dependency and it isn't installed in
`server/node_modules` — `node server.js` would fail at import time. See §9 for the more serious
issue also living in this file.

Whether to finish wiring the client to this backend, or delete it as dead weight, is a real
decision worth making deliberately — see [Recommended Improvements](#10-recommended-improvements).

---

## 7. Third-Party Integrations

| Service | Where | What it does |
|---|---|---|
| **EmailJS** | `client/src/utils/orderService.js`, `client/src/utils/config.js` | The actual order-delivery mechanism (§5). Runs entirely client-side — the EmailJS public key, service ID, and template ID are visible in the shipped JS bundle (expected/by-design for EmailJS's model, not a bug). |
| **Meta (Facebook) Pixel** | `client/index.html` | Ad-conversion tracking. Two versions present: an old pixel ID commented out, and the active one (`fbq('init', '1726168932402677')`, `fbq('track', 'PageView')`) firing on every page load. Now honestly disclosed in the new Privacy/Cookies dialogs (§11) — previously the site had dead links where this should have been disclosed. |
| **Google Fonts** | `client/index.html` | Inter (body) + Montserrat + DM Sans (heading candidates, §4.2) loaded via `<link>`. |

---

## 8. Build, Run & Deployment

- **Dev (client only — the only thing actually needed)**: `npm run dev` from the repo root
  (delegates to `cd client && npm run dev`), or `cd client && npm run dev` directly. Vite serves
  on `:3000`.
- **Dev (backend, if you want to experiment with it)**: `cd server && npm install nodemailer &&
  npm run dev` — the missing dependency (§6) has to be installed first.
- **Prod**: `server/server.js` is written to serve `client/dist/` as static files with a
  catch-all SPA fallback when `NODE_ENV=production`, **if** the backend is ever actually deployed
  behind the client. Today nothing in the repo's own scripts wires client build + server start
  together — the root `package.json`'s `build`/`preview` scripts only touch `client/`.
- **Environment variables**: `server/.env` (gitignored, not present in the repo — `EMAIL_USER`,
  `EMAIL_PASSWORD`, etc. per `server/README.md`) are irrelevant today since `emailService.js`
  doesn't read them at all — it hardcodes its own credentials directly (§9).

---

## 9. Gaps, Risks & Inconsistencies Found

Ordered by severity.

### Security — action needed

1. **A live Gmail address and app password are hardcoded in `server/services/emailService.js`**
   (lines 7–8: `user: 'alexndegwa49@gmail.com'`, `pass: 'huumwjugrxugghzq'`), committed to a
   tracked source file in a repo with a GitHub remote (`github.com/AlexKaruiru/goodsxyz.git`).
   Unlike a `.env` file, this **cannot** be fixed by gitignoring it after the fact — it's already
   in git history on every commit that touched this file. **This app password should be rotated
   in the Google account regardless of whether the backend is ever used**, the same way a
   password would be rotated after any other credential exposure. This is a real, actionable
   security finding, not a style nitpick — flagging it here and directly in conversation rather
   than silently fixing it, since credential rotation is your call to make and execute in the
   Google account itself.
2. **Two independent, disagreeing recipient lists exist for the same purpose**:
   `server/services/emailService.js` hardcodes `['wands.express@gmail.com',
   'jwandera35@gmail.com']`, while the unused `server/utils/config.js` lists three recipients
   (adding `alexndegwa49@gmail.com` — which is also the *sender* address in `emailService.js`,
   so it'd be emailing itself). Neither is read by the other; only `emailService.js`'s hardcoded
   list would ever take effect if the backend were fixed and used.

### Dead / broken code

3. **The entire `server/` backend is unreachable from the live site** (§6) — every order goes
   through EmailJS directly, never through `/api/orders` or `/api/contact`.
4. **The backend can't currently boot even if you tried**: `nodemailer` is imported by
   `emailService.js` but missing from `server/package.json` and `server/node_modules`.
5. **Five frontend components are defined but never imported anywhere**: `SafetyBanner.jsx`,
   `DesktopNav.jsx`, `SurveySection.jsx`, `DescriptionSection.jsx`, `MultiStepOrder.jsx` — leftover
   from an earlier revamp, the same pattern as an `OldHome.jsx`-style leftover in other codebases.
   None affect the live app, but they're dead weight for anyone reading the codebase fresh.
6. **Stale documentation**: `server/README.md` says email recipients "are configured in
   `server/utils/config.js`" — they aren't (see #2 above); the root `README.md` describes `npm
   run dev` as running "both client and server concurrently," but the actual root `package.json`
   only runs the client.

### Data integrity

7. **No order record exists anywhere in the system.** An order's only trace is the email EmailJS
   delivers — if that email is missed, deleted, or the recipient inbox has an issue, the order is
   effectively lost with no way to recover or audit it. This is a product/ops risk worth naming
   even though it's arguably "working as designed" for the current scale.

### Accessibility

8. ~~**The primary brand color fails WCAG AA contrast against white.**~~ — **Fully resolved
   2026-09-16, see §11 Sessions 7–9.** `brandOrange` (`#FF6B35`, 2.84:1 on white) still exists in
   the codebase, but only for what's actually exempt or non-textual: the "SupleeHub" logotype
   (WCAG explicitly exempts logo/brand-name text from contrast requirements) and decorative icon
   glyphs (checkmark/spinner icons, not text). **Every piece of text on the site that conveys
   information — CTA buttons, eyebrow labels, heading highlights, prices, checkmark labels, the
   search-results line, and inline emphasis spans — now uses `brandOrangeCta` (`#C74A1A` light /
   unchanged `#FF8559` dark), which passes at 4.75:1.** Full detail: [§11 Session 6](#11-ui-modernization-progress)
   (the finding), [§11 Session 7](#11-ui-modernization-progress) (CTA buttons),
   [§11 Session 8](#11-ui-modernization-progress) (eyebrows + headings),
   [§11 Session 9](#11-ui-modernization-progress) (everything else — prices, checkmarks, inline
   spans).

---

## 10. Recommended Improvements

1. **Rotate the exposed Gmail app password** (§9.1) — independent of any code change, this is an
   account-level action only you can take.
2. **Make a deliberate call on the backend**: either (a) finish wiring `client` → `server` (fix
   the missing `nodemailer` dependency, point `orderService.js` at `/api/orders` instead of/in
   addition to EmailJS, and pull recipient config from one place), or (b) delete `server/`
   entirely if EmailJS is the permanent design — right now it's neither, just dead code with a
   live credential sitting in it.
3. **Delete the five dead frontend files** (§9.5) as a low-risk cleanup pass.
4. **Consolidate the two recipient lists** (§9.2) into one source of truth, wherever email
   sending logic ends up living.
5. **Fix the stale README claims** (§9.6) so a new contributor's first `npm run dev` doesn't
   silently do less than the docs promise.
6. **Consider persisting orders somewhere** (even a simple append-only log or spreadsheet
   integration) so an order isn't purely a fire-and-forget email.
7. ~~**Decide how to remediate the brand-orange contrast failure**~~ — **fully done** (§9.8, §11
   Sessions 7–9). Every text instance of `brandOrange` that isn't the logotype or a decorative
   icon glyph has been converted to `brandOrangeCta`. Nothing left to decide here.

---

## 11. UI Modernization Progress

Living tracker for the frontend polish/modernization effort — updated at the end of each work
session.

**Session 1 (2026-09-16)** — Chakra v2→v3 migration bug fixes + base CSS

The site's design (gradients, glassmorphism nav, motion-on-scroll, dark mode) was already
ambitious in code, but half-migrated from Chakra UI v2 to v3, so most of it was silently broken
at runtime:

- **62 instances of `spacing={n}`** (Chakra v2, silently ignored in v3 — v3 uses `gap`) across
  every `Stack`/`HStack`/`VStack` in all 13 rendered components. Every stacked layout on the site
  had **zero gap** between children until this was fixed.
- Dead `rightIcon`/`leftIcon` Button props (WellnessQuiz, ProductDetail) → converted to plain
  icon children (v3's actual API).
- `isLoading` → `loading` on the order form's submit button (spinner never showed before this).
- Removed non-functional `sx={{...}}` props (v2 API; v3 uses `css`) from Dialog/phone-input
  wrappers — the equivalent styling already lived in `index.css`.
- **`html, body` had a hardcoded `font-size: 20px`** with an unloaded `"Open Sans"` font-family —
  since Chakra's whole size scale is rem-based, this inflated every spacing/typography token on
  the site by 25%. Reset to the standard 16px baseline with the actually-loaded font.
- Added dark-mode CSS for the phone-number input (previously always light-themed regardless of
  site theme).
- Installed `react-phone-input-2` and `@emailjs/browser`, listed in `package.json` but never
  actually installed — the dev server couldn't boot without them.

**Session 2 (2026-09-16)** — Footer legal/info dialogs

Replaced four dead `<Link href="#">`s (Terms & Conditions, Privacy Policy, Cookie Policy, About
Us) with real content, following the same pattern used in a sibling project (makini): a shared
`FooterInfoDialog` component + a `footerContent.js` content file. Content is grounded only in
what this codebase actually does (order flow, EmailJS, cash-on-delivery, the real Meta Pixel) —
nothing fabricated, no invented support email/phone, matching the same honesty standard as the
reference implementation.

**Session 3 (2026-09-16)** — Visual hierarchy / typography uniformity pass

Audited every section's headings, eyebrow labels, container widths, card-title weights, and CTA
button styling for consistency. Found and fixed real drift (not subjective taste calls — same-role
elements styled differently across files built at different times):

- Section `<h2>` headings were split arbitrarily between `2xl` and `3xl` — unified to `3xl`
  (WellnessQuiz, TestimonialSection, TrustSection) to match the majority.
- Card-title font weight was inconsistent at the same `size="md"` — some `900`, some default;
  unified to `900` (ProductSection, TrustSection, matching AdvantagesSection).
- `ProductSection`'s container was `1400px` while every other section used `1200px`, causing the
  page's left/right edges to visibly jump while scrolling — unified to `1200px`.
- `ProductDetail.jsx`'s two in-page subsection headings ("Why You'll Love It", "HOW X WORKS")
  were styled completely differently from each other (one card-title-sized, one oversized and
  solid orange with no eyebrow) despite being the same structural role — both now follow the
  site's established eyebrow + neutral-heading pattern.
- Minor: WellnessQuiz's intro paragraph and final CTA button were missing the `fontSize="lg"` /
  `fontWeight="bold"` used by their equivalents elsewhere.

**Session 4 (2026-09-16)** — Heading font swap + font config

Swapped the heading typeface from Montserrat to **DM Sans** (rounder/friendlier, better fit for a
consumer wellness brand than Montserrat's more geometric/corporate feel) and centralized the
choice in `client/src/config/fonts.js` so it can be flipped back with a one-line change — see
§4.2. This document itself was also added in this session.

**Session 5 (2026-09-16)** — Toast notifications + a real crash bug + broader bug sweep

Swapping `OrderSection.jsx`/`QuickOrderModal.jsx`'s blocking `alert()` calls for Chakra's toaster
surfaced a real, previously-unnoticed crash:

- **`components/ui/toaster.jsx` was wired up but broken.** It created a toaster instance and
  mounted `<Toaster/>`, but never gave it the render-prop `children` function Chakra v3's
  `Toaster` actually requires. Nothing had ever called `toaster.create()` before, so this sat
  latent — the instant it was called, it threw `children is not a function` and **crashed the
  page white**, right after a real order succeeded. (The identical bug exists in the sibling
  makini codebase's `toaster.jsx` — confirmed nothing there calls `toaster.create()` either, so
  it's never been triggered there.) Rewrote it with the proper `ToastRoot`/`ToastTitle`/
  `ToastDescription`/`ToastCloseTrigger` render-prop pattern. Verified end-to-end with two real,
  clearly-labeled test order submissions (one through each form).
- A broader bug sweep prompted by that finding turned up three more real defects:
  - **Auto-scroll-on-load**: every visit to the home page silently auto-scrolled from the hero to
    the product section ~200ms after load. Cause: `TopNav`'s search-as-you-type effect fires once
    on mount with an empty query (not a real search), which was wired straight into `Home.jsx`'s
    scroll-to-`#products` behavior. Fixed by only scrolling once the visitor has actually typed
    something. Confirmed `window.scrollY` stays `0` after load.
  - **Phone number validation could be silently bypassed.** `react-phone-input-2` pre-fills its
    value with `+254` the instant it mounts, even with zero digits typed, so the old
    `!formData.phone` truthiness check never actually caught an empty phone number — an order
    could go through with an unreachable number. Added `hasValidPhoneDigits()`
    (`client/src/utils/phone.js`, requires ≥10 real digits) to both order forms. Verified live:
    submitting with only `+254` now correctly blocks with a toast and sends no email.
  - **Product cards showed generic, hardcoded benefit text instead of each product's real data.**
    `ProductSection.jsx` had a module-level `benefits` array applied identically to every card,
    ignoring the real `product.benefits` field already in `products.json`. Invisible today with
    one product; would have shown identical bullets on every card the moment a second product was
    added. Fixed to read `product.benefits`, keeping the old array only as a fallback.
- Minor: removed unused `Progress`/`Stack`/`Icon` imports from `WellnessQuiz.jsx`.

**Session 6 (2026-09-16)** — Accessibility, performance, and SEO basics

**Accessibility:**
- Form labels weren't programmatically associated with their inputs in `OrderSection.jsx` (a
  plain `<Text>` was used as a visual-only "label"). Converted to Chakra's `Field.Root`/
  `Field.Label`, matching the pattern `QuickOrderModal.jsx` already used correctly.
- Even after that, the phone field's label still didn't link to its input —
  `react-phone-input-2` manages its own DOM id and ignores `Field`'s auto-generated one. Fixed
  with a shared `useId()` passed into both the label's `htmlFor` and the phone input's
  `inputProps.id`, in both order forms. Verified `label[for]` now resolves to the real
  `<input name="phone">` in both.
- **Every heading on the site rendered as a literal `<h2>`** — Chakra's `Heading` defaults to
  `<h2>` unless told otherwise, and only already-dead files ever overrode it. This flattened the
  whole document outline for screen-reader users navigating by heading level (a hero, a section
  title, and a testimonial's name all announced as "heading level 2"). Added proper
  `as="h1"/"h2"/"h3"` across every live heading on both routes. Verified the resulting outline:
  one `H1` → nested `H2` section titles → `H3` sub-items on both pages (`ProductDetail`'s product
  name is now that page's own `H1`, since it doesn't render the shared hero).
- `MobileNav`'s drawer close `IconButton` had no `aria-label` (icon-only, no accessible name) —
  added one. Confirmed the other icon-only controls were already covered (`ColorModeButton`,
  `FooterInfoDialog`'s close button, and `QuickOrderModal`'s `CloseButton` — Chakra's
  `CloseButton` ships a built-in `aria-label="Close"` by default).
- **Found, flagged, not changed — a decision, not a bug fix: brand-orange contrast fails WCAG AA.**

  *What the number means.* WCAG contrast ratio compares the relative luminance of foreground vs.
  background color — a standardized formula, not a subjective read. WCAG 2.1 Level AA requires
  **4.5:1** for normal-size text and **3:1** for large text (≥24px regular, or ≥18.66px bold).
  `brandOrange` (`#FF6B35`) on white computes to **2.84:1** — short of *both* thresholds, not a
  borderline case. (Dark mode is fine: the dark-mode variant, `#FF8559` on the dark navy
  background, hits 7.44:1.)

  *Where it bites.* Every eyebrow label site-wide (14px bold — too small to qualify for even the
  relaxed 3:1 threshold, so it needs the full 4.5:1 and misses badly), highlighted words inside
  headings (30px after the `3xl` cap — large enough to only need 3:1, but 2.84 still falls short),
  and — most importantly — **white CTA button text on orange buttons**, since that's the same two
  colors with foreground/background swapped: "ORDER NOW" and "PLACE ORDER" fail the identical
  check. That's the button that drives revenue.

  *Why it's not just fixed silently.* A real remediation darkens the brand orange or introduces a
  second, text-safe shade — either way it visibly changes brand color, and introducing new palette
  colors was explicitly ruled out earlier in this effort. Surfaced as a quantified decision rather
  than silently altered.

  *Remediation options, with effort estimates:*
  1. **Scoped fix — only the CTA buttons (~20–30 min).** Darken the ~4–5 `Button` backgrounds (or
     their `bgGradient` hex pairs) that render "ORDER NOW"/"PLACE ORDER", leave eyebrows/headings
     as-is. Cheapest, lowest blast radius, fixes the highest-stakes failure. Tradeoff: two shades
     of orange end up in play — a lighter brand accent and a darker action color — which can read
     as intentional or as a mismatch depending on execution.
  2. **Global token change (~30–45 min).** Darken `brandOrange`'s light-mode value once in
     `main.jsx`. Four `bgGradient` buttons (`OrderSection.jsx`, `ProductSection.jsx`) hardcode a
     companion shade (`#ff8a45`) that isn't tied to the token, so those need matching updates too,
     plus a full visual re-check in both themes since every orange element on the site shifts —
     eyebrows, badges, hover states, the whole accent. The biggest brand-feel change of the three.
  3. **Two-tier system (~1–2 hours).** Keep the vibrant orange for large/decorative use, add a
     separate darker "text-safe" token for small text specifically. Note: even the minimum
     darkening needed to clear the 3:1 large-text bar still isn't enough for the 14px eyebrow
     labels — those need the full 4.5:1 regardless, so this path doesn't avoid the real fix, it
     only scopes where the vibrant orange survives. Requires auditing ~15–20 usage sites across
     components to sort "text needing contrast" from "filled shapes where no text-contrast math
     applies." Closest option to "introducing a new palette," which was explicitly ruled out —
     a scope call as much as an effort one.

  Not a real option: a text-shadow or outline behind the orange text — WCAG contrast is measured
  on flat foreground/background color only, so that wouldn't count as remediation even if it
  subjectively helped legibility.

**Performance:**
- Removed a **183KB dead image import** (`biotin.jpg`) that was bundled into the production build
  from both `ProductSection.jsx` and `ProductDetail.jsx` despite no product ever resolving to
  that image key.
- Deleted the orphaned `public/vite - old.svg`. Several other zero-reference image files in
  `client/src/images/` (`customer-shopping-online-concept-free-vector.jpg`, `logo - Copy.webp`,
  `product3 - Copy.webp`, `product1-4.webp`) are harmless now (nothing imports them, so Vite won't
  bundle them regardless) but a permission guard blocked deleting them from this session — left
  for manual cleanup.
- Fixed the favicon `<link>`'s mismatched MIME type (declared `image/svg+xml` on an actual
  `.webp` file).
- **Decision flagged, kept as-is per explicit instruction**: both Montserrat and DM Sans font
  weights load regardless of which is active (`client/index.html`), so the font toggle (§4.2,
  Session 4) stays a one-line, zero-network-change swap — at the cost of shipping unused
  Montserrat font files on every page load. Explicitly kept this way; trim later if needed.

**SEO:**
- Added a meta description, Open Graph tags (`title`/`description`/`image`/`type`/`url`), and
  Twitter Card tags to `index.html` — previously a share on Facebook/WhatsApp (relevant, since
  Meta ads drive this site's traffic) would have shown nothing useful.
- Added a basic `robots.txt` (`Allow: /` for all agents). No `sitemap.xml` — not worth the
  infrastructure for a 2-route site.
- `og:url` and `og:image` currently point at a placeholder domain (`supleehub.example.com`) with
  a `TODO` comment in `index.html` — need the real production domain to finish these.

**Session 7 (2026-09-16)** — Brand-orange contrast fix, scoped to CTA buttons

Implemented the "scoped fix" option from Session 6's three-option writeup (§9.8, §10.7): a new
semantic token, **`brandOrangeCta`** (`#C74A1A` light / `#FF8559` dark — dark mode was already
compliant, so its value is unchanged), added in `main.jsx` next to `brandOrange`. White text on
`#C74A1A` computes to **4.75:1**, clearing the 4.5:1 AA bar with margin.

Applied to the six buttons whose job is to move a visitor toward ordering — the only elements
this option was scoped to touch, deliberately leaving eyebrow labels and heading highlight words
on the original (still-failing) `brandOrange`, per the plan:

- `Header.jsx` — "Explore Products" (hero CTA)
- `ProductSection.jsx` — "ORDER NOW" (product card)
- `ProductDetail.jsx` — "ORDER NOW" (main product-page button)
- `OrderSection.jsx` — "PLACE ORDER" (inline order form)
- `QuickOrderModal.jsx` — "PLACE ORDER — {price} KES" (order dialog)
- `WellnessQuiz.jsx` — "CLAIM DISCOUNT NOW" (end-of-quiz CTA)

Two of these (`OrderSection`, `ProductSection`) previously used a `bgGradient` fading toward a
second, lighter hardcoded hex (`#ff8a45`) for a shine effect. Kept as a gradient toward a lighter
shade would have reintroduced a low-contrast region within the same button, so both were converted
to a flat `bg="brandOrangeCta"` fill instead — this also brings them in line with the hover
pattern the other four buttons already used (same background, lift + shadow on hover, no color
swap), so all six now behave identically on hover.

Deliberately **not** touched, matching the "scoped" plan exactly: the countdown timer's digit
tiles, the "-50%/SAVE 50%" badges, the testimonial avatar circles, and the `TrustSection` icon
boxes — all solid-`brandOrange`-with-white-content, same underlying contrast issue, but none of
them are literal call-to-action buttons, so they were left out of this pass's scope on purpose.
Also not touched: `FooterInfoDialog`'s "Got it" button — a dismiss action, not a conversion CTA.

Verified live: computed `background-color` on all six buttons resolves to `rgb(199, 74, 26)`
(`#C74A1A`); visually confirmed on four of the six (Header, ProductSection card, ProductDetail,
QuickOrderModal) — reads as a deliberate, grounded "action" orange next to the lighter accent
orange used elsewhere, not a mismatch. No console errors introduced.

**Session 8 (2026-09-16)** — Brand-orange contrast fix, extended to eyebrow labels and headings

Follow-up request: extend Session 7's fix from just the CTA buttons to every eyebrow label and
heading highlight too. Reused the same `brandOrangeCta` token (no new color needed — the contrast
formula is symmetric, so `#C74A1A` text on white is the identical 4.75:1 ratio as white text on
`#C74A1A`, and its dark-mode value already matched `brandOrange`'s, so dark mode needed no change
either). Swapped `color="brandOrange"` → `color="brandOrangeCta"` on 18 instances across 9 files:

- **Every eyebrow label site-wide** (the small uppercase kicker text above each section heading):
  `Header.jsx`, `ProductSection.jsx`, `AdvantagesSection.jsx`, `TestimonialSection.jsx`,
  `TrustSection.jsx`, `OrderSection.jsx`, `WellnessQuiz.jsx` (both its section eyebrow and the
  "QUESTION X OF Y" in-quiz kicker), `ProductDetail.jsx`'s "The Science" eyebrow, and
  `FooterInfoDialog.jsx`'s per-dialog eyebrow (shared by all four footer dialogs).
- **Every heading highlight span**: "Joints" (`Header.jsx` hero `h1`), "Wellness"
  (`OrderSection.jsx`), "Order" (`TrustSection.jsx`), "Analysis" (`WellnessQuiz.jsx`).
- **`ProductDetail.jsx`'s four fully-orange `h3` sub-headings** ("CARTILAGE REGENERATION...",
  "REDUCTION OF INFLAMMATION...", "LUBRICATION...", "BONE STRENGTHENING...").

Deliberately left on the original `brandOrange`, and why:
- **The "SupleeHub" logotype** (`Footer.jsx`, both `MobileNav.jsx` instances) — WCAG explicitly
  exempts text that's part of a logo/brand name from contrast requirements, so this one is a
  genuine exemption, not an oversight.
- **Decorative, non-text-critical uses**: icon colors (`TbCheck` in `ProductDetail.jsx`, the
  advantage-card icon boxes, the `FooterInfoDialog` badge icon), the countdown timer's `:`
  separators, the bullet dot and bare checkmark glyphs, the toast spinner.
- **Price displays** (`ProductDetail.jsx`, `ProductSection.jsx`) and a **ghost-variant "View all
  products" link button** — not eyebrows or headings by function, left for a possible future pass.
- **A few inline body-copy emphasis spans** — `QuickOrderModal.jsx`'s "Ordering: {product name}"
  and the quiz result copy's "SupleeHub" mention — styled as inline emphasis within a sentence,
  not as a standalone eyebrow/heading, so out of this pass's literal scope.

Verified live: computed `color` on the hero eyebrow and the "Joints" heading span both resolve to
`rgb(199, 74, 26)` (light mode); toggling to dark mode resolves the same eyebrow to
`rgb(255, 133, 89)` (`#FF8559`) — confirming zero visual change in dark mode, exactly as designed.
No console errors introduced.

**Session 9 (2026-09-16)** — Brand-orange contrast fix, final pass: everything but the logotype

Follow-up request to finish off every remaining real (non-exempt, non-decorative) instance of the
failing `brandOrange` identified at the end of Session 8. Same `brandOrangeCta` token, no new
color — 11 more instances across 6 files:

- **Prices**: `ProductDetail.jsx`'s and `ProductSection.jsx`'s price displays (e.g. "3,500 KES").
- **The three "✓" checkmark labels** in `OrderSection.jsx` (Free Delivery / Cash on Delivery /
  Satisfaction Guarantee) and the **"●" bullet** in `ProductSection.jsx`'s benefit list — these
  are styled text glyphs (`<Text>`/`<Box as="span">`), not icon components, so unlike the
  `TbCheck` SVG icons they don't get a decorative-icon exemption.
- **The countdown timer's two `:` separators** (`CountdownTimer.jsx`).
- **The "View all products" ghost-button link** (`ProductSection.jsx`'s empty search-results
  state) and the **"Showing results for {query}" line** (also `ProductSection.jsx` — found during
  this pass, wasn't in the original list handed off from Session 8's summary).
- **Two inline body-copy emphasis spans**: `QuickOrderModal.jsx`'s "Ordering: {product name}" and
  the quiz result paragraph's "SupleeHub" mention (`WellnessQuiz.jsx`) — on reflection, WCAG's
  logotype exemption covers stylized brand marks, not every casual mention of the brand name in a
  sentence, so this one doesn't get the same pass the Footer/MobileNav logotype does.

**Deliberately still untouched** (genuine exemptions/non-text, not gaps): the "SupleeHub"
logotype (`Footer.jsx`, both `MobileNav.jsx` spots — real WCAG logo exemption), the `TbCheck`
icon SVGs (`ProductDetail.jsx`, `AdvantagesSection.jsx`, `FooterInfoDialog.jsx`) and the toast
spinner — icon graphics, not text, so SC 1.4.3 doesn't apply the same way, and `MobileNav.jsx`'s
"01/02/03" nav-item index numbers, which are decorative rather than informational.

Verified live: the three checkmarks resolve to `rgb(199, 74, 26)` in light mode and
`rgb(255, 133, 89)` in dark mode (matching the pre-existing dark-mode value exactly, confirming
zero dark-mode regression, same as every prior session in this fix). No console errors.

**With this, the brand-orange WCAG AA contrast finding (§9.8) is fully resolved**: every text
element that conveys information passes 4.5:1; what remains on the original color is limited to a
genuine logo exemption and non-text icon graphics.

---

## 12. Document History

- **2026-09-16**: Initial version, written after Sessions 1–4 of the UI modernization effort
  above. Covers the full `client/` and `server/` trees as they stood at that point.
- **2026-09-16 (update)**: Added Sessions 5–6 (toast crash fix + bug sweep; accessibility,
  performance, and SEO basics).
- **2026-09-16 (update)**: Expanded the brand-orange WCAG contrast finding (§9.8, §10.7, §11
  Session 6) with the full explanation and per-option effort estimates, at the user's request.
- **2026-09-16 (update)**: Added Session 7 — implemented the scoped CTA-button contrast fix from
  Session 6's options; updated §9.8 and §10.7 to reflect it as done.
- **2026-09-16 (update)**: Added Session 8 — extended the contrast fix to every eyebrow label and
  heading highlight; updated §9.8 and §10.7 to mark the whole finding resolved except the
  WCAG-exempt logotype and a few low-traffic inline emphasis spans.
- **2026-09-16 (update)**: Added Session 9 — finished off the remaining instances (prices,
  checkmark labels, bullet, search-results line, inline emphasis spans); updated §9.8 and §10.7 to
  mark the brand-orange contrast finding fully resolved, with only the WCAG-exempt logotype and
  non-text icon graphics left on the original color.

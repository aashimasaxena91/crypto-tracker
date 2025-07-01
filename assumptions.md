# 📄 Assumptions

Here are the assumptions made while building the application:

---

## 🔢 Data & API

- The app uses the **CoinGecko API** instead of CoinMarketCap as as I wan unable to create an account on CoinMarketCap and CoinGecko offers a fully free tier with no signup or auth token required (though we used their demo key for request limits).
- Only **top 8 coins by market cap** are shown to simplify the UI and API calls.
- Chart data is based on 7-day and 24-hour intervals as per the `/market_chart` endpoint.
- If a conversion rate is missing, a friendly error is shown (e.g. `-1` or `-2` result).
- `amount` input allows decimal precision with step size `0.0001`.
- No user login/auth is implemented.
- Used USD(Dollars) as the currency.

---

## 💻 UI/UX

- Mobile-first design using Bootstrap's grid system (`Row`/`Col`).
- Charts toggle between 24h and 7d using toggle buttons and animation.
- Swap animation uses Framer Motion.
- Used loading spinners for UX, and global error handling for failed API calls.
- Full-page loader is not shown for individual coin chart loads to avoid overloading user experience.

---

## 🧱 Development

- Vite used for fast local development and builds.
- Redux Toolkit is used with `createAsyncThunk` to handle side effects.
- ESLint is optionally configured to ensure code quality (can be extended).
- Routes like `/rrrr` redirect automatically to `/`.

---

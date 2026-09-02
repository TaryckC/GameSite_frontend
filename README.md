# Frontend

React + TypeScript + Vite frontend for the Django API in `../back`.

## Setup

```sh
npm install
cp .env.example .env
```

In local development, Vite proxies `/game` to `http://127.0.0.1:8000`, so `VITE_API_BASE_URL` can stay empty.

## Commands

```sh
npm run dev      # start the Vite dev server
npm run build    # type-check and build production assets
npm run lint     # run ESLint
npm run preview  # preview the production build locally
```

## Structure

```txt
src/
  api/          # HTTP client and endpoint functions
  app/          # root app and global providers
  components/   # shared UI components
  features/     # feature-specific screens and hooks
  i18n/         # i18next setup and locale files
  types/        # TypeScript types matching backend serializers
```

## API conventions

- Keep endpoint calls in `src/api/`.
- Keep backend serializer shapes in `src/types/`.
- Translate UI text with `useTranslation()` and JSON files in `src/i18n/locales/`.
- Prefer stable backend error codes later, then map them to translated UI messages in the frontend.

# PulseForm QR

PulseForm QR is a modern full-stack QR code form submission system built with Next.js App Router, TypeScript, Tailwind CSS, shadcn/ui-style components, Framer Motion, Prisma ORM, and PostgreSQL.

## What’s included

- Landing page with responsive fintech-style UI
- Public QR form route at `/form/[id]`
- Zod + React Hook Form validation
- Automatic PDF download after successful submission
- Thank-you page with fallback PDF download
- Admin-only login with secure HTTP-only cookie sessions
- Protected admin dashboard with:
  - statistics cards
  - search
  - pagination
  - CSV export
  - delete confirmation modal
- Admin QR generator with:
  - custom route IDs
  - copy link
  - QR image download
- Dark mode
- SEO metadata, `robots.txt`, and `sitemap.xml`

## Tech stack

- Next.js `16.2.6` with App Router
- React `19`
- TypeScript
- Tailwind CSS `v4`
- Prisma ORM `v7`
- PostgreSQL
- `@prisma/adapter-pg` + `pg`
- Framer Motion
- Sonner toasts

## Project structure

```text
src/
  actions/
  app/
    admin/
    api/
    form/
    thank-you/
  components/
    admin/
    forms/
    layout/
    shared/
    ui/
  hooks/
  lib/
  types/
  validations/
prisma/
  migrations/
  schema.prisma
public/
  qr-submission-guide.pdf
```

## Environment variables

Use the included `.env.example` as a reference:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/pulseform_qr?schema=public"
AUTH_SECRET="replace-with-a-long-random-secret"
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="ChangeMe123!"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a PostgreSQL database named `pulseform_qr` or update `DATABASE_URL` to match your database.

3. Generate Prisma Client:

```bash
npm run prisma:generate
```

4. Apply the schema to your database:

```bash
npm run db:migrate -- --name init
```

If you prefer a quick local sync without a named migration:

```bash
npm run db:push
```

5. Start the app:

```bash
npm run dev
```

6. Open `http://localhost:3000`.

## Admin login

Use the credentials from your `.env` file:

- Email: value of `ADMIN_EMAIL`
- Password: value of `ADMIN_PASSWORD`

## QR flow

1. Open the admin QR generator.
2. Create or randomize a form ID.
3. Copy the generated `/form/[id]` link or download the QR image.
4. Scan the QR code to open the public form.
5. Submit the form to store the record and download the PDF.

## Database model

The `Submission` model stores:

- `formId`
- `fullName`
- `email`
- `phone`
- `address`
- `createdAt`

## Verification run in this workspace

These checks were completed successfully:

```bash
npm run lint
npm run build
```

For build verification in this environment, local font files were used and placeholder environment values were supplied for Prisma and admin auth.

# CommitPT

A didactic learning platform for the Portuguese programming community, built with Next.js 15, Tailwind CSS, Auth.js, Neon PostgreSQL, and Drizzle ORM.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 15 (App Router) + TypeScript + Tailwind CSS |
| Auth | Auth.js v5 (NextAuth) with Discord OAuth |
| Database | Neon (serverless PostgreSQL) + Drizzle ORM |
| Discord | discord.js — used to verify server roles on login |

---

## Environment Variables

Copy `.env.local.example` to `.env.local` and fill in the values:

```bash
# Auth — NextAuth v5 convention
AUTH_SECRET=
AUTH_URL=http://localhost:3000

# Discord OAuth app (NextAuth v5 naming)
AUTH_DISCORD_ID=
AUTH_DISCORD_SECRET=

# Discord bot (used to read member roles at login)
DISCORD_BOT_TOKEN=
DISCORD_SERVER_ID=
DISCORD_PREMIUM_ROLE_ID=

# Neon PostgreSQL connection string
DATABASE_URL=
```

---

## Setup Guide

### 1. Create the Discord OAuth App

1. Go to [discord.com/developers/applications](https://discord.com/developers/applications) and click **New Application**.
2. Under **OAuth2**, copy the **Client ID** → `AUTH_DISCORD_ID`.
3. Click **Reset Secret**, copy the value → `AUTH_DISCORD_SECRET`.
4. Under **Redirects**, add:
   ```
   http://localhost:3000/api/auth/callback/discord
   ```
5. Save changes.

### 2. Create the Discord Bot

The bot is needed to look up a user's roles in your server when they log in.

1. In the same application, go to **Bot** and click **Add Bot**.
2. Copy the bot token → `DISCORD_BOT_TOKEN`.
3. Under **OAuth2 → URL Generator**, select the `bot` scope, then open the generated URL to invite the bot to your server.
4. Enable **Developer Mode** in Discord (User Settings → Advanced), then right-click your server to copy its ID → `DISCORD_SERVER_ID`.
5. Right-click the premium role in your server to copy its ID → `DISCORD_PREMIUM_ROLE_ID`.

### 3. Run with Docker

Make sure `.env.local` is filled in (steps 1–2 above) first.

```bash
docker compose build
docker compose up -d
```

Then check:

```bash
docker compose ps
docker compose logs -f
```

Stop when done:

```bash
docker compose down
```

Open [http://localhost:3000](http://localhost:3000).

---

## Routes

| Route | Description |
|---|---|
| `/` | Landing page — hero, roadmap preview, featured course |
| `/login` | Discord login |
| `/dashboard` | Learning hub — shows progress and course path (guest mode available) |
| `/courses` | Course explorer with search and category filters |
| `/courses/[slug]` | Course page with lesson list |
| `/courses/[slug]/[lesson]` | Lesson page with split view (content + code editor) |
| `/roadmap` | Visual learning path with connected nodes |
| `/profile` | User profile with banner, stats, and skills |
| `/account` | Account settings and profile editing |
| `/upgrade` | Explains Commit+ premium access |

---

## Design System

The UI follows a cozy, dark aesthetic inspired by platforms like Codedex, Boot.dev, and Roadmap.sh:

- **Background**: Deep dark `#080b14` with card backgrounds `#0e1220`
- **Typography**: Clean sans-serif with tight tracking for headers
- **Accents**: Indigo for primary actions, emerald for free content, amber for premium
- **Cards**: Subtle borders `border-white/5` with hover states
- **Banners**: Soft gradient scenes (sunset, forest, ocean, dusk, dawn) for course cards
- **Layout**: Split views for lessons, vertical timeline for roadmaps, grid for course explorer

---

## How Premium Access Works

Premium is determined at login time — no manual admin action needed:

1. User logs in with Discord.
2. The app uses `DISCORD_BOT_TOKEN` to fetch the user's roles in `DISCORD_SERVER_ID`.
3. If `DISCORD_PREMIUM_ROLE_ID` is present in their roles, `is_premium` is set to `true` in the database.
4. The user's roles are also stored in `users.discord_roles` for reference.

> **Note:** If you change a user's role in Discord, they need to log out and back in for the change to take effect.
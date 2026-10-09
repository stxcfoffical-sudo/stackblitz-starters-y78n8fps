# Pacific Coast Networks website

A starter community website built with Next.js and Supabase.

## Included
- PCN public homepage
- Email/password registration and sign-in
- Member dashboard
- Application submission form
- Supabase Row Level Security so members can only view their own applications

## Requirements
Install Node.js LTS from https://nodejs.org/ and create a free Supabase project at https://supabase.com/.

## Run locally
1. Extract this folder.
2. Open a terminal in this folder.
3. Run `npm install`.
4. Copy `.env.example` to `.env.local`.
5. Fill in the Supabase URL and publishable/anon key from Supabase Project Settings > API.
6. In Supabase, open SQL Editor and run the contents of `supabase/schema.sql`.
7. In Supabase Authentication settings, configure your site's URL and allowed redirect URLs. For local testing, add `http://localhost:3000`.
8. Run `npm run dev`.
9. Open `http://localhost:3000`.

## Discord login setup

1. Open the Discord Developer Portal: https://discord.com/developers/applications
2. Create an application for Pacific Coast Networks and open its OAuth2 page.
3. In Supabase, open Authentication > Sign In / Providers > Discord and enable Discord.
4. Supabase displays a callback URL for your project. Add that exact URL to the Discord application's OAuth2 Redirects.
5. Copy the Discord application's Client ID and Client Secret into the Supabase Discord provider settings, then save.
6. In Supabase Authentication URL Configuration, set the Site URL to `http://localhost:3000` while testing and add `http://localhost:3000/**` to the allowed redirect URLs. After deployment, add your real website domain and its dashboard redirect.
7. Restart `npm run dev`, open `/login`, and test Discord sign-in.

The browser only uses the Supabase publishable/anon key. Keep the Discord Client Secret and any Supabase service-role secret private; enter them only in the appropriate provider/backend settings.

## Supabase configuration
- Copy the Project URL into `NEXT_PUBLIC_SUPABASE_URL`.
- Copy the publishable key (or legacy anon key) into `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- Never use the `service_role` secret key in a `NEXT_PUBLIC_` variable or in browser code.

## Important before public launch
- Configure email confirmation and password recovery.
- Add a privacy policy, terms, community rules, and a contact method.
- Decide who can review applications. The starter version lets members submit and view their own applications; review is done in the Supabase dashboard.
- Add a proper staff/admin role system before allowing staff review actions through the website.
- Test registration, sign-in, application submission, and access controls.
- Use a strong unique password for every account and keep Supabase keys private where required.

## Deploy
1. Push the project to a private or public GitHub repository.
2. Import the repository into Vercel.
3. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to Vercel project environment variables.
4. Deploy and set your production site URL in Supabase Authentication URL configuration.
5. Test the live site before sharing it.


## Discord server membership verification
Discord OAuth login alone confirms the identity of a Discord account; it does not confirm membership in a particular Discord server. If PCN should only allow current server members, implement a server-side membership check using a Discord bot with the minimum required permissions and the PCN guild ID. Keep the bot token on the server only; never expose it in `NEXT_PUBLIC_` variables or browser code.

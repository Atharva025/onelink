# OneLink Project

A beautiful, customizable platform that allows users to create a single page containing all their links, content, and personality. Perfect for social media bios, business cards, and personal branding.

## Features

- **Link Management**: Organize all your important links in one beautiful page
- **Custom Design**: Personalize with custom colors, themes, and layouts
- **Rich Content Blocks**: 
  - Link blocks for websites and social media
  - Spotlight blocks for featured content
  - Image galleries with lightbox functionality
  - Media embeds (YouTube, Spotify, etc.)
- **Ask Me Anything**: Interactive Q&A section for audience engagement
- **Responsive Design**: Optimized for all devices
- **Authentication**: Secure user accounts with Supabase Auth

## Tech Stack

- **Frontend**: React 18, React Router, Tailwind CSS
- **Backend**: Supabase (Database, Auth, Edge Functions)
- **Build Tool**: Vite
- **Additional Libraries**:
  - react-player for media embeds
  - react-dnd for drag-and-drop functionality
  - @supabase/supabase-js for backend integration

## Project Structure

```
onelink-project/
├── public/
│   └── favicon.ico
├── src/
│   ├── api/
│   │   └── supabaseClient.js
│   ├── assets/
│   │   └── logo.svg
│   ├── components/
│   │   ├── admin/          # Admin dashboard components
│   │   ├── blocks/         # Content block components
│   │   ├── common/         # Reusable UI components
│   │   └── layout/         # Layout components
│   ├── contexts/
│   │   └── AuthContext.jsx
│   ├── hooks/
│   │   └── useAuth.js
│   ├── pages/              # Page components
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── supabase/
│   └── functions/
│       └── increment-kudos/
└── configuration files...
```

## Setup Instructions

1. **Clone and Install**
   ```bash
   git clone <repository-url>
   cd onelink-project
   npm install
   ```

2. **Environment Setup**
   - Copy `.env` to `.env.local`
   - Add your Supabase project URL and anon key:
   ```
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

3. **Database Setup**
   Set up the following tables in your Supabase database:
   
   **profiles**
   ```sql
   CREATE TABLE public.profiles (
     id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
     slug TEXT UNIQUE NOT NULL CHECK (char_length(slug) > 3 AND slug ~ '^[a-zA-Z0-9_-]+$'),
     full_name TEXT,
     bio TEXT CHECK (char_length(bio) < 250),
     avatar_url TEXT,
     status_message TEXT CHECK (char_length(status_message) < 100),
     kudos_count INT NOT NULL DEFAULT 0,
     theme_settings JSONB,
     updated_at TIMESTAMPTZ DEFAULT now()
   );
   ```
   
   **blocks**
   ```sql
   CREATE TABLE public.blocks (
     id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
     profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
     type TEXT NOT NULL,
     content JSONB NOT NULL,
     display_order SMALLINT DEFAULT 0
   );
   ```
   
   **questions**
   ```sql
   CREATE TABLE public.questions (
     id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
     profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
     question_text TEXT NOT NULL,
     answer_text TEXT,
     is_published BOOLEAN NOT NULL DEFAULT false,
     created_at TIMESTAMPTZ DEFAULT now()
   );
   ```

4. **Development**
   ```bash
   npm run dev
   ```

5. **Build for Production**
   ```bash
   npm run build
   ```

## Usage

1. **Sign Up/Sign In**: Create an account or log in to access the dashboard
2. **Content Management**: Add and organize content blocks using the drag-and-drop interface
3. **Appearance Customization**: Customize colors, themes, and fonts in the Appearance tab
4. **AMA Setup**: Enable and manage Ask Me Anything questions
5. **Public Sharing**: Share your public profile URL (`/your-user-id`) with others

## Content Block Types

- **Link Block**: Simple clickable links with optional icons and descriptions
- **Spotlight Block**: Featured content with large images and rich descriptions
- **Gallery Block**: Collections of images with lightbox viewing
- **Embed Block**: YouTube videos, Spotify playlists, and other media

## Contributing

This project follows modern React development best practices:
- Component-based architecture
- Custom hooks for reusable logic
- Context API for state management
- Responsive design with Tailwind CSS
- Type-safe database operations with Supabase

## License

This project is part of a cloud computing educational initiative.+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

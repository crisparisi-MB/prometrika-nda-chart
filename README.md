# Medical Indications Chart

A modern, responsive web application for displaying medical indications with integrated safety and efficacy documentation tracking.

## Features

- **Responsive Design**: Optimized layouts for desktop and mobile devices
- **Real-time Data**: Connected to Supabase database for live data updates
- **Documentation Tracking**: Track ISS, ISE, Clinical Summaries, and Regulatory Meeting Attendance
- **Category Organization**: Medical indications organized by therapeutic categories
- **Visual Indicators**: Intuitive checkmarks and asterisks for documentation status

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Icons**: Lucide React

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- A Supabase account and project

## Getting Started

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd <project-directory>
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Add your Supabase credentials to the `.env` file:

```
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 4. Database Setup

Run the migrations in your Supabase project to set up the database schema. The migrations are located in `supabase/migrations/`:

1. `20251017161556_create_medical_indications_schema.sql` - Creates initial schema
2. `20251021163440_add_footnote_to_indications.sql` - Adds footnote support
3. `20260203144725_add_regulatory_meeting_attendance_column.sql` - Adds regulatory tracking
4. `20260203145734_change_has_ise_to_text.sql` - Updates ISE column
5. `20260203161428_change_has_iss_to_text.sql` - Updates ISS column

You can run these migrations using the Supabase CLI or directly in the SQL Editor of your Supabase dashboard.

### 5. Run the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
├── src/
│   ├── components/
│   │   ├── AsteriskIcon.tsx          # Custom asterisk icon component
│   │   ├── GradientCheckIcon.tsx     # Custom checkmark icon component
│   │   └── MedicalIndicationsChart.tsx # Main chart component
│   ├── hooks/
│   │   └── useIndications.ts          # Custom hook for data fetching
│   ├── lib/
│   │   └── supabase.ts                # Supabase client configuration
│   ├── App.tsx                         # Main app component
│   ├── main.tsx                        # Application entry point
│   └── index.css                       # Global styles
├── supabase/
│   └── migrations/                     # Database migration files
├── .env.example                        # Example environment variables
└── package.json                        # Project dependencies
```

## Database Schema

### Tables

#### `categories`
- `id`: UUID (Primary Key)
- `name`: Text
- `display_order`: Integer

#### `medical_indications`
- `id`: UUID (Primary Key)
- `name`: Text
- `category_id`: UUID (Foreign Key)
- `has_iss`: Text
- `has_ise`: Text
- `has_clinical_summaries`: Text
- `has_regulatory_meeting_attendance`: Text
- `footnote`: Text (Optional)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

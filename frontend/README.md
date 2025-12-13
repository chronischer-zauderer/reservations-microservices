# Facility Booking System - Frontend

A modern React + TypeScript frontend application for managing facility bookings, built with Next.js.

## Features

- 🏢 **Facility Management**: Create, view, edit, and delete facilities
- 📅 **Booking System**: Create and view bookings with date/time selection
- 🎨 **Modern UI**: Clean, responsive design with Tailwind CSS
- ✅ **Form Validation**: Client-side validation using react-hook-form + yup
- 🔔 **Toast Notifications**: Real-time feedback for user actions
- 🔌 **API Health Check**: Live backend connection status indicator
- 📱 **Mobile Responsive**: Works seamlessly on all device sizes

## Tech Stack

- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **React Router** - Client-side routing
- **React Hook Form** - Form management
- **Yup** - Schema validation
- **Axios** - HTTP client
- **Sonner** - Toast notifications
- **Lucide React** - Icon library
- **date-fns** - Date formatting
- **Tailwind CSS** - Styling

## Prerequisites

- Node.js 18+ and npm
- Backend API running on `http://localhost:8080` (or configure via environment variable)

## Installation

1. **Clone the repository**
\`\`\`bash
git clone <repository-url>
cd booking-frontend
\`\`\`

2. **Install dependencies**
\`\`\`bash
npm install
\`\`\`

3. **Configure environment variables**

Add the following to your environment variables (via the **Vars** section in v0 or create a `.env.local` file):

\`\`\`
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080
\`\`\`

## Development

Run the development server:
\`\`\`bash
npm run dev
\`\`\`

The app will be available at `http://localhost:3000`

## Build

Build for production:
\`\`\`bash
npm run build
\`\`\`

Start production server:
\`\`\`bash
npm start
\`\`\`

## Testing

Run tests:
\`\`\`bash
npm test
\`\`\`

## API Integration

The frontend consumes the following API endpoints:

### Facilities
- `GET /api/facilities` - Get all facilities
- `GET /api/facilities/:id` - Get facility by ID
- `POST /api/facilities` - Create new facility
  \`\`\`json
  {
    "name": "Conference Room A",
    "description": "Large meeting room",
    "capacity": 50
  }
  \`\`\`
- `PUT /api/facilities/:id` - Update facility
- `DELETE /api/facilities/:id` - Delete facility

### Bookings
- `GET /api/bookings` - Get all bookings
- `POST /api/bookings` - Create new booking
  \`\`\`json
  {
    "startTime": "2025-01-15T10:00:00Z",
    "endTime": "2025-01-15T12:00:00Z",
    "facilityId": 1,
    "userId": 123
  }
  \`\`\`

## Project Structure

\`\`\`
app/
├── page.tsx          # Main page component
└── globals.css       # Global styles

src/
├── api/              # API client and endpoint functions
│   ├── client.ts     # Axios configuration
│   ├── facilities.ts # Facility endpoints
│   ├── bookings.ts   # Booking endpoints
│   └── health.ts     # Health check
├── components/       # Reusable UI components
│   ├── Navbar.tsx
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Select.tsx
│   ├── Textarea.tsx
│   ├── Loader.tsx
│   ├── Alert.tsx
│   └── ApiStatusBadge.tsx
└── pages/            # Page components
    ├── Home.tsx
    ├── Facilities.tsx
    ├── FacilityForm.tsx
    ├── Bookings.tsx
    └── BookingForm.tsx
\`\`\`

## Environment Variables

You need to set the following environment variable:

- `NEXT_PUBLIC_API_BASE_URL` - Base URL for the backend API (default: http://localhost:8080)

**To add environment variables in v0:**
1. Open the in-chat sidebar
2. Go to the **Vars** section
3. Add `NEXT_PUBLIC_API_BASE_URL` with your backend URL

## CORS Configuration

If you encounter CORS issues, ensure your Java backend has CORS configured:

\`\`\`java
@Configuration
public class WebConfig {
    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
        config.addAllowedOrigin("http://localhost:3000");
        config.addAllowedMethod("*");
        config.addAllowedHeader("*");
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        
        return new CorsFilter(source);
    }
}
\`\`\`

## Troubleshooting

**API connection issues:**
- Verify the backend is running on the configured URL
- Check the API status badge in the navbar
- Ensure CORS is properly configured on the backend
- Verify the `NEXT_PUBLIC_API_BASE_URL` environment variable is set correctly

**Build errors:**
- Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`
- Ensure you're using Node.js 18 or higher

## License

MIT

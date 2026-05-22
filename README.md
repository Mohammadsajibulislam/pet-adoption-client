
# 🐾 PawNest - Pet Adoption Platform

## Project Overview

**PawNest** is a comprehensive full-stack pet adoption platform built with the MERN Stack (MongoDB, Express, Next.js, Node.js). This platform enables users to explore pets available for adoption, view detailed pet profiles, submit adoption requests, and manage their adoption journey. Pet owners can list their pets and manage adoption requests from potential adopters.

## Purpose

PawsHome solves the problem of fragmented pet adoption by providing a centralized, user-friendly platform where:

- Potential adopters can easily browse and find their perfect companion
- Pet owners can list their pets and connect with genuine adopters
- Both parties can manage the adoption process transparently
- The adoption workflow is streamlined and secure

## Live URL

- **Frontend**: [https://pet-adoption-client-seven.vercel.app](https://pet-adoption-client-seven.vercel.app)
- **Backend**: [Deployed on Render/Vercel]

## Key Features

1. **User Authentication & Security**

   - Email and password-based registration with password validation (min 6 chars, uppercase, lowercase)
   - Google OAuth integration for quick sign-up
   - JWT-based session management
   - Secure credential handling with environment variables
   - Protected private routes with middleware authentication
2. **Pet Browsing & Discovery**

   - Browse all available pets with detailed information
   - Filter pets by species (Dogs, Cats, Birds, Rabbits, etc.)
   - Search pets by name or breed
   - View featured pets on home page (minimum 6 displayed)
   - Detailed pet profiles including health status, vaccination info, and location
3. **Adoption Request Management**

   - Submit adoption requests with pickup date and message
   - Track request status (Pending, Approved, Rejected)
   - Real-time request notifications using toast alerts
   - Cancel requests at any time
4. **Pet Owner Dashboard**

   - Add new pets with comprehensive information
   - View all listings with detailed statistics
   - Edit and update pet information
   - Delete pet listings with confirmation
   - View and manage adoption requests from interested adopters
   - Approve or reject adoption requests
   - Auto-reject other requests when one is approved
5. **Responsive & Modern Design**

   - Mobile-first responsive design (mobile, tablet, desktop)
   - Clean and professional UI suitable for recruiters
   - Smooth animations and transitions
   - Toast notifications instead of default alerts
   - Custom 404 error page with back button
   - Loading states with spinner component
6. **Additional Features**

   - Newsletter subscription for pet adoption tips
   - Why Adopt section with adoption benefits
   - Success stories and testimonials
   - Pet care tips section
   - Contact information and social media links
   - Mobile-friendly navigation with hamburger menu

## NPM Packages Used

### Frontend (pet-adoption-client)

```json
{
  "dependencies": {
    "next": "16.2.6",
    "react": "19.2.4",
    "react-dom": "19.2.4",
    "better-auth": "^1.6.11",
    "react-hot-toast": "^2.6.0",
    "react-icons": "^5.6.0",
    "@heroui/react": "^3.0.5",
    "@heroui/styles": "^3.0.5",
    "tailwindcss": "^4",
    "mongodb": "^7.2.0"
  }
}
```

### Backend (pet-adoption-server)

```json
{
  "dependencies": {
    "express": "^5.2.1",
    "mongodb": "^7.2.0",
    "cors": "^2.8.6",
    "dotenv": "^17.4.2",
    "jose-cjs": "^6.2.3"
  }
}
```

## Project Structure

```
pet-adoption-platform/
├── pet-adoption-client/          # Next.js Frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── page.js           # Home page
│   │   │   ├── layout.js         # Root layout
│   │   │   ├── login/            # Login page
│   │   │   ├── signup/           # Signup page
│   │   │   ├── all-pets/         # Browse pets
│   │   │   ├── dashboard/        # User dashboard
│   │   │   ├── my-requests/      # My adoption requests
│   │   │   └── api/auth/         # Auth API routes
│   │   ├── components/           # Reusable components
│   │   └── lib/                  # Auth & utilities
│   ├── package.json
│   └── next.config.mjs
│
├── pet-adoption-server/          # Express Backend
│   ├── index.js                  # Main server file
│   ├── package.json
│   └── vercel.json
│
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB database (Atlas or local)
- Google OAuth credentials (optional, for Google login)

### Installation & Setup

#### 1. Clone Repository

```bash
git clone <repository-url>
cd pet-adoption-platform
```

#### 2. Setup Backend

```bash
cd pet-adoption-server

# Install dependencies
npm install

# Create .env.local file
echo "PORT=5000" > .env.local
echo "MONGODB_URI=your_mongodb_connection_string" >> .env.local

# Start development server
npm run dev
# Server will run on http://localhost:5000
```

#### 3. Setup Frontend

```bash
cd ../pet-adoption-client

# Install dependencies
npm install

# Create .env.local file
echo "NEXT_PUBLIC_API_URL=http://localhost:5000" > .env.local
echo "BETTER_AUTH_SECRET=your_secret_key" >> .env.local
echo "BETTER_AUTH_URL=http://localhost:3000/api/auth" >> .env.local
echo "GOOGLE_CLIENT_ID=your_google_client_id" >> .env.local
echo "GOOGLE_CLIENT_SECRET=your_google_client_secret" >> .env.local

# Start development server
npm run dev
# Frontend will run on http://localhost:3000
```

### Environment Variables

**Backend (.env.local):**

```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/petAdoption?retryWrites=true&w=majority
```

**Frontend (.env.local):**

```
NEXT_PUBLIC_API_URL=http://localhost:5000
BETTER_AUTH_SECRET=your-secret-key-min-32-chars
BETTER_AUTH_URL=http://localhost:3000/api/auth
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

## API Endpoints

### Pets

- `GET /pets` - Get all pets with search & filter
- `GET /pets/featured` - Get featured pets (max 6)
- `GET /pets/:id` - Get single pet details
- `GET /pets/owner/:email` - Get pets by owner
- `POST /pets` - Add new pet (authenticated)
- `PATCH /pets/:id` - Update pet (owner only)
- `DELETE /pets/:id` - Delete pet (owner only)

### Adoption Requests

- `GET /requests/user/:userId` - Get user's requests
- `GET /requests/pet/:petId` - Get requests for a pet
- `POST /requests` - Submit adoption request
- `PATCH /requests/:id/approve` - Approve request (pet owner only)
- `PATCH /requests/:id/reject` - Reject request
- `DELETE /requests/:id` - Cancel request

## Deployment

### Deploy to Vercel

#### Frontend

```bash
cd pet-adoption-client
vercel
```

#### Backend

```bash
cd pet-adoption-server
vercel
```

## GitHub Commits

- **Client**: 15+ meaningful commits tracking feature development
- **Server**: 8+ meaningful commits for API development

## Testing the Application

### Test User Accounts

1. **Sign up** with email and password
2. **Login** with email/password or Google
3. **Browse pets** on All Pets page
4. **Submit adoption requests** (requires login)
5. **Add pets** from dashboard
6. **Manage requests** from My Listings

### Key User Flows

1. **New User Flow**: Sign up → Browse pets → Submit adoption request → Track in My Requests
2. **Pet Owner Flow**: Sign up → Add pet → View requests → Approve/Reject requests
3. **Login Persistence**: Refresh page while logged in (should NOT redirect to login)

## Security Considerations

- MongoDB credentials secured with environment variables
- Password validation enforced (6+ chars, uppercase, lowercase)
- JWT-based authentication
- Protected API routes
- CORS configured for authorized domains
- No sensitive data exposed in client-side code

## Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Responsive Breakpoints

- Mobile: 320px and up
- Tablet: 768px and up
- Desktop: 1024px and up

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**: Verify MONGODB_URI is correct and IP whitelist is configured
2. **CORS Error**: Check if frontend URL is in backend CORS allowed origins
3. **Auth Redirect Loop**: Clear browser cookies and try again
4. **API 404**: Ensure backend is running on correct port

## Future Enhancements

- Image upload functionality
- Email notifications for adoption requests
- User profile pages
- Pet comparison feature
- Favorites/wishlist functionality
- Payment integration for adoption fees
- Admin dashboard
- Real-time notifications using WebSockets

## Contributing

Pull requests are welcome. For major changes, please open an issue first.

## License

This project is licensed under the MIT License.

## Contact

For questions or support, please contact: mohammadsajibulislam2024@gmail.com

---

**Made with ❤️ for pet lovers worldwide**

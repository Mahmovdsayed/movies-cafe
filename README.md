# Movies Cafe 🎬

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![MongoDB](https://img.shields.io/badge/MongoDB-6.0-green?style=for-the-badge&logo=mongodb)
![Redux](https://img.shields.io/badge/Redux-Toolkit-purple?style=for-the-badge&logo=redux)

**Movies Cafe** is a cutting-edge web application designed for movie enthusiasts. It combines a rich database of movies and TV shows with social features and AI-powered insights, delivering a modern, immersive experience.

---

## 🌟 Key Features

### 🎥 Discovery Engine

- **Comprehensive Database**: Powered by **TMDB API**, access millions of movies, TV shows, and people.
- **Smart Lists**: Explore curated lists like _Trending_, _Top Rated_, _Upcoming_, and _Now Playing_.
- **Advanced Search**: Find exactly what you're looking for with filters for movies, TV shows, companies, and keywords.
- **Deep Dive**: View detailed cast & crew info, production companies, and similar recommendations.

### � AI-Powered Insights

- **Gemini Integration**: Get AI-generated summaries, recommendations, and trivia about your favorite content.
- **Smart Content**: AI-enhanced descriptions and analysis for a deeper understanding of films.

### 🤝 Social Ecosystem

- **User Profiles**: Customize your presence with avatars and banners.
- **Activity Feed**: Follow friends and see what they are watching, liking, and reviewing.
- **Interactive Posts**: Create posts, repost content, and engage with the community through likes and comments.
- **Collections**: curate your personal **Favorites** and **Watchlist**.

### ⚡ Performance & Tech

- **Next.js 16**: Leveraging the latest App Router, Server Actions, and Turbopack for blazing fast performance.
- **PWA Support**: Installable as a Progressive Web App for a native-like experience on mobile.
- **Responsive Design**: Beautifully crafted UI with **Tailwind CSS** and **HeroUI**, optimized for all devices.
- **Secure Auth**: Custom JWT-based authentication system with secure cookie handling.

---

## � Project Structure

```bash
movies-cafe/
├── app/                  # Next.js App Router (Pages & API Routes)
│   ├── actions/          # Server Actions (Data mutations)
│   ├── api/              # Internal API endpoints
│   ├── (routes)/         # Application routes (movies, tv-shows, etc.)
│   └── layout.tsx        # Root layout
├── components/           # Reusable UI Components
│   ├── layout/           # Layout components (Navbar, Sidebar)
│   ├── ui/               # Atomic UI elements (Buttons, Cards)
│   └── ...
├── lib/                  # Core libraries & configurations
│   ├── connectToDatabase.ts # MongoDB connection
│   └── tmdbAPI.ts        # TMDB API wrapper
├── models/               # Mongoose Data Models (User, Post, Movie, etc.)
├── redux/                # Global State Management (Redux Toolkit)
├── helpers/              # Utility functions & helpers
├── public/               # Static assets
└── styles/               # Global styles & Tailwind config
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18+)
- **MongoDB** (Local or Atlas)
- **TMDB API Key** (Get one [here](https://www.themoviedb.org/documentation/api))
- **Cloudinary Account** (For image hosting)
- **Google Gemini API Key** (For AI features)

### Installation

1.  **Clone the repository**

    ```bash
    git clone https://github.com/Mahmovdsayed/movies-cafe.git
    cd movies-cafe
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Environment Setup**
    Create a `.env.local` file in the root directory and populate it with the following variables:

    | Variable                            | Description                                      |
    | :---------------------------------- | :----------------------------------------------- |
    | `MONGODB_URI`                       | Connection string for your MongoDB database      |
    | `API_KEY`                           | Internal API key for securing your API routes    |
    | `TMDB_API_KEY`                      | Your API Key from The Movie Database (TMDB)      |
    | `GEMINI_API_KEY`                    | Google Gemini API Key for AI features            |
    | `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloudinary Cloud Name                            |
    | `CLOUDINARY_API_KEY`                | Cloudinary API Key                               |
    | `CLOUDINARY_API_SECRET`             | Cloudinary API Secret                            |
    | `JWT_SECRET`                        | Secret key for signing JWT tokens                |
    | `LOGIN_SIG`                         | Secret signature for login verification          |
    | `EMAIL`                             | Email address for sending notifications/OTP      |
    | `EMAIL_PASSWORD`                    | App password for the email account               |
    | `NODE_ENV`                          | Environment mode (`development` or `production`) |

4.  **Run Development Server**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 📜 Scripts

| Command         | Description                                  |
| :-------------- | :------------------------------------------- |
| `npm run dev`   | Starts the development server with Turbopack |
| `npm run build` | Builds the application for production        |
| `npm run start` | Starts the production server                 |
| `npm run lint`  | Runs ESLint to check for code quality issues |

---

## 📡 API Overview

The application exposes several internal API endpoints for data management:

- **`/api/auth/*`**: Handles user authentication (signup, signin, verify).
- **`/api/users/[username]`**: Fetches user profile data.
- **`/api/users/[username]/posts`**: Retrieves user posts.
- **`/api/users/[username]/favorites`**: Manages user favorites.
- **`/api/users/[username]/watchlist`**: Manages user watchlist.
- **`/api/users/[username]/aiContent`**: Fetches AI-generated content for the user.
- **`/api/generate`**: Endpoint to trigger AI content generation.

---

## 🤝 Contributing

Contributions are welcome! If you'd like to improve Movies Cafe, please follow these steps:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the branch (`git push origin feature/AmazingFeature`).
5.  Open a Pull Request.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 📞 Contact

For any inquiries or support, please contact:
**Mahmoud Sayed** - [mahmoudsayed3576@gmail.com](mailto:mahmoudsayed3576@gmail.com)

# WOMTechTest

A React Native CLI application built as a technical assessment. The app demonstrates authentication flow, JWT session management, and data fetching from a public REST API.

---

## Test Account

| Field    | Value               |
|----------|---------------------|
| Email    | `test@example.com`  |
| Password | `password123`       |

---

## Features

- **Splash screen** — checks JWT validity on launch and routes to Home or Login automatically
- **Login** — form validation with React Hook Form + Yup, credential check, JWT generation stored in MMKV
- **Home** — fetches and lists posts from JSONPlaceholder with pull-to-refresh, loading, error, and empty states
- **Post Detail** — fetches individual post by ID with loading, error, and empty states
- **Logout** — clears the stored token and resets navigation to Login
- **Dark mode** — all screens respond to the system colour scheme

---

## Tech Stack

| Category | Library / Tool |
|---|---|
| Framework | React Native 0.84.1 (CLI) |
| Language | TypeScript 5.8 (strict) |
| Navigation | React Navigation 7 — Stack |
| Forms | React Hook Form 7 + Yup 1.6 |
| Storage | react-native-mmkv 4 (AES-256 encrypted) |
| JWT | crypto-js 4.2 (pure JS HS256 — no native bridge) |
| HTTP | Axios 1.15 |
| Package manager | Yarn |

---

## Project Structure

```
src/
├── api/                  # Axios clients and API wrapper functions
├── assets/               # Fonts (Montserrat)
├── components/           # Shared UI components (Button, Text, TextField, SkeletonLoading)
├── constants/            # MMKV helpers, dimension utils, keys, URLs
├── hooks/
│   ├── auth-hooks/       # useAuth (login, logout, getValidToken)
│   └── navigation-hooks/ # useNavigate (navigateScreen, resetNavigate, popScreen)
├── modules/
│   ├── auth/
│   │   └── screens/
│   │       ├── splash/   # SplashScreen + useSplash
│   │       └── login/    # LoginScreen + useLogin + styles
│   └── main/
│       ├── components/
│       │   └── PostCard/ # Reusable post card (Home + Detail)
│       └── screens/
│           ├── home/     # HomeScreen + useHome + styles
│           └── detail/   # DetailScreen + useDetail + styles
├── navigation/           # Root navigator, Auth stack, Main stack
├── theme/                # Light / dark theme tokens + text scale
└── types/                # Global ambient types (Post, ParamLists)
```

---

## Navigation Flow

```
NavigationContainer
└── Root Stack
    ├── Auth Stack  (initial)
    │   ├── SplashScreen  ← checks JWT → redirects
    │   └── LoginScreen
    └── Main Stack
        ├── HomeScreen
        └── DetailScreen
```

---

## Prerequisites

| Tool | Version |
|---|---|
| Node.js | ≥ 22.11.0 |
| Yarn | any |
| Ruby | ≥ 2.7 (iOS) |
| CocoaPods | ≥ 1.12 (iOS) |
| Xcode | ≥ 15 (iOS) |
| Android Studio | Hedgehog or newer |
| JDK | 17 |

---

## Getting Started

### 1. Clone and install dependencies

```bash
git clone https://github.com/JonathanTriC/wom-tech-test.git
cd WOMTechTest
yarn install
```

### 2. iOS — install pods

```bash
cd ios && pod install && cd ..
```

### 3. Start Metro bundler

```bash
yarn start
```

### 4. Run on a simulator / device

```bash
# iOS
yarn ios

# Android
yarn android
```

---

## API

Posts are fetched from [JSONPlaceholder](https://jsonplaceholder.typicode.com) — a free, public REST API. No API key is required.

| Endpoint | Description |
|---|---|
| `GET /posts` | Fetch all posts (Home screen) |
| `GET /posts/:id` | Fetch a single post (Detail screen) |

---

## Auth Implementation Notes

- Credentials are hardcoded for demo purposes (`test@example.com` / `password123`)
- On successful login a **HS256 JWT** is generated client-side using `crypto-js` and stored in MMKV with AES-256 encryption
- Token expiry is **1 hour** from login time
- On every app launch the Splash screen calls `getValidToken()` — if the token is missing or expired the user is sent to Login; otherwise directly to Home
- Logout removes the token from MMKV and resets the navigation stack to Login

# 🚀 CodeArena Frontend (Client)

<p align="center">
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="https://github.com/vishalrathore8oct/codearena-client#readme" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="https://github.com/vishalrathore8oct/codearena-client/graphs/commit-activity" target="_blank">
    <img alt="Maintenance" src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" />
  </a>
  <a href="https://github.com/vishalrathore8oct/codearena-client/blob/master/LICENSE" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/github/license/vishalrathore8oct/codearena-client" />
  </a>
  <a href="https://x.com/vishalrathore66" target="_blank">
    <img alt="X: @vishalrathore66" src="https://img.shields.io/twitter/follow/vishalrathore66.svg?style=social" />
  </a>
</p>

---

## 📖 Overview

**CodeArena** is a modern, responsive, and highly interactive frontend application designed to provide a seamless competitive programming experience. Built with **React, TypeScript, Vite, Tailwind CSS, and DaisyUI**, it offers an intuitive UI for users to solve coding problems, submit solutions, and track their progress.

This application acts as the client-side counterpart to the [CodeArena Server](https://github.com/vishalrathore8oct/codearena-server), interacting seamlessly to compile and evaluate code in real-time using self hosted Judge0 open source software.

---

## ✨ Key Features

### 💻 Interactive Code Editor
- **Embedded IDE:** Powered by `@monaco-editor/react` for a rich, IDE-like coding experience with syntax highlighting and automatic formatting.
- **Multi-Language Support:** Easily switch between languages for code execution.

### ⚡ Real-Time Code Execution
- **Instant Feedback:** Submit solutions and receive instantaneous test case results, runtime constraints, and error tracing directly on the frontend.
- **Historical Submissions:** Track previous submissions along with average memory and execution times.

### 🚀 Performance & State Management
- **Global State:** Fast, scalable, and lightweight global state management powered by **Zustand**.
- **Optimized Builds:** Built and bundled incredibly fast using **Vite**.

### 🎨 Responsive & Modern UI
- **Beautiful Interface:** A highly polished and accessible user interface crafted using **Tailwind CSS** and **DaisyUI**.
- **Interactive Notifications:** Elegant toast notifications for form actions, success states, and error handling using **React Hot Toast**.

### 🔐 Secure Authentication & Forms
- **Session Management:** Secure JWT-based authentication flow with protected routes and persistent user sessions via Axios interceptors.
- **Type-Safe Validation:** Robust and type-safe form handling powered by **React Hook Form** and **Zod** schema validation.

---

## 💻 Tech Stack

| Category                | Technology                        |
| :---------------------- | :-------------------------------- |
| **Framework & Build**   | React 19, Vite                    |
| **Language**            | TypeScript                        |
| **Styling & UI**        | Tailwind CSS v4, DaisyUI v5       |
| **Icons**               | Lucide React                      |
| **State Management**    | Zustand                           |
| **Routing**             | React Router DOM                  |
| **API Client**          | Axios                             |
| **Forms & Validation**  | React Hook Form, Zod              |
| **Code Editor**         | `@monaco-editor/react`            |

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your local machine:

- **Node.js** (v18 or higher recommended)
- **npm** or **yarn**
- The [CodeArena Backend Server](https://github.com/vishalrathore8oct/codearena-server) running locally or hosted.

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/vishalrathore8oct/codearena-client.git
   cd codearena-client
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure Environment Variables:**

   ```bash
   cp env.sample .env
   ```

   _Edit `.env` and fill in your API base URL pointing to your running CodeArena backend._

4. **Start the Development Server:**

   ```bash
   npm run dev
   ```

---

## ⚙️ Environment Variables

Your `.env` file should look like this:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:4000/api/v1
```

---

## 📂 Project Structure

A clean, modular, and scalable frontend architecture:

```
client/
├── public/                 # Static assets (images, fonts, etc.)
├── src/
│   ├── components/         # Reusable UI components (LoadingState, EmptyState, etc.)
│   ├── lib/                # Third-party configurations (Axios instances, Helpers)
│   ├── pages/              # Application views/pages (Home, Login, ProblemPage)
│   ├── store/              # Zustand global state stores (useProblemStore, useSubmissionStore)
│   ├── types/              # Global TypeScript interfaces and type definitions
│   ├── App.tsx             # Root component and Routing configuration
│   ├── index.css           # Global styles and Tailwind imports
│   └── main.tsx            # React DOM entry point
├── package.json            # Project dependencies and scripts
└── vite.config.ts          # Vite bundler configuration
```

---

## 🔧 Scripts

| Task           | Command          | Description                                      |
| :------------- | :--------------- | :----------------------------------------------- |
| **Start Dev**  | `npm run dev`    | Starts the Vite development server               |
| **Build**      | `npm run build`  | Runs TS checks and bundles the app for production|
| **Preview**    | `npm run preview`| Previews the production build locally            |
| **Lint**       | `npm run lint`   | Lints the codebase using ESLint                  |

---

## 👤 Author

**Vishal Rathore**

- GitHub: [@vishalrathore8oct](https://github.com/vishalrathore8oct)
- X / Twitter: [@vishalrathore66](https://x.com/vishalrathore66)
- LinkedIn: [Vishal Rathore](https://www.linkedin.com/in/vishalrathore8oct/)
- Blog: [vishalrathore.hashnode.dev](https://vishalrathore.hashnode.dev/)

---

## 🤝 Contributing

Contributions, issues, and feature requests are always welcome! Feel free to check the [issues page](https://github.com/vishalrathore8oct/codearena-client/issues) or submit a pull request.

---

## ⭐ Show Your Support

If this project helped you or you learned something new, please give it a ⭐️ on GitHub!

---

## 📝 License

This project is licensed under the [ISC License](https://opensource.org/licenses/ISC).

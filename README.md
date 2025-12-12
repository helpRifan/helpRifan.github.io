# Personal Portfolio Website

This is the repository for my personal portfolio website, live at [rifan.me](https://rifan.me). It is a single-page application built with modern web technologies.

## ✨ Features

-   **Responsive Design:** The site is fully responsive and works on all devices.
-   **Component-Based:** Built with a modular and maintainable component-based architecture.
-   **Analytics:** Includes analytics to track page visits.

## 🚀 Technologies Used

-   **Framework:** [React](https://reactjs.org/)
-   **Build Tool:** [Vite](https://vitejs.dev/)
-   **Language:** [TypeScript](https://www.typescriptlang.org/)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
-   **Deployment:** [GitHub Pages](https://pages.github.com/)

## 🛠️ Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

-   [Node.js](https://nodejs.org/) (version 20 or later)
-   [npm](https://www.npmjs.com/)

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/helpRifan/helpRifan.github.io.git
    ```
2.  **Navigate to the project directory:**
    ```sh
    cd helpRifan.github.io
    ```
3.  **Install dependencies:**
    ```sh
    npm install
    ```

### Running Locally

To start the development server, run the following command:

```sh
npm run dev
```

This will start the application on `http://localhost:8080`.

**Note:** Do not try to open `index.html` directly in your browser or serve the root directory with a simple static server. This will cause a "Failed to load module script" error because browsers cannot execute `.tsx` files directly. Always use `npm run dev` for development.

### Building for Production

To create a production-ready build, run:

```sh
npm run build
```

The built files will be located in the `dist/` directory.

### Previewing Production Build

To preview the production build locally:

```sh
npm run preview
```

## 🐛 Troubleshooting

### "Failed to load module script... MIME type of 'application/octet-stream'"

If you see this error:
1.  **Local Development:** Ensure you are using `npm run dev`. Do not use a generic file server (like `python -m http.server`) on the root directory.
2.  **Deployment:** Ensure you are deploying the `dist` folder, not the source code. If using GitHub Pages, make sure your repository settings are pointing to the `gh-pages` branch (if using the `gh-pages.yml` workflow) or utilizing the GitHub Actions source (if using `deploy.yml`).

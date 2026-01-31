import { UserProvider } from "./context/UserContext";


export const metadata = {
  title: "AI Counsellor",
  description: "Your Global Education Journey",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="light" suppressHydrationWarning>
      <head>
        {/* Tailwind CDN */}
        <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>

        {/* Tailwind Config */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              tailwind.config = {
                darkMode: "class",
                theme: {
                  extend: {
                    colors: {
                      "primary": "#0d93f2",
                      "charcoal": "#1e293b",
                      "soft-blue": "#f0f9ff",
                      "border-light": "#e2e8f0",
                    },
                    fontFamily: {
                      "display": ["Lexend", "sans-serif"]
                    },
                    borderRadius: {
                      "DEFAULT": "0.375rem",
                      "lg": "0.75rem",
                      "xl": "1rem",
                      "2xl": "1.5rem",
                      "3xl": "2rem",
                      "full": "9999px"
                    },
                  },
                },
              }
            `,
          }}
        />

        {/* Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />

        {/* Base Tailwind Styles */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              @layer base {
                body {
                  font-family: 'Lexend', sans-serif;
                  background-color: white;
                  color: #1e293b;
                }
              }
              .nav-link {
                color: #475569;
                font-weight: 500;
                transition: color 0.2s;
              }
              .nav-link:hover {
                color: #0d93f2;
              }
              .hero-overlay {
                background: linear-gradient(
                  to right,
                  rgba(255,255,255,0.95) 30%,
                  rgba(255,255,255,0.2) 100%
                );
              }
            `,
          }}
        />
      </head>

      <body className="min-h-screen">
        <UserProvider>
        {children}
        </UserProvider>
      </body>
    </html>
  );
}

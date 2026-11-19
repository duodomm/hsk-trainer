import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import appCss from "../styles.css?url";

const APP_NAME = "HSK Trainer";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: APP_NAME },
      { name: "theme-color", content: "#0f172a" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700&family=Inter:wght@400;500;600&display=swap",
      },
    ],
  }),
  component: () => (
    <html lang="ru">
      <head>
        <HeadContent />
      </head>
      <body className="bg-slate-50 text-slate-900 antialiased">
        <Outlet />
        <Scripts />
      </body>
    </html>
  ),
});

import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { LanguageProvider } from "@/lib/language-context";
import "@/lib/i18n";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-hero px-4">
      <div className="max-w-md text-center">
        <div className="font-display text-8xl font-bold text-gradient-gold">404</div>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 shadow-soft"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "صحة بلس — احجز موعدك مع أفضل الأطباء في الخليج" },
      { name: "description", content: "منصة صحة بلس — احجز موعدك مع أفضل الأطباء والعيادات والمستشفيات في السعودية والإمارات والكويت وقطر والبحرين وعُمان." },
      { name: "author", content: "Sehha Plus" },
      { property: "og:title", content: "صحة بلس — احجز موعدك مع أفضل الأطباء في الخليج" },
      { property: "og:description", content: "منصة صحة بلس — احجز موعدك مع أفضل الأطباء والعيادات والمستشفيات في السعودية والإمارات والكويت وقطر والبحرين وعُمان." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "صحة بلس — احجز موعدك مع أفضل الأطباء في الخليج" },
      { name: "twitter:description", content: "منصة صحة بلس — احجز موعدك مع أفضل الأطباء والعيادات والمستشفيات في السعودية والإمارات والكويت وقطر والبحرين وعُمان." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/a4110c98-c8e0-4cc3-b486-2dcb5ec9f695/id-preview-94523b6f--5cb6509a-65a3-41b8-884b-0cf261b88d37.lovable.app-1776518916640.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/a4110c98-c8e0-4cc3-b486-2dcb5ec9f695/id-preview-94523b6f--5cb6509a-65a3-41b8-884b-0cf261b88d37.lovable.app-1776518916640.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Arabic:wght@300;400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <LanguageProvider>
      <Outlet />
    </LanguageProvider>
  );
}

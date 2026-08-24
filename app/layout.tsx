import "@/styles/globals.css"

import type { Metadata, Viewport } from "next"
import dynamic from "next/dynamic"
import Script from "next/script"
import { GoogleTagManager } from "@next/third-parties/google"
import { NuqsAdapter } from "nuqs/adapters/next/app"
import type { WebSite, WithContext } from "schema-dts"

import { JSON_LD_ID, personJsonLd } from "@/config/json-ld"
import { META_THEME_COLORS, SITE_INFO, X_HANDLE } from "@/config/site"
import { fontVariables } from "@/lib/fonts"
import { JsonLdScript } from "@/lib/json-ld"
import { Providers } from "@/components/providers"
import { SiteBottomNav } from "@/components/site-bottom-nav"
import { SiteFooterCad } from "@/components/site-footer-cad"
import { SiteHeader } from "@/components/site-header"
import { USER } from "@/features/portfolio/data/user"

const ScrollToTop = dynamic(() =>
  import("@/components/scroll-to-top").then((mod) => mod.ScrollToTop)
)

function getWebSiteJsonLd(): WithContext<WebSite> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": JSON_LD_ID.website,
    name: SITE_INFO.name,
    url: SITE_INFO.url,
    author: personJsonLd,
  }
}

// Thanks @shadcn-ui, @tailwindcss
const darkModeScript = String.raw`
  try {
    if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.querySelector('meta[name="theme-color"]').setAttribute('content', '${META_THEME_COLORS.dark}')
    }
  } catch (_) {}

  try {
    if (/(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)) {
      document.documentElement.classList.add('os-macos')
    }
  } catch (_) {}
`

export const metadata: Metadata = {
  metadataBase: new URL(SITE_INFO.url),
  title: {
    template: `%s – ${SITE_INFO.name}`,
    default: `${USER.displayName} – ${USER.jobTitle}`,
  },
  description: SITE_INFO.description,
  keywords: SITE_INFO.keywords,
  authors: [
    {
      name: USER.username,
      url: SITE_INFO.url,
    },
  ],
  creator: USER.username,
  openGraph: {
    siteName: SITE_INFO.name,
    url: "/",
    type: "profile",
    locale: "en_US",
    firstName: USER.firstName,
    lastName: USER.lastName,
    username: USER.username,
    gender: USER.gender,
    images: [
      {
        url: SITE_INFO.ogImage,
        width: 1200,
        height: 630,
        alt: SITE_INFO.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: X_HANDLE,
    creator: X_HANDLE,
    images: [SITE_INFO.ogImage],
  },
  // Uses the auto-detected app/favicon.ico by default. Add your own
  // favicon/apple-touch-icon files under app/ or public/ when ready.
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: META_THEME_COLORS.light,
}

const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={fontVariables} suppressHydrationWarning>
      <head>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{ __html: darkModeScript }}
        />
        {/*
          Thanks @tailwindcss. We inject the script via the `<Script/>` tag again,
          since we found the regular `<script>` tag to not execute when rendering a not-found page.
         */}
        <Script src={`data:text/javascript;base64,${btoa(darkModeScript)}`} />
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var value = localStorage.getItem('avatarLights');
                document.documentElement.dataset.avatarLights = JSON.parse(value || '"on"');
              } catch(_) {}
            `,
          }}
        />
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
              try {
                var value = localStorage.getItem('sidebarOpen');
                document.documentElement.dataset.sidebarOpen = JSON.parse(value || 'true');
              } catch(_) {}
            `,
          }}
        />
        <JsonLdScript data={getWebSiteJsonLd()} />
        {ADSENSE_CLIENT && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
      </head>

      {process.env.NEXT_PUBLIC_GTM_ID && (
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID} />
      )}

      <body>
        <Providers>
          <NuqsAdapter>
            {/* References:
                - https://base-ui.com/react/overview/quick-start#portals
                - https://base-ui.com/react/overview/quick-start#ios-26-safari */}
            <div className="group/layout relative isolate">
              <SiteHeader />
              <main className="max-w-screen overflow-x-clip px-2">
                {children}
              </main>
              <SiteFooterCad />
              <div
                className="pointer-events-none fixed inset-x-0 bottom-0 z-50"
                aria-hidden
              >
                <div className="h-(--fade-bottom-height) bg-linear-to-b from-transparent to-background mask-linear-[to_top,var(--background)_25%,transparent] backdrop-blur-[1px]" />
                <div className="bg-background pb-[env(safe-area-inset-bottom,0)]" />
              </div>
              <SiteBottomNav />
              <ScrollToTop />
            </div>
          </NuqsAdapter>
        </Providers>
      </body>
    </html>
  )
}

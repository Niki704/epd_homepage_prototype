import "./globals.css";

// Next.js requires a root layout. The real page shell (header, footer,
// providers) lives in app/[locale]/layout.tsx since routing is locale-based.
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

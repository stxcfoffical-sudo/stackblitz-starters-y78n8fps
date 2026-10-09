import "./globals.css";

export const metadata = {
  title: "Pacific Coast Networks",
  description: "The home of Pacific Coast Networks.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

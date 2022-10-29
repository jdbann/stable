import Link from "next/link";
import { fraunces, inter } from "../lib/fonts";
import "./global.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>emailaddress.horse</title>
      </head>

      <body className={`${fraunces.variable} ${inter.variable}`}>
        <div className="flex flex-col gap-12">
          <div className="container py-4 text-sm">
            <header>
              <nav>
                <ul className="flex flex-row gap-4">
                  <li>
                    <h2>
                      <Link href="/">emailaddress.horse</Link>
                    </h2>
                  </li>
                </ul>
              </nav>
            </header>
          </div>

          <div className="container py-4">{children}</div>

          <div className="container py-4 text-sm">
            <footer>
              <nav>
                <ul className="flex flex-row justify-end gap-4">
                  <li>
                    <Link href="https://twitter.com/jdbannister">
                      @jdbannister
                    </Link>
                  </li>
                </ul>
              </nav>
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}

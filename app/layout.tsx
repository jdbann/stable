import Link from "next/link";
import * as Nav from "./Nav";
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
              <Nav.Root className="flex flex-row gap-4" aria-label="Main">
                <Nav.Link href="/">emailaddress.horse</Nav.Link>
              </Nav.Root>
            </header>
          </div>

          <div className="container py-4">{children}</div>

          <div className="container py-4 text-sm">
            <footer>
              <Nav.Root
                className="flex flex-row justify-end gap-4"
                aria-label="Social links"
              >
                <Nav.Link href="https://twitter.com/jdbannister">
                  @jdbannister
                </Nav.Link>
              </Nav.Root>
            </footer>
          </div>
        </div>
      </body>
    </html>
  );
}

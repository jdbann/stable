"use client";

import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

type LinkProps = Pick<
  React.ComponentProps<typeof NextLink>,
  "children" | "href"
>;

export const Link = ({ children, href }: LinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <NavigationMenu.Item>
      <NavigationMenu.Link active={isActive} asChild>
        <NextLink href={href}>{children}</NextLink>
      </NavigationMenu.Link>
    </NavigationMenu.Item>
  );
};

type RootProps = {
  "aria-label": string;
  children: React.ReactNode;
  className?: string;
};

export const Root = ({ children, className, ...props }: RootProps) => {
  return (
    <NavigationMenu.Root aria-label={props["aria-label"]}>
      <NavigationMenu.List className={className}>
        {children}
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
};

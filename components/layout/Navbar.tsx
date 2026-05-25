"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const links = [
  { href: "/solutions", label: "Solutions" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#e7e5e4] bg-white/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image src="/fasal-logo-cropped.png" alt="Fasal SEA" width={160} height={56} className="h-12 w-auto object-contain" priority />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-[#44403c] hover:text-[#1c1917] transition-colors"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/enterprise"
              className="text-sm font-semibold text-[#16a34a] hover:text-[#15803d] transition-colors"
            >
              For Enterprises
            </Link>
            <Link
              href="/distributor"
              className="text-sm font-semibold text-[#0d9488] hover:text-[#0f766e] transition-colors"
            >
              Become a Distributor
            </Link>
            <Link
              href="/enterprise#enterprise-form"
              className="inline-flex items-center gap-1.5 bg-[#16a34a] hover:bg-[#15803d] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
            >
              Request a Pilot
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="lg:hidden p-2 rounded-md text-[#44403c] hover:text-[#1c1917]" aria-label="Open menu">
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </SheetTrigger>
            <SheetContent side="right" className="w-72 pt-12">
              <nav className="flex flex-col gap-4">
                {links.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="text-base font-medium text-[#44403c] hover:text-[#1c1917] py-1"
                  >
                    {l.label}
                  </Link>
                ))}
                <div className="border-t border-[#e7e5e4] pt-4 flex flex-col gap-3">
                  <Link
                    href="/enterprise"
                    onClick={() => setOpen(false)}
                    className="text-base font-semibold text-[#16a34a]"
                  >
                    For Enterprises
                  </Link>
                  <Link
                    href="/distributor"
                    onClick={() => setOpen(false)}
                    className="text-base font-semibold text-[#0d9488]"
                  >
                    Become a Distributor
                  </Link>
                  <Link
                    href="/enterprise#enterprise-form"
                    onClick={() => setOpen(false)}
                    className="mt-2 inline-flex items-center justify-center bg-[#16a34a] hover:bg-[#15803d] text-white font-semibold py-3 px-4 rounded-lg transition-colors w-full"
                  >
                    Request a Pilot
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

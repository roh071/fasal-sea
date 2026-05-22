import Link from "next/link";
import { Leaf, Mail } from "lucide-react";

const footerLinks = {
  Platform: [
    { label: "Solutions", href: "/solutions" },
    { label: "Case Studies", href: "/case-studies" },
  ],
  "Get Started": [
    { label: "For Enterprises", href: "/enterprise" },
    { label: "Become a Distributor", href: "/distributor" },
  ],
  Company: [
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy-policy" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-[#1c1917] text-[#a8a29e]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl text-white mb-3">
              <Leaf className="h-6 w-6 text-[#16a34a]" strokeWidth={2.5} />
              <span>Fasal</span>
              <span className="text-xs font-medium text-[#78716c] tracking-widest uppercase ml-1">SEA</span>
            </Link>
            <p className="text-sm leading-relaxed mb-4">
              Crop intelligence for the farms that feed the world.
            </p>
            <a
              href="mailto:rohan.sharma@wolkus.com"
              className="flex items-center gap-2 text-sm text-[#d6d3d1] hover:text-white transition-colors"
            >
              <Mail className="h-4 w-4 text-[#16a34a]" />
              rohan.sharma@wolkus.com
            </a>
            <p className="text-xs mt-2 text-[#78716c]">International Business — Malaysia & Philippines</p>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-white font-semibold text-sm mb-4">{title}</h3>
              <ul className="space-y-2">
                {links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm hover:text-white transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-[#292524] mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-[#57534e]">
          <p>© {new Date().getFullYear()} Fasal — Wolkus Technology Solutions Pvt. Ltd.</p>
          <p>PDPA Malaysia · Philippines Data Privacy Act Compliant</p>
        </div>
      </div>
    </footer>
  );
}

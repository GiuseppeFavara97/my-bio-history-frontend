import Image from 'next/image'
import { Separator } from "@/components/ui/separator";
import { DribbbleIcon, GithubIcon, TwitchIcon, TwitterIcon } from "lucide-react";
import Link from "next/link";

const footerLinks = [
  {
    title: "Overview",
    href: "#",
  },
  {
    title: "Features",
    href: "#",
  },
  {
    title: "Pricing",
    href: "#",
  },
  {
    title: "Careers",
    href: "#",
  },
  {
    title: "Help",
    href: "#",
  },
  {
    title: "Privacy",
    href: "#",
  },
];

const Footer = () => {
  return (
    <footer className="bg-[#244673] text-white border-t border-white/10">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-10 py-12">
        {/* --- TOP SECTION --- */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
          {/* LOGO + LINKS ALLINEATI */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-6">
            {/* LOGO */}
            <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
              <Image
                src="/logo.png"
                width={60}
                height={60}
                alt="Logo My Bio History"
                className="rounded-md"
              />
            </Link>

            {/* LINKS */}
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-medium ml-4">
              {footerLinks.map(({ title, href }) => (
                <li key={title}>
                  <Link
                    href={href}
                    className="text-white/80 hover:text-white transition-colors duration-200"
                  >
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-white/20" />

        {/* --- BOTTOM SECTION --- */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-y-6 text-sm">
          {/* COPYRIGHT */}
          <span className="text-white/70 text-center sm:text-left">
            &copy; {new Date().getFullYear()}{" "}
            <Link href="/" className="hover:text-white transition-colors">
              My Bio History
            </Link>
            . Tutti i diritti riservati.
          </span>

          {/* SOCIAL ICONS */}
          <div className="flex items-center gap-6">
            <Link href="#" target="_blank" className="hover:text-white transition-transform hover:scale-110">
              <TwitterIcon className="h-5 w-5" />
            </Link>
            <Link href="#" target="_blank" className="hover:text-white transition-transform hover:scale-110">
              <DribbbleIcon className="h-5 w-5" />
            </Link>
            <Link href="#" target="_blank" className="hover:text-white transition-transform hover:scale-110">
              <TwitchIcon className="h-5 w-5" />
            </Link>
            <Link href="#" target="_blank" className="hover:text-white transition-transform hover:scale-110">
              <GithubIcon className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
};

export default Footer;
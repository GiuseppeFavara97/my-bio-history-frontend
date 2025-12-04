import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
    <div className="flex flex-col bg-[#244673]">
      <div className="bg-muted grow" />
      <footer className="border-t">
        <div className="mx-auto max-w-(--breakpoint-xl)">
          <div className="flex flex-col items-start justify-between gap-x-8 gap-y-10 px-6 py-12 sm:flex-row xl:px-0">
            <div>
              <Image
                src="logo.png" 
                width={100}
                height={100}
                alt="Picture of the author"
              />

              <ul className="mt-6 flex flex-wrap items-center gap-4">
                {footerLinks.map(({ title, href }) => (
                  <li key={title}>
                    <Link href={href} className="text-muted-foreground hover:text-foreground">
                      {title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Subscribe Newsletter */}
            <div className="w-full max-w-xs">
              <h6 className="font-medium">Rimani aggiornato</h6>
              <form className="mt-6 flex items-center gap-2">
                <Input type="email" placeholder="Inserisci la tua email" />
                <Button>Iscriviti</Button>
              </form>
            </div>
          </div>
          <Separator />
          <div className="flex flex-col-reverse items-center justify-between gap-x-2 gap-y-5 px-6 py-8 sm:flex-row xl:px-0">
            {/* Copyright */}
            <span className="text-muted-foreground">
              &copy; {new Date().getFullYear()}{" "}
              <Link href="/" target="_blank">
                My Bio History
              </Link>
              . All rights reserved.
            </span>

            <div className="text-muted-foreground flex items-center gap-5">
              <Link href="#" target="_blank">
                <TwitterIcon className="h-5 w-5" />
              </Link>
              <Link href="#" target="_blank">
                <DribbbleIcon className="h-5 w-5" />
              </Link>
              <Link href="#" target="_blank">
                <TwitchIcon className="h-5 w-5" />
              </Link>
              <Link href="#" target="_blank">
                <GithubIcon className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
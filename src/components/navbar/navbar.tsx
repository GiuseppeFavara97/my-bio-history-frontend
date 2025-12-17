import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="bg-muted">
      <nav className="bg-[#244673] h-16 border-b ">
        <div className="mx-auto text-white flex h-full max-w-(--breakpoint-xl) items-center justify-between px-4 sm:px-6 lg:px-8">
          <Logo />

          {/* Desktop Menu */}
          <NavMenu className="hidden md:block" />

          <div className="flex items-center gap-3">
            <Link href="/auth">
              <Button variant="outline" className="hidden sm:inline-flex text-black">
                Accedi
              </Button>
            </Link>

            {/* Mobile Menu */}
            <div className="md:hidden">
              <NavigationSheet />
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
import Link from "next/link";

// react components.
import Search from "./Search";
import CartButton from "./CartButton";
import Adjustment from "./Adjustment";

const Header = () => {
  return (
    <header className="py-4 bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-teal-600 font-bold text-2xl uppercase">
          <span className="block md:hidden">PG</span>
          <span className="hidden md:block">Product Gallery</span>
        </Link>
        <Search />
        <CartButton />
        <Adjustment />
      </div>
    </header>
  );
};

export default Header;

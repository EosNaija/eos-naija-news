import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SearchComponent from "./Search";
import { getCategories } from "../services";
import { faB, faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Header = () => {
  const session = false;
  const [showMenu, setShowMenu] = useState(false);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategories().then((newCategories) => setCategories(newCategories));
  }, []);
  // const items = useSelector(selectBasketItem);

  return (
    <header className="body-padding sticky top-0 mb-1 z-30 flex w-full items-center shadow-lg justify-between bg-[#ffff] py-1 md:py-4">
      <div className="items-center justify-center md:w-1/5 ">
        <Link href="/">
          <div className="relative w-12 h-12 md:w-24 cursor-pointer opacity-75 transition hover:opacity-100  mr-5">
            <Image
              src="/altlogo.png"
              layout="fill"
              objectFit="contain"
              alt="blog logo"
            />
          </div>
        </Link>
      </div>
      <nav className="hidden md:flex md:flex-grow font-normal md:font-semibold  md:justify-center md:items-center">
        {categories.map((category) => (
          <Link key={category.slug} href={`/categories/${category.slug}`}>
            <span className="headerLink md:p-2 md:mr-2 lg:mr-3 lg:p-4">
              {category.name}
            </span>
          </Link>
        ))}
      </nav>

      {/* Menu Icon (visible on small screens) */}
      <div onClick={() => setShowMenu(!showMenu)} className="md:hidden">
        <span className="font-bold w-fit text-md p-2 hover:text-blue-800">
          <FontAwesomeIcon className="w-6" icon={faBars} />
        </span>
      </div>

      {/* Menu Dropdown (visible on small screens) */}
      {showMenu && (
        <div className="md:hidden flex flex-col absolute top-full text-sm right-0 w-1/3 rounded-lg bg-gray-900 text-white py-3 px-4">
          {categories.map((category) => (
            <Link key={category.slug} href={`/categories/${category.slug}`}>
              <span
                onClick={() => setShowMenu(!showMenu)}
                className="headerLink p-1 text-left"
              >
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      )}

      <SearchComponent />
    </header>
  );
};

export default Header;

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faDiscord,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelopeOpen } from "@fortawesome/free-solid-svg-icons";

// const items = useSelector(selectBasketItem);

function Footer() {
  const session = false;
  return (
    <footer className="bg-green-600 body-padding text-white py-6 items-center">
      <div className="container mx-auto flex flex-col md:flex-col items-center justify-between">
        <div className="text-center flex-col justify-center my-4 items-center flex md:text-left ">
          <p className="mb-3 text-md md:text-lg font-bold">EOS NIGERIA</p>
          <p className="text-xs md:text-sm">
            EOS Nigeria provides first-hand EOS news in Nigerian Pidgin Language
          </p>
        </div>
        <div className="flex text-lg items-center mt-4 text-white">
          <Link href="https://discord.gg/FrCjqgWgjM">
            <a target="_blank" className="mr-4">
              <FontAwesomeIcon
                className="text-lg md:text-xl w-5"
                icon={faDiscord}
              />
              <span className="sr-only ">Discord</span>
            </a>
          </Link>
          <Link href="https://twitter.com/_eosnigeria">
            <a target="_blank" className="mr-4">
              <FontAwesomeIcon
                className="text-lg md:text-xl w-5"
                icon={faTwitter}
              />
              <span className="sr-only">Twitter</span>
            </a>
          </Link>
          <Link href="mailto:eosnaija@gmail.com">
            <a target="_blank">
              <FontAwesomeIcon
                icon={faEnvelopeOpen}
                className="text-lg md:text-xl w-5"
              />
              <span className="sr-only">Gmail</span>
            </a>
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

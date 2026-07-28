import Link from "next/link";
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";
import {  FaPhoneAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { FiMapPin } from "react-icons/fi";


export default function Footer() {
  return (
    <footer className=" bg-gray-200 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-green-500">
            Snacksy
          </h2>
          <p className="mt-4 text-gray-400">
            Experience authentic flavors crafted with passion and the finest
            ingredients. Every meal is made to create unforgettable memories.
          </p>
        </div>

        {/* Quick Links */}
        <div className=" flex justify-center items-center flex-col">
          <h3 className="text-lg font-semibold mb-4">
            Quick Links
          </h3>

          <ul className="space-y-3 text-gray-400 flex gap-2">
            <li>
              <Link href="/" className="hover:text-green-500">
                Home
              </Link>
            </li>

            <li>
              <Link href="/menu" className="hover:text-green-500">
                Menu
              </Link>
            </li>

            <li>
              <Link href="/about" className="hover:text-green-500">
                About
              </Link>
            </li>

            <li>
              <Link href="/contact" className="hover:text-green-500">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-4">
            Contact
          </h3>

          <div className="space-y-4 text-gray-400">
            <div className="flex items-center gap-2">
              <FiMapPin className="w-5 h-5 text-green-500" />
              <span>Noida, Uttar Pradesh</span>
            </div>

            <div className="flex items-center gap-2">
              <FaPhoneAlt className="w-5 h-5 text-green-500" />
              <span>+91 98765 43210</span>
            </div>

            <div className="flex items-center gap-2">
              <IoIosMail className="w-5 h-5 text-green-500" />
              <span>info@snacksy.com</span>
            </div>
          </div>
        </div>

        {/* Social */}
        <div className="text-white">
          <h3 className="text-lg font-semibold mb-4 text-black">
            Follow Us
          </h3>

          <div className="flex gap-4">
            <Link
              href="#"
              className="p-2 rounded-full bg-gray-600 hover:bg-green-500 transition"
            >
              <FaFacebookF size={20} /> 
            </Link>

            <Link
              href="#"
              className="p-2 rounded-full bg-gray-600 hover:bg-green-500 transition"
            >
              <FaInstagram size={20} />
            </Link>

            <Link
              href="#"
              className="p-2 rounded-full bg-gray-600 hover:bg-green-500 transition"
            >
              <FaXTwitter size={20} />
            </Link>
          </div>
        </div>
      </div>

      <div className=" py-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Snacksy. All rights reserved.
      </div>
    </footer>
  );
}
import { FaInstagram, FaFacebookF, FaXTwitter, FaYoutube } from "react-icons/fa6";
import Link from "next/link";
import logo from "@/public/images/The-Today-Indians-Logo-Pack/Main-White@4x.png";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-black text-white text-sm px-4 md:px-12 py-8">
      <div className="max-w-7xl mx-auto border-b border-gray-700 pb-8 flex flex-col lg:flex-row gap-10">
        {/* Left Logo and Description */}
        <div className="lg:w-1/4">
          <Link href="/">
            <Image src={logo} alt="Logo" className="h-10 w-auto" />
          </Link>
          <p className="text-gray-400 mb-4">
            The Today Indians is a trusted digital news platform bringing you the latest stories from India and around the world.
          </p>
          <p className="text-gray-500 text-xs mb-4">© 2025 The Today Indians All Rights Reserved</p>
          <div>
            <p className="font-semibold mb-2">Follow us :</p>
            <div className="flex gap-3 text-xl">
              <FaInstagram />
              <FaFacebookF />
              <FaXTwitter />
              <FaYoutube />
            </div>
          </div>
        </div>

        {/* Footer Links */}
        <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 text-sm">
          {/* National */}
          <div>
            <h4 className="font-semibold mb-2">National</h4>
            <ul className="space-y-1 text-gray-300">
              <li><Link href="#">Politics</Link></li>
              <li><Link href="#">Government Policies</Link></li>
              <li><Link href="#">Crime</Link></li>
              <li><Link href="#">Education</Link></li>
              <li><Link href="#">Weather Updates</Link></li>
            </ul>
          </div>

          {/* Entertainment */}
          <div>
            <h4 className="font-semibold mb-2">Entertainment</h4>
            <ul className="space-y-1 text-gray-300">
              <li><Link href="#">Bollywood</Link></li>
              <li><Link href="#">Hollywood</Link></li>
              <li><Link href="#">TV Series</Link></li>
              <li><Link href="#">OTT</Link></li>
              <li><Link href="#">Music</Link></li>
            </ul>
          </div>

          {/* World */}
          <div>
            <h4 className="font-semibold mb-2">World</h4>
            <ul className="space-y-1 text-gray-300">
              <li><Link href="#">Asia</Link></li>
              <li><Link href="#">Americas</Link></li>
              <li><Link href="#">Europe</Link></li>
              <li><Link href="#">Middle East</Link></li>
              <li><Link href="#">Africa</Link></li>
            </ul>
          </div>

          {/* Health */}
          <div>
            <h4 className="font-semibold mb-2">Health</h4>
            <ul className="space-y-1 text-gray-300">
              <li><Link href="#">Fitness</Link></li>
              <li><Link href="#">Mental Health</Link></li>
              <li><Link href="#">Medicine</Link></li>
              <li><Link href="#">Lifestyle Tips</Link></li>
            </ul>
          </div>

          {/* Opinion */}
          <div>
            <h4 className="font-semibold mb-2">Opinion</h4>
            <ul className="space-y-1 text-gray-300">
              <li><Link href="#">Editorial</Link></li>
              <li><Link href="#">Columns</Link></li>
              <li><Link href="#">Expert Voices</Link></li>
              <li><Link href="#">Finance</Link></li>
              <li><Link href="#">Real Estate</Link></li>
            </ul>
          </div>

          {/* Business */}
          <div>
            <h4 className="font-semibold mb-2">Business</h4>
            <ul className="space-y-1 text-gray-300">
              <li><Link href="#">Stock Market</Link></li>
              <li><Link href="#">Startups</Link></li>
              <li><Link href="#">Economy</Link></li>
              <li><Link href="#">Finance</Link></li>
              <li><Link href="#">Real Estate</Link></li>
            </ul>
          </div>

          {/* Sports */}
          <div>
            <h4 className="font-semibold mb-2">Sports</h4>
            <ul className="space-y-1 text-gray-300">
              <li><Link href="#">Football</Link></li>
              <li><Link href="#">Rugby</Link></li>
              <li><Link href="#">Tennis</Link></li>
              <li><Link href="#">Cricket</Link></li>
              <li><Link href="#">Olympics</Link></li>
            </ul>
          </div>

          {/* Technology */}
          <div>
            <h4 className="font-semibold mb-2">Technology</h4>
            <ul className="space-y-1 text-gray-300">
              <li><Link href="#">AI</Link></li>
              <li><Link href="#">Gadgets</Link></li>
              <li><Link href="#">Internet</Link></li>
              <li><Link href="#">Cyber Security</Link></li>
              <li><Link href="#">Robotics</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Links */}
      <div className="mt-6 flex flex-col md:flex-row justify-center md:justify-between items-center text-gray-500 text-xs gap-2 flex-wrap">
        <Link href="#">Privacy Policy</Link>
        <Link href="#">Terms of Use</Link>
        <Link href="#">Sales and Refunds</Link>
        <Link href="#">Cookies</Link>
        <Link href="#">Legal</Link>
        <Link href="#">Advertise with us</Link>
      </div>
    </footer>
  );
};

export default Footer;

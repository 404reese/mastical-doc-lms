import Link from "next/link";
import { GraduationCap, Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              {/* <div className="bg-white p-2 rounded-lg">
                <GraduationCap className="h-6 w-6 text-blue-600" />
              </div>
              <span className="text-xl font-bold">Doctor LMS</span> */}
              <img src="/main-logo-white.png" alt="" />
            </div>
            <p className="text-blue-200 mb-6 leading-relaxed">
              Empowering medical professionals with world-class education and
              continuous learning opportunities.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="bg-blue-800 p-2 rounded-lg hover:bg-blue-700 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-blue-800 p-2 rounded-lg hover:bg-blue-700 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-blue-800 p-2 rounded-lg hover:bg-blue-700 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="bg-blue-800 p-2 rounded-lg hover:bg-blue-700 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-blue-200 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#courses" className="text-blue-200 hover:text-white transition-colors">
                  Courses
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-blue-200 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-blue-200 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="text-blue-200 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link href="#" className="text-blue-200 hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="text-blue-200 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-blue-200 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="text-blue-200 hover:text-white transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-blue-200 hover:text-white transition-colors">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-blue-200">
                <Mail className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span>academy@drgauranggaikwad.com</span>
              </li>
              <li className="flex items-start gap-3 text-blue-200">
                <Phone className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span>+91 93243 21819</span>
              </li>
              <li className="flex items-start gap-3 text-blue-200">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span>101, Shivana Apartment, Mogul Ln, Mahim, Mumbai - 400016</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-blue-200 text-sm text-center md:text-left">
  © {new Date().getFullYear()} Dr. Gaurang Gaikwad Academy. All rights reserved. <br />

<p className="flex items-center justify-center md:justify-start text-blue-200 text-sm mt-2 gap-2">
  <span>Developed &amp; Managed by</span>
  <a
    href="https://mastical.com"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2"
  >
    <img src="/mastical-logo.png" alt="Mastical logo" className="h-6 w-auto" />
  </a>
</p>
  
</p>

            <div className="flex gap-6">
              <Link href="#" className="text-blue-200 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-blue-200 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="text-blue-200 hover:text-white text-sm transition-colors">
                Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

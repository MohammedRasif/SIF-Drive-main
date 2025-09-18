import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="mx-auto px-4 sm:px-6 py-12 w-full md:px-20 lg:px-40">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Logo and Name */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              {/* Placeholder for company logo - replace with your image */}
              <img src="/logoName.png" alt="" />
            </div>
          </div>

          {/* Our Collaborators */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-semibold mb-4">Our collaborators</h4>
            <ul className="space-y-2">
              <li>
                <span className="text-gray-300 hover:text-white transition-colors cursor-pointer">
                  Demo company limited
                </span>
              </li>
              <li>
                <span className="text-gray-300 hover:text-white transition-colors cursor-pointer">
                  Demo task company
                </span>
              </li>
            </ul>
          </div>

          {/* About Us */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-semibold mb-4">About Us</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Reviews
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Learn more
                </a>
              </li>
            </ul>
          </div>

          {/* Follow Us On */}
          <div className="lg:col-span-1">
            <h4 className="text-lg font-semibold mb-4">Follow us on</h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-gray-400 text-sm">
              © 2025 Digital. All rights reserved
            </div>

            {/* Footer Links */}
            <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Privacy Notice
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                FAQs
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Cookies Policy & Settings
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

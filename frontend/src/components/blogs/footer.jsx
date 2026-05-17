import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-10">
      <div className="max-w-6xl mx-auto px-6 py-12">

        {/* TOP SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* About */}
          <div>
            <h2 className="text-xl font-bold text-white mb-3">
              MyBlog
            </h2>
            <p className="text-sm text-gray-400 leading-6">
              A modern blogging platform where developers share ideas,
              tutorials, and experiences. Built with Django & React.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-white cursor-pointer">Home</li>
              <li className="hover:text-white cursor-pointer">Blogs</li>
              <li className="hover:text-white cursor-pointer">Create Post</li>
              <li className="hover:text-white cursor-pointer">About</li>
            </ul>
          </div>

          {/* Contact / Social */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">
              Connect
            </h3>

            <p className="text-sm text-gray-400 mb-3">
              Follow us on social media
            </p>

            <div className="flex gap-4 text-xl">
              <FaFacebook className="hover:text-blue-500 cursor-pointer" />
              <FaTwitter className="hover:text-sky-400 cursor-pointer" />
              <FaInstagram className="hover:text-pink-500 cursor-pointer" />
              <FaGithub className="hover:text-white cursor-pointer" />
            </div>
          </div>

        </div>

        {/* BOTTOM SECTION */}
        <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">

          <p>© {new Date().getFullYear()} MyBlog. All rights reserved.</p>

          <div className="flex gap-4 mt-3 md:mt-0">
            <span className="hover:text-white cursor-pointer">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer">Terms</span>
            <span className="hover:text-white cursor-pointer">Support</span>
          </div>

        </div>
      </div>
    </footer>
  );
}
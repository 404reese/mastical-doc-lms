"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, GraduationCap, Globe } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/lib/language-context";
import { Language } from "@/lib/translations";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const languageOptions: { code: Language; label: string; flag: string }[] = [
    { code: "bg", label: "Български", flag: "🇧🇬" },
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "fr", label: "Français", flag: "🇫🇷" },
    { code: "de", label: "Deutsch", flag: "🇩🇪" },
    { code: "hi", label: "हिंदी", flag: "🇮🇳" },
    { code: "hu", label: "Magyar", flag: "🇭🇺" },
    { code: "pt", label: "Português", flag: "🇵🇹" },
    { code: "ro", label: "Română", flag: "🇷🇴" },
    { code: "ru", label: "Русский", flag: "🇷🇺" },
    { code: "es", label: "Español", flag: "🇪🇸" },
  ];

  const currentLang = languageOptions.find(l => l.code === language) || languageOptions[1];

  const navLinks: Array<{ href: string; label: string; isAdmin?: boolean }> = [
    { href: "/", label: t.home },
    { href: "/courses", label: t.courses },
    { href: "/forum", label: t.forums },
    // { href: "#about", label: t.about },
    // { href: "#contact", label: t.contact },
    { href: "/admin", label: "Admin", isAdmin: true },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-blue-600 p-2 rounded-lg group-hover:bg-blue-700 transition-colors">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-blue-900">Doctor LMS</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`${
                  link.isAdmin 
                    ? "text-orange-600 hover:text-orange-700 font-semibold" 
                    : "text-gray-700 hover:text-blue-600 font-medium"
                } transition-colors relative group`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 ${
                  link.isAdmin ? "bg-orange-600" : "bg-blue-600"
                } group-hover:w-full transition-all duration-300`}></span>
              </Link>
            ))}
            <div className="relative">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Globe className="h-5 w-5 text-blue-600" />
                <span className="text-xl">{currentLang.flag}</span>
              </button>
              {showLangMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border-2 border-gray-100 py-2 z-50"
                >
                  {languageOptions.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setShowLangMenu(false);
                      }}
                      className={`w-full text-left px-4 py-2 hover:bg-blue-50 transition-colors flex items-center gap-3 ${
                        language === lang.code ? "bg-blue-50 font-semibold" : ""
                      }`}
                    >
                      <span className="text-xl">{lang.flag}</span>
                      <span>{lang.label}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </div>
            <Link
              href="#start"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              {t.getStarted}
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-white border-t"
        >
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block py-2 ${
                  link.isAdmin 
                    ? "text-orange-600 hover:text-orange-700 font-semibold" 
                    : "text-gray-700 hover:text-blue-600 font-medium"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t pt-3">
              <div className="mb-3">
                <span className="block text-sm font-semibold text-gray-600 mb-2 px-2">Language:</span>
                <div className="grid grid-cols-2 gap-2">
                  {languageOptions.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setIsOpen(false);
                      }}
                      className={`px-3 py-2 rounded-lg text-sm transition-colors flex items-center gap-2 ${
                        language === lang.code
                          ? "bg-blue-100 text-blue-700 font-semibold"
                          : "bg-gray-50 hover:bg-gray-100"
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span className="text-xs">{lang.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              <Link
                href="#start"
                className="block w-full text-center bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                onClick={() => setIsOpen(false)}
              >
                {t.getStarted}
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
}

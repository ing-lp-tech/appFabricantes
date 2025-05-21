"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { GiTShirt } from "react-icons/gi";
import { GiBarbute } from "react-icons/gi";
import { GiCowled } from "react-icons/gi";
import { GiCpu } from "react-icons/gi";
import { GiElectricalResistance } from "react-icons/gi";

import { FaCalculator, FaPaintBrush, FaTimes, FaBars } from "react-icons/fa";
import { BsPersonVcard } from "react-icons/bs";

import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    {
      name: "Calcular Costos",
      icon: <FaCalculator className="mr-2" />,
      href: "#calculadora",
    },
    {
      name: "Tipos de Estampado",
      icon: <FaPaintBrush className="mr-2" />,
      href: "#tipos-estampado",
    },
    {
      name: "About me",
      icon: <BsPersonVcard className="mr-2" />,
      href: "#about-me",
    },

    /* {
      name: "Personalizar",
      icon: <FaPaintBrush className="mr-2" />,
      href: "#personalizar",
    }, */
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "bg-blue-800 shadow-xl" : "bg-blue-900"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo y marca */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <GiCpu className="h-8 w-8 text-white" />
              <span className="ml-2 text-white font-bold text-xl hidden sm:block">
                <span className="text-blue-200">Ingeniero</span>
                <span className="text-white">Emprendedor</span>
              </span>
            </Link>
          </div>

          {/* Menú desktop */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-white hover:bg-blue-700 transition-colors duration-200"
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Botón móvil */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white focus:outline-none"
              aria-label="Menú"
            >
              {isOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil con animación */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 bg-blue-800">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium text-white hover:bg-blue-700 block"
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;

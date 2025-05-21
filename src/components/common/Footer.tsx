"use client";
import React from "react";
import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-8 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Ingeniero electronico</h3>
            <p className="text-blue-300">Graduado de la UNLAM</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Enlaces rápidos</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#tipos-estampado"
                  className="text-blue-300 hover:text-white transition-colors"
                >
                  Tipos de Estampado
                </a>
              </li>
              <li>
                <a
                  href="#personalizar"
                  className="text-secondary-light hover:text-white"
                >
                  Personalizar
                </a>
              </li>
              <li>
                <a
                  href="#calculadora"
                  className="text-secondary-light hover:text-white"
                >
                  Calculadora
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Síguenos</h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-secondary-light hover:text-white text-2xl"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="text-secondary-light hover:text-white text-2xl"
              >
                <FaFacebook />
              </a>
              <a
                href="#"
                className="text-secondary-light hover:text-white text-2xl"
              >
                <FaTwitter />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-blue-700 text-center text-blue-300">
          <p>
            &copy; {new Date().getFullYear()} Ingeniero-emprendedor. Todos los
            derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

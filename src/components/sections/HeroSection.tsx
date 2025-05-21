"use client";

import { m as motion } from "framer-motion";
import Link from "next/link";
import React from "react";

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-r from-primary to-accent-dark text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Diseña tu Estilo Único
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Personaliza tus prendas con nuestros estampados de alta calidad y
            calcula el costo al instante.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              href="#personalizar"
              className="bg-white text-primary-dark px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Comenzar Ahora
            </Link>
            <Link
              href="#tipos-estampado"
              className="border-2 border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-dark transition"
            >
              Ver Técnicas
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

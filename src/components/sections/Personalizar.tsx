"use client";

import React, { useState } from "react";
// ... resto del código igual

const Personalizar = () => {
  const [design, setDesign] = useState("");
  const [color, setColor] = useState("#000000");
  const [size, setSize] = useState("M");
  const [quantity, setQuantity] = useState(1);

  return (
    <section id="personalizar" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Personaliza tu Prenda
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Sube tu diseño y selecciona las opciones para tu estampado
            personalizado.
          </p>
        </div>

        <div className="max-w-3xl mx-auto bg-gray-50 p-8 rounded-xl shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">
                  Sube tu diseño
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <input
                    type="file"
                    className="hidden"
                    id="design-upload"
                    accept="image/*"
                    onChange={(e) => setDesign(e.target.value)}
                  />
                  <label
                    htmlFor="design-upload"
                    className="cursor-pointer text-gray-500 hover:text-primary"
                  >
                    Haz clic para subir archivo
                    <p className="text-sm mt-2">Formatos: JPG, PNG, SVG</p>
                  </label>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 mb-2">
                  Color del estampado
                </label>
                <div className="flex items-center">
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-12 h-12 mr-4"
                  />
                  <span>{color.toUpperCase()}</span>
                </div>
              </div>
            </div>

            <div>
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Talla</label>
                <select
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="XS">XS</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                  <option value="XXL">XXL</option>
                </select>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Cantidad</label>
                <div className="flex items-center">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="bg-gray-200 px-3 py-1 rounded-l"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    className="w-16 text-center border-t border-b border-gray-300 py-1"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="bg-gray-200 px-3 py-1 rounded-r"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="mt-8">
                <button className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-dark transition">
                  Ver Precio
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Personalizar;

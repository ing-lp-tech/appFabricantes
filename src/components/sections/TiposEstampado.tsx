import React from "react";
import { FaTshirt, FaRegLightbulb, FaFire } from "react-icons/fa";

const TiposEstampado = () => {
  const techniques = [
    {
      id: 1,
      title: "Serigrafía",
      description:
        "Técnica tradicional de alta durabilidad, ideal para grandes cantidades.",
      icon: <FaTshirt className="text-4xl text-primary" />,
    },
    {
      id: 2,
      title: "Vinilo Textil",
      description: "Perfecto para diseños detallados y pequeñas cantidades.",
      icon: <FaRegLightbulb className="text-4xl text-accent" />,
    },
    {
      id: 3,
      title: "Sublimación",
      description:
        "Ideales para diseños a todo color y fotografías en prendas claras.",
      icon: <FaFire className="text-4xl text-secondary" />,
    },
  ];

  return (
    <section id="tipos-estampado" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Técnicas de Estampado
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Conoce los diferentes métodos que ofrecemos para dar vida a tus
            diseños.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {techniques.map((tech) => (
            <div
              key={tech.id}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition duration-300"
            >
              <div className="flex justify-center mb-4">{tech.icon}</div>
              <h3 className="text-xl font-semibold text-center mb-3">
                {tech.title}
              </h3>
              <p className="text-gray-600 text-center">{tech.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TiposEstampado;

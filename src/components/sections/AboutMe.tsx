"use client";
import React from "react";
import unlam from "../../assets/unlam.jpg";
import {
  FaMicrochip,
  FaRobot,
  FaLaptopCode,
  FaFootballBall,
  FaBolt,
} from "react-icons/fa";

const AboutMe = () => {
  return (
    <div id="about-me" className="bg-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="lg:flex lg:items-center lg:justify-between">
          {/* Imagen */}
          <div className="lg:w-1/2 lg:order-2">
            <img
              className="w-full h-auto rounded-lg shadow-xl"
              src={unlam.src} // Fixed the StaticImageData issue by using .src
              alt="Ingeniero Electrónico"
            />
          </div>

          {/* Texto */}
          <div className="lg:w-1/2 lg:order-1 lg:pr-12 mt-10 lg:mt-0">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-8">
              SOBRE MÍ
            </h2>

            {/* Sección 1: Ingeniero Electrónico */}
            <div className="mb-12">
              <div className="flex items-center mb-4">
                <FaBolt className="text-yellow-500 text-2xl mr-3" />
                <h3 className="text-2xl font-semibold text-gray-800">
                  Ingeniero Electrónico
                </h3>
              </div>
              <p className="text-lg text-gray-600">
                Graduado de la Universidad Nacional de La Matanza (UNLaM), he
                dedicado mi carrera al fascinante mundo de la electrónica. Desde
                sistemas embebidos hasta automatización industrial, mi pasión
                por la tecnología me ha llevado a trabajar en diversos proyectos
                innovadores que combinan hardware y software.
              </p>
            </div>

            {/* Sección 2: Experiencia Multidisciplinaria */}
            <div className="mb-12">
              <div className="flex items-center mb-4">
                <FaMicrochip className="text-blue-500 text-2xl mr-3" />
                <h3 className="text-2xl font-semibold text-gray-800">
                  Experiencia en múltiples rubros
                </h3>
              </div>
              <p className="text-lg text-gray-600">
                He trabajado en diversos rubros como la electromedicina,
                automatización industrial, desarrollo de hardware y consultoría
                técnica. Esta diversidad me ha permitido desarrollar soluciones
                integrales que combinan lo mejor de cada especialidad.
              </p>
            </div>

            {/* Sección 3: Programación y Tecnología */}
            <div className="mb-12">
              <div className="flex items-center mb-4">
                <FaLaptopCode className="text-green-500 text-2xl mr-3" />
                <h3 className="text-2xl font-semibold text-gray-800">
                  Pasión por la programación
                </h3>
              </div>
              <p className="text-lg text-gray-600">
                Además de la electrónica, soy un apasionado por el desarrollo de
                software y los avances tecnológicos. Me mantengo constantemente
                actualizado en lenguajes como Python, C++ y JavaScript,
                aplicándolos en proyectos de IoT y sistemas inteligentes.
              </p>
            </div>

            {/* Sección 4: Deportes */}
            <div className="mb-12">
              <div className="flex items-center mb-4">
                <FaFootballBall className="text-red-500 text-2xl mr-3" />
                <h3 className="text-2xl font-semibold text-gray-800">
                  Amante del deporte
                </h3>
              </div>
              <p className="text-lg text-gray-600">
                Fuera del laboratorio, soy un ferviente aficionado al fútbol y
                los deportes en general. Creo firmemente en los valores que el
                deporte enseña: trabajo en equipo, disciplina y perseverancia,
                los cuales aplico en mi vida profesional.
              </p>
            </div>

            {/* Sección 5: Trabajo en equipo */}
            <div className="mb-12">
              <div className="flex items-center mb-4">
                <FaRobot className="text-purple-500 text-2xl mr-3" />
                <h3 className="text-2xl font-semibold text-gray-800">
                  Enfoque colaborativo
                </h3>
              </div>
              <p className="text-lg text-gray-600">
                En cada proyecto, valoro el trabajo en equipo y la sinergia
                entre diferentes disciplinas. He liderado equipos
                multidisciplinarios para desarrollar soluciones tecnológicas
                innovadoras que superan las expectativas de los clientes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;

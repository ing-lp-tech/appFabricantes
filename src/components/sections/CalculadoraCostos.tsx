"use client";

import React, { useState } from "react";
import {
  FaPlus,
  FaMinus,
  FaRuler,
  FaBox,
  FaCalculator,
  FaTshirt,
  FaTired,
  FaPercentage,
} from "react-icons/fa";

type Insumo = {
  id: string;
  tipo: "unidad" | "metro";
  nombre: string;
  cantidad: number;
  precio: string;
  metrosTotales?: string;
  metrosPorPrenda?: string;
};

const CalculadoraCostosProduccion = () => {
  // Estados para la sección de tela
  const [kgTela, setKgTela] = useState<string>("");
  const [precioKgTela, setPrecioKgTela] = useState<string>("");
  const [prendasTotales, setPrendasTotales] = useState<string>("");

  // Estados para costura
  const [costoCostura, setCostoCostura] = useState<string>("");

  // Estados para insumos
  const [insumos, setInsumos] = useState<Insumo[]>([]);
  const [nuevoInsumo, setNuevoInsumo] = useState<Omit<Insumo, "id">>({
    tipo: "unidad",
    nombre: "",
    cantidad: 1,
    precio: "",
    metrosTotales: "",
    metrosPorPrenda: "",
  });

  // Estado para margen de ganancia
  const [margenGanancia, setMargenGanancia] = useState<string>("30");

  // Resultados
  const [resultados, setResultados] = useState<{
    costoUnitario: number;
    precioVenta: number;
    costoTotal: number;
  } | null>(null);

  // Función para manejar cambios en inputs numéricos
  const handleNumericInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string>>,
    allowDecimals: boolean = true
  ) => {
    const value = e.target.value;
    const regex = allowDecimals ? /^[0-9]*\.?[0-9]*$/ : /^[0-9]*$/;

    if (value === "" || regex.test(value)) {
      setter(value);
    }
  };

  const agregarInsumo = () => {
    if (
      !nuevoInsumo.nombre ||
      (nuevoInsumo.tipo === "unidad" && !nuevoInsumo.precio) ||
      (nuevoInsumo.tipo === "metro" &&
        (!nuevoInsumo.precio ||
          !nuevoInsumo.metrosTotales ||
          !nuevoInsumo.metrosPorPrenda))
    ) {
      return;
    }

    setInsumos([
      ...insumos,
      {
        ...nuevoInsumo,
        id: Date.now().toString(),
      },
    ]);

    // Resetear formulario
    setNuevoInsumo({
      tipo: "unidad",
      nombre: "",
      cantidad: 1,
      precio: "",
      metrosTotales: "",
      metrosPorPrenda: "",
    });
  };

  const eliminarInsumo = (id: string) => {
    setInsumos(insumos.filter((insumo) => insumo.id !== id));
  };

  const calcularCostos = () => {
    // Convertir valores a números (0 si está vacío)
    const kgTelaNum = kgTela === "" ? 0 : parseFloat(kgTela);
    const precioKgTelaNum = precioKgTela === "" ? 0 : parseFloat(precioKgTela);
    const prendasTotalesNum =
      prendasTotales === "" ? 0 : parseInt(prendasTotales);
    const costoCosturaNum = costoCostura === "" ? 0 : parseFloat(costoCostura);
    const margenGananciaNum =
      margenGanancia === "" ? 0 : parseFloat(margenGanancia);

    if (prendasTotalesNum <= 0) return;

    // Costo total de tela
    const costoTelaTotal = kgTelaNum * precioKgTelaNum;

    // Costo total de costura
    const costoCosturaTotal = costoCosturaNum * prendasTotalesNum;

    // Costo de insumos
    const costoInsumos = insumos.reduce((total, insumo) => {
      console.log("total, insumo:", total, insumo);
      if (insumo.tipo === "unidad") {
        const precio = insumo.precio === "" ? 0 : parseFloat(insumo.precio);
        console.log("precio:", precio);

        return total + precio * insumo.cantidad * parseInt(prendasTotales);
      } else {
        const precio = insumo.precio === "" ? 0 : parseFloat(insumo.precio);
        const metrosPorPrenda =
          insumo.metrosPorPrenda === ""
            ? 0
            : parseFloat(insumo.metrosPorPrenda || "0");
        const metrosTotales =
          insumo.metrosTotales === ""
            ? 0
            : parseFloat(insumo.metrosTotales || "0");

        // Calcular el costo basado en los metros totales y el precio total
        // Y también considerar los metros por prenda si es necesario
        const metrosRequeridos = metrosPorPrenda * prendasTotalesNum;
        const factorUso =
          metrosRequeridos > 0 ? metrosTotales / metrosRequeridos : 1;
        return total + precio / factorUso;
      }
    }, 0);

    // Costo total de producción

    console.log(
      "costoTelaTotal + costoCosturaTotal + costoInsumos:",
      costoTelaTotal + costoCosturaTotal + costoInsumos
    );
    const costoTotal = costoTelaTotal + costoCosturaTotal + costoInsumos;

    // Costo unitario
    const costoUnitario = costoTotal / prendasTotalesNum;

    // Precio de venta con margen de ganancia
    const precioVenta = costoUnitario / (1 - margenGananciaNum / 100);

    setResultados({
      costoUnitario,
      precioVenta,
      costoTotal,
    });
  };

  return (
    <section id="calculadora" className="py-12 bg-gray-50 mt-30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center justify-center">
            <FaCalculator className="mr-3 text-blue-600" />
            Calculadora de Costos de Producción
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Calcula el costo por prenda considerando todos los costos
            variables(no fijos)
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Sección de Tela */}
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <FaTshirt className="mr-2 text-blue-500" />
              Material Principal (Tela)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Kg de tela utilizados
                </label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="text"
                    value={kgTela}
                    onChange={(e) => handleNumericInputChange(e, setKgTela)}
                    className="block w-full pl-3 pr-12 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0.0"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">kg</span>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Precio por kg
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="text"
                    value={precioKgTela}
                    onChange={(e) =>
                      handleNumericInputChange(e, setPrecioKgTela)
                    }
                    className="block w-full pl-7 pr-12 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0.00"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Total de prendas
                </label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="text"
                    value={prendasTotales}
                    onChange={(e) =>
                      handleNumericInputChange(e, setPrendasTotales, false)
                    }
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sección de Costura */}
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <FaTired className="mr-2 text-blue-500" />
              Costos de Confección
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Costo de costura por prenda
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">$</span>
                  </div>
                  <input
                    type="text"
                    value={costoCostura}
                    onChange={(e) =>
                      handleNumericInputChange(e, setCostoCostura)
                    }
                    className="block w-full pl-7 pr-12 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0.00"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Sección de Insumos */}
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <FaBox className="mr-2 text-blue-500" />
              Insumos Adicionales
            </h3>

            {/* Lista de insumos agregados */}
            {insumos.length > 0 && (
              <div className="mb-6 space-y-3">
                {insumos.map((insumo) => (
                  <div
                    key={insumo.id}
                    className="bg-gray-50 p-3 rounded-lg flex justify-between items-center"
                  >
                    <div>
                      <span className="font-medium">{insumo.nombre}</span>
                      {insumo.tipo === "unidad" ? (
                        <span className="text-sm text-gray-600 ml-2">
                          (x{insumo.cantidad}) - $
                          {parseFloat(insumo.precio || "0").toFixed(2)} c/u
                        </span>
                      ) : (
                        <span className="text-sm text-gray-600 ml-2">
                          ({insumo.metrosTotales}m totales - $
                          {parseFloat(insumo.precio || "0").toFixed(2)} total -{" "}
                          {insumo.metrosPorPrenda}m/prend
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => eliminarInsumo(insumo.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaMinus />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Formulario para nuevo insumo */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tipo de insumo
                  </label>
                  <div className="flex space-x-2">
                    <button
                      type="button"
                      onClick={() =>
                        setNuevoInsumo({
                          ...nuevoInsumo,
                          tipo: "unidad",
                          metrosTotales: "",
                          metrosPorPrenda: "",
                        })
                      }
                      className={`flex items-center px-3 py-2 rounded-md text-sm ${nuevoInsumo.tipo === "unidad" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
                    >
                      <FaBox className="mr-1" /> Por Unidad
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        setNuevoInsumo({
                          ...nuevoInsumo,
                          tipo: "metro",
                          cantidad: 1,
                        })
                      }
                      className={`flex items-center px-3 py-2 rounded-md text-sm ${nuevoInsumo.tipo === "metro" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
                    >
                      <FaRuler className="mr-1" /> Por Metro
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre del insumo
                  </label>
                  <input
                    type="text"
                    value={nuevoInsumo.nombre}
                    onChange={(e) =>
                      setNuevoInsumo({ ...nuevoInsumo, nombre: e.target.value })
                    }
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Ej: Hilos, botones, etiquetas..."
                  />
                </div>
              </div>

              {nuevoInsumo.tipo === "unidad" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cantidad
                    </label>
                    <select
                      value={nuevoInsumo.cantidad}
                      onChange={(e) =>
                        setNuevoInsumo({
                          ...nuevoInsumo,
                          cantidad: parseInt(e.target.value),
                        })
                      }
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="1">x1</option>
                      <option value="2">x2</option>
                      <option value="3">x3</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Precio unitario
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">$</span>
                      </div>
                      <input
                        type="text"
                        value={nuevoInsumo.precio}
                        onChange={(e) =>
                          handleNumericInputChange(e, (value) =>
                            setNuevoInsumo({ ...nuevoInsumo, precio: value })
                          )
                        }
                        className="block w-full pl-7 pr-12 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Metros totales
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <input
                        type="text"
                        value={nuevoInsumo.metrosTotales || ""}
                        onChange={(e) =>
                          handleNumericInputChange(e, (value) =>
                            setNuevoInsumo({
                              ...nuevoInsumo,
                              metrosTotales: value,
                            })
                          )
                        }
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="0.0"
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">m</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Precio total
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">$</span>
                      </div>
                      <input
                        type="text"
                        value={nuevoInsumo.precio}
                        onChange={(e) =>
                          handleNumericInputChange(e, (value) =>
                            setNuevoInsumo({ ...nuevoInsumo, precio: value })
                          )
                        }
                        className="block w-full pl-7 pr-12 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Metros por prenda
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <input
                        type="text"
                        value={nuevoInsumo.metrosPorPrenda || ""}
                        onChange={(e) =>
                          handleNumericInputChange(e, (value) =>
                            setNuevoInsumo({
                              ...nuevoInsumo,
                              metrosPorPrenda: value,
                            })
                          )
                        }
                        className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                        placeholder="0.0"
                      />
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">m</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-4">
                <button
                  onClick={agregarInsumo}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <FaPlus className="mr-2" />
                  Agregar Insumo
                </button>
              </div>
            </div>
          </div>

          {/* Sección de Margen de Ganancia */}
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <FaPercentage className="mr-2 text-blue-500" />
              Margen de Ganancia
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Porcentaje de ganancia
                </label>
                <div className="relative rounded-md shadow-sm">
                  <input
                    type="text"
                    value={margenGanancia}
                    onChange={(e) =>
                      handleNumericInputChange(e, setMargenGanancia, false)
                    }
                    className="block w-full pl-3 pr-12 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="30"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm">%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Botón de cálculo y resultados */}
          <div className="px-6 py-4 bg-gray-50">
            <button
              onClick={calcularCostos}
              disabled={!prendasTotales || parseInt(prendasTotales) <= 0}
              className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white ${!prendasTotales || parseInt(prendasTotales) <= 0 ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
            >
              <FaCalculator className="mr-2" />
              Calcular Costos
            </button>

            {resultados && (
              <div className="mt-6 space-y-4">
                <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                  <h4 className="text-lg font-medium text-gray-900 mb-3">
                    Resumen de Costos
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-sm font-medium text-blue-800">
                        Costo total de producción
                      </p>
                      <p className="text-2xl font-bold text-blue-600">
                        ${resultados.costoTotal.toFixed(2)}
                      </p>
                    </div>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-sm font-medium text-green-800">
                        Costo unitario
                      </p>
                      <p className="text-2xl font-bold text-green-600">
                        ${resultados.costoUnitario.toFixed(2)}
                      </p>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-lg">
                      <p className="text-sm font-medium text-purple-800">
                        Total de prendas
                      </p>
                      <p className="text-2xl font-bold text-purple-600">
                        {prendasTotales}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow border border-gray-200">
                  <h4 className="text-lg font-medium text-gray-900 mb-3">
                    Precio de Venta (Margen sobre Precio de Venta)
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-yellow-50 p-3 rounded-lg">
                      <p className="text-sm font-medium text-yellow-800">
                        Margen de ganancia aplicado
                      </p>
                      <p className="text-xl font-bold text-yellow-600">
                        {margenGanancia}%
                      </p>
                    </div>
                    <div className="bg-indigo-50 p-3 rounded-lg">
                      <p className="text-sm font-medium text-indigo-800">
                        Precio de venta sugerido
                      </p>
                      <p className="text-2xl font-bold text-indigo-600">
                        ${resultados.precioVenta.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CalculadoraCostosProduccion;

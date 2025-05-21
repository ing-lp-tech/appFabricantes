import HeroSection from "@/components/sections/HeroSection";
import TiposEstampado from "@/components/sections/TiposEstampado";
/* import Personalizar from "@/components/sections/Personalizar";
 */
import CalculadoraCostos from "@/components/sections/CalculadoraCostos";
import AboutMe from "@/components/sections/AboutMe";

export default function Home() {
  return (
    <>
      <CalculadoraCostos />
      <HeroSection />
      <TiposEstampado />
      {/* <Personalizar /> */}

      <AboutMe />
    </>
  );
}

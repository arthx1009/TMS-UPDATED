import { useEffect, useState } from "react";
import Lenis from "@studio-freight/lenis";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Loader from "./components/Loader";
import AmbientBg from "./components/AmbientBg";
import NeuralPath from "./components/NeuralPath";
import TrustBar from "./components/TrustBar";
import About from "./components/About";
import Services from "./components/Services";
import Industries from "./components/Industries";
import TechStack from "./components/TechStack";
import Research from "./components/Research";
import Projects from "./components/Projects";
import WhyChoose from "./components/WhyChoose";
import Process from "./components/Process";
import Leadership from "./components/Leadership";
import Testimonials from "./components/Testimonials";
import { Blog, FAQ } from "./components/BlogFAQ";
import { Contact, Footer } from "./components/ContactFooter";

export default function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.1, easing: (t) => 1 - Math.pow(1 - t, 3) });
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <>
      <Loader onDone={() => setLoaded(true)} />
      <AmbientBg />
      <NeuralPath />
      <Nav />
      <main className={loaded ? "opacity-100" : "opacity-0"} style={{ transition: "opacity 0.6s ease" }}>
        <Hero />
        <TrustBar />
        <About />
        <Services />
        <Industries />
        <TechStack />
        <Research />
        <Projects />
        <WhyChoose />
        <Process />
        <Leadership />
        <Testimonials />
        <Blog />
        <FAQ />
        <Contact />
        <Footer />
      </main>
    </>
  );
}

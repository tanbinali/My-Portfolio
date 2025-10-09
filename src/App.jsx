import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TechStack from "./components/TechStack";
import Expertise from "./components/Expertise";
import Background from "./components/Background";
import Education from "./components/Education";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Background />
      <Navbar />
      <Hero />
      <TechStack />
      <section id="expertise" className="scroll-mt-28">
        <Expertise />
      </section>
      <Education />
      <Footer />
    </>
  );
}

export default App;

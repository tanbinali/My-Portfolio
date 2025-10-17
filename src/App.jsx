import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Expertise from "./components/Expertise";
import Background from "./components/Background";
import Education from "./components/Education";
import Footer from "./components/Footer";
import Contacts from "./components/Contacts";
import Projects from "./components/Projects";

function App() {
  return (
    <>
      <Background />
      <Navbar />

      <section
        id="about"
        className="scroll-mt-16 pt-4 pb-16 px-6 md:px-16 lg:px-24"
      >
        <Hero />
      </section>

      <section
        id="expertise"
        className="scroll-mt-16 pt-4 pb-16 px-6 md:px-16 lg:px-24"
      >
        <Expertise />
      </section>

      <section
        id="projects"
        className="scroll-mt-16 pt-4 pb-16 px-6 md:px-16 lg:px-24"
      >
        <Projects />
      </section>

      <section
        id="education"
        className="scroll-mt-16 pt-4 pb-16 px-6 md:px-16 lg:px-24"
      >
        <Education />
      </section>

      <section
        id="contact"
        className="scroll-mt-16 pt-4 pb-16 px-6 md:px-16 lg:px-24"
      >
        <Contacts />
      </section>

      <Footer />
    </>
  );
}

export default App;

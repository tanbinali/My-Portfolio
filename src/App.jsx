import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Expertise from "./components/Expertise";
import Background from "./components/Background";
import Education from "./components/Education";
import Footer from "./components/Footer";
import Contacts from "./components/Contacts";
import Projects from "./components/Projects";
import LoadingScreen from "./components/LoadingScreen";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isLoading]);

  return (
    <div className="relative min-h-screen">
      {/* Background stays outside for a seamless look */}
      <Background />

      {/* Loading Screen Overlay */}
      {isLoading && (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      )}

      {/* Main Portfolio Content - Rendered or keyed after loading finishes */}
      {!isLoading && (
        <div className="opacity-100 transition-opacity duration-700">
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
        </div>
      )}
    </div>
  );
}

export default App;
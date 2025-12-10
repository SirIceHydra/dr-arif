import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import About from "./components/about";
import CallToAction from "./components/call-to-action";
import Footer from "./components/footer";
import Header from "./components/header";
import LatestEventsShow from "./components/latest-events";
import NavigationBar from "./components/navigation-bar";
import QualificationAwards from "./components/qualification-awards";
import SuccessStory from "./components/success-story";
import Testimonial from "./components/testimonial";
import WorkHistory from "./components/work-history";
import Gallery from "./components/gallery";
import ThreeBackground from "./components/three-background";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  useEffect(() => {
    // Smooth scroll behavior enhancement
    ScrollTrigger.defaults({
      toggleActions: "play none none reverse"
    });

    // Refresh ScrollTrigger on window resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <ThreeBackground />
      <div style={{ position: "relative", zIndex: 1, overflowX: "hidden", width: "100%", maxWidth: "100vw" }}>
        <NavigationBar />
        <Header />
        <About />
        <QualificationAwards />
        <WorkHistory />
        <Gallery />
        <SuccessStory />
        <Testimonial />
        <LatestEventsShow />
        <CallToAction />
        <Footer />
      </div>
    </>
  );
};

export default App;

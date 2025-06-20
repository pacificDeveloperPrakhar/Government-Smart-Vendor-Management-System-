import {
  ContactSection,
  FeaturesSection,
  HeroSection,
  AboutSection,
  Registration,
} from "../../components/index.js";
import Carousel  from "../../components/Carousel/Carousel.jsx";"../../components/Carousel/Carousel.jsx"
function Home() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-50 to-white">
      <HeroSection />
      <FeaturesSection />
      <AboutSection />
      <Registration />
      <ContactSection />
    </div>
  );
}

export default Home;

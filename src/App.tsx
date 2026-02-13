import './App.css';
import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import Soluciones from './sections/Soluciones';
import Services from './sections/Services';
import Gallery from './sections/Gallery';
import Brands from './sections/Brands';
import HomeService from './sections/HomeService';
import WhyUs from './sections/WhyUs';
import Contact from './sections/Contact';
import Tapizado from './sections/Tapizado';
import Footer from './sections/Footer';
import AIChat from './sections/AIChat';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <Soluciones />
        <Services />
        <Gallery />
        <Brands />
        <HomeService />
        <WhyUs />
        <Contact />
        <Tapizado />
      </main>
      <Footer />
      <AIChat />
    </div>
  );
}

export default App;

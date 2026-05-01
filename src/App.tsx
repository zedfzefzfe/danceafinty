import { siteConfig } from './config';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import WelcomeSection from './sections/WelcomeSection';
import ArtistsMarquee from './components/ArtistsMarquee';
import BootcampsSection from './components/BootcampsSection';
import ArtistsSection from './sections/ArtistsSection';
import Newsletter from './sections/Newsletter';
import FinalCTASection from './components/FinalCTASection';
import Footer from './sections/Footer';

function App() {

  return (
    <div className="bg-[#1a0033] text-white min-h-screen" lang={siteConfig.language}>
      <Navigation />
      <main className="relative">
        <Hero />
        <WelcomeSection />
        <ArtistsMarquee />
        <BootcampsSection />
        <ArtistsSection />
        <FinalCTASection imageSrc="/images/60.png" />
        <Newsletter />

      </main>
      <Footer />
    </div>
  );
}

export default App;

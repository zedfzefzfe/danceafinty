import { siteConfig } from './config';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import WhyDanceAffinitySection from './sections/WhyDanceAffinitySection';
import ExperienceSection from './sections/ExperienceSection';
import ArtistsMarquee from './components/ArtistsMarquee';
import PremiumBootcampsSection from './sections/PremiumBootcampsSection';
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
        <WhyDanceAffinitySection />
        <ExperienceSection />
        <ArtistsMarquee />
        <PremiumBootcampsSection />
        <ArtistsSection />
        <FinalCTASection imageSrc="/images/60.png" />
        <Newsletter />

      </main>
      <Footer />
    </div>
  );
}

export default App;

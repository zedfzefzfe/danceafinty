import { siteConfig } from './config';
import { useScrollTriggerRefresh } from './hooks/use-scrolltrigger-refresh';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import WhyDanceAffinitySection from './sections/WhyDanceAffinitySection';
import ExperienceSection from './sections/ExperienceSection';
import ArtistsMarquee from './components/ArtistsMarquee';
import PremiumBootcampsSection from './sections/PremiumBootcampsSection';
import InTheMomentSection from './sections/InTheMomentSection';
import FestivalExperienceSection from './sections/FestivalExperienceSection';
import PracticalInfoSection from './sections/PracticalInfoSection';
import WeezeventSection from './sections/WeezeventSection';
import Newsletter from './sections/Newsletter';
import FinalCTASection from './components/FinalCTASection';
import Footer from './sections/Footer';

function App() {
  // Keeps every section's scroll trigger measured against the real layout
  useScrollTriggerRefresh();

  return (
    <div className="bg-[#1a0033] text-white min-h-screen" lang={siteConfig.language}>
      <Navigation />
      <main className="relative">
        <Hero />
        <WhyDanceAffinitySection />
        <ExperienceSection />
        <InTheMomentSection />
        <ArtistsMarquee />
        <PremiumBootcampsSection />
        <FestivalExperienceSection />
        <WeezeventSection />
        <PracticalInfoSection />
        <FinalCTASection imageSrc="/images/60.png" />
        <Newsletter />

      </main>
      <Footer />
    </div>
  );
}

export default App;

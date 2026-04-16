import { siteConfig } from './config';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import Newsletter from './sections/Newsletter';
import Footer from './sections/Footer';

function App() {

  return (
    <div className="bg-[#1a0033] text-white min-h-screen" lang={siteConfig.language}>
      <Navigation />
      <main className="relative">
        <Hero />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}

export default App;

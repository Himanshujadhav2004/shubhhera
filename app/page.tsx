import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Gallery from "@/components/Gallery";
import OurWork from "@/components/OurWork";
import Team from "@/components/Team";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      {/* Work first, then the people behind it, then the studio's own story —
          the portfolio does the selling before the prose gets a turn. */}
      <main className="flex-1">
        <Hero />
        <Gallery />
        <OurWork />
        <Team />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

import React from "react";
import Nav from "./Sections/Nav";
import Hero from "./Sections/Hero";
import WhyChooseUs from "./Sections/WhyUs";
import PricingSlider from "./Sections/Pricing";
import Faq from "./Sections/Faq";
import Footer from "./Sections/Footer";

function Landing() {
  return (
    <div>
      <Nav />
      <Hero />
      <WhyChooseUs />
      <PricingSlider />
      <Faq />
      <Footer />
    </div>
  );
}

export default Landing;

import React, { useEffect } from "react";
import "./home.scss";
//components
import Slider from "../../components/slider/Slider";
import Notice from "../../components/notice/Notice";
import AppBenefits from "../../components/appbenefits/AppBenefits";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <Slider />
      <Notice />
      <AppBenefits />
      <Footer />
    </>
  );
};

export default Home;

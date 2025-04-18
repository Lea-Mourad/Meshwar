import React, { useState, useEffect } from "react";
import Header from "../components/header";
import {
  FaRegStar,
  FaMapMarkerAlt,
  FaUser,
  FaQuestionCircle,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

// Reusable component for FAQ items
const FaqItem = ({ faq, isExpanded, onToggle }) => (
  <div className="flex flex-col">
    <div
      className="flex items-center text-lg font-semibold text-[#984949] cursor-pointer"
      onClick={onToggle}
    >
      <FaQuestionCircle className="text-2xl mr-3" />
      <h3>{faq.question}</h3>
    </div>
    <AnimatePresence>
      {isExpanded && (
        <motion.p
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="text-gray-800 mt-2"
        >
          {faq.answer}
        </motion.p>
      )}
    </AnimatePresence>
  </div>
);

const AboutUs = () => {
  const faqs = [
    {
      question: "Do I need an account to use Meshwar?",
      answer:
        "No, you do not need an account. However, it is recommended to sign up for an account to save favorite places and receive personalized recommendations.",
    },
    {
      question: "How do I save places on Meshwar?",
      answer:
        "Sign in to your account, go to 'Where To Go', choose a category, and click the heart icon (Favorites).",
    },
    {
      question: "Are the recommendations really personalized?",
      answer:
        "Yes! Meshwar uses your preferences and interests to tailor relevant recommendations.",
    },
  ];

  const [expandedFaq, setExpandedFaq] = useState(null);

  const toggleFaq = (index) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-gradient-to-br from-[#f0f0f0] to-[#e0e0e0]"
      style={{
        backgroundImage:
          "url('https://lp-cms-production.imgix.net/2023-03/shutterstockRF_756972694.jpg')",
      }}
    >
      <header className="absolute top-0 w-full py-4 bg-[#984949] text-white text-center z-20 mt-20">
        <h1 className="text-4xl font-bold">About Us</h1>
      </header>

      <Header />

      <div className="flex flex-col min-h-screen z-10 pt-40 px-6 md:px-16">
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          id="what-is-meshwar"
          className="w-full p-8 bg-white bg-opacity-90 shadow-lg rounded-xl mb-8 transition-opacity duration-300"
        >
          <h2 className="text-3xl font-bold text-[#984949] mb-4">
            What is Meshwar?
          </h2>
          <p className="text-lg text-gray-800">
            Meshwar is a revolutionary tourism platform designed to provide you
            with a unique travel experience. Whether you are looking for hidden
            gems or popular attractions, Meshwar has got you covered with
            personalized recommendations tailored just for you. We focus on
            creating experiences that go beyond the typical tourist attractions
            to provide travelers with memorable and authentic journeys.
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          id="why-meshwar"
          className="w-full p-8 bg-white bg-opacity-90 shadow-lg rounded-xl mb-8 transition-opacity duration-300"
        >
          <h2 className="text-3xl font-bold text-[#984949] mb-4">
            Why Meshwar?
          </h2>
          <div className="flex flex-wrap space-x-6 mb-6">
            <div className="flex items-center mb-4 md:mb-0">
              <FaMapMarkerAlt className="text-3xl text-[#984949] mr-4" />
              <p className="text-lg text-gray-800">
                Meshwar is your guide to Lebanon's most beautiful and hidden
                destinations.
              </p>
            </div>
            <div className="flex items-center mb-4 md:mb-0">
              <FaRegStar className="text-3xl text-[#984949] mr-4" />
              <p className="text-lg text-gray-800">
                We offer personalized recommendations tailored to your interests
                and preferences.
              </p>
            </div>
            <div className="flex items-center">
              <FaUser className="text-3xl text-[#984949] mr-4" />
              <p className="text-lg text-gray-800">
                Our platform is designed for a seamless, user-friendly
                experience.
              </p>
            </div>
          </div>
          <p className="text-lg text-gray-800">
            Meshwar stands out because we offer more than just a list of sights;
            we give you a tailored journey that suits your interests and
            preferences, helping you to discover Lebanon in an unforgettable
            way.
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          id="faq"
          className="w-full p-8 bg-white bg-opacity-90 shadow-lg rounded-xl mb-8 transition-opacity duration-300"
        >
          <h2 className="text-3xl font-bold text-[#984949] mb-4">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <FaqItem
                key={index}
                faq={faq}
                isExpanded={expandedFaq === index}
                onToggle={() => toggleFaq(index)}
              />
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          id="who-are-we"
          className="w-full p-8 bg-white bg-opacity-90 shadow-lg rounded-xl mb-8 transition-opacity duration-300"
        >
          <h2 className="text-3xl font-bold text-[#984949] mb-4">
            Who Are We?
          </h2>
          <p className="text-lg text-gray-800">
            This is a project done for our CMPS 271 class supervised by our
            professor Dr. Moustafa Nourredine. We are a passionate team of
            students who are committed to bringing the best of Lebanon’s
            culture and heritage to the world. Our team has crafted Meshwar
            with a deep appreciation for the beauty of Lebanon and the world.
            With a focus on providing user-centric experiences and innovative
            solutions, we are dedicated to making every journey unforgettable.
            Our goal is to help travelers not only visit Lebanon, but to truly
            experience its rich history, culture, and natural beauty.
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          id="developers"
          className="w-full p-8 bg-white bg-opacity-90 shadow-lg rounded-xl mb-8 transition-opacity duration-300"
        >
          <h2 className="text-3xl font-bold text-[#984949] mb-4">Developers</h2>
          <p className="text-lg text-gray-800">
            Meshwar was developed by Lea Mourad, Lynn Hammoud, Hala Daher, Nadjib Tebbal,
            Ahmad Machmouchi. We are proud to share our love for
            Lebanese culture and tourism through this platform.
          </p>
        </motion.section>
      </div>

      <footer className="py-4 bg-[#984949] text-white text-center">
        <p className="text-sm">© 2025 Meshwar. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default AboutUs;

import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import { motion } from "framer-motion";
import Navbar from "./navbar";
import BookGrid from "./bookgrid";
import AboutUsPage from "./AboutUsPage";
import Dashboard from "./Dashboard";
import './App.css';
import Contents from "./contents";

function App() {
  const [currentSection, setCurrentSection] = useState("home");
  const linksData = [
    {
      title: "NPTEL",
      description: "3000+ unique courses available for self study. Explore now. 2.5 crore+ enrollments. 35.5 lakhs+ exam registrations. Explore now. 6500+ LC colleges.",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8VRmuwZhG40QDxM_IF9klXkzNA96GmX1z2Q&s",
      linkUrl: "https://nptel.ac.in/"
    },
    {
      title: "Swayam",
      description: "Find Free courses from the Best Universities. Self-Paced Learning. Learn at your own pace, Anytime, Anywhere. Earn Certifications.",
      imageUrl: "https://play-lh.googleusercontent.com/CXXHTtxA0eiMsMZPqBY9RLr8Cna2erTPAr27aegOYz7T6Ivv5ha9Q649NrGItiDO8w",
      linkUrl: "https://swayam.gov.in/"
    },
    {
      title: "N-List",
      description: "N-List stands for “National Library and Information Services Infrastructure for Scholarly Content”.",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuNOcuYvbztyXgR4ueQa8HvObHdv6LiZCJvw&s",
      linkUrl: "https://nlist.inflibnet.ac.in/"
    },
    {
      title: "NDLI",
      description: "National Digital Library of India (NDLI) is a virtual repository of learning resources which is not just a repository with search/browse facilities",
      imageUrl: "https://images.squarespace-cdn.com/content/v1/61b70faf45fdc445063b5443/994670b8-3627-45d8-b17f-cac9d5e16aa1/unnamed-min.png",
      linkUrl: "https://ndl.iitkgp.ac.in/"
    },
    {
      title: "Syllabus",
      description: "PRSU Syllabus for every stream.a",
      imageUrl: "https://sjcetpalai.ac.in/wp-content/uploads/2018/03/syllabus-300x250.png",
      linkUrl: "https://example.com/link5"
    },
    {
      title: "Link 6",
      description: "Description for Link 6. Learn more about Link 6 here.",
      imageUrl: "https://via.placeholder.com/400x200?text=Link+6",
      linkUrl: "https://example.com/link6"
    }
  ];

  return (
    <div className="App">
      <Navbar setCurrentSection={setCurrentSection} />

      <CSSTransition
        in={currentSection === "home"}
        timeout={500}
        classNames="slide"
        unmountOnExit
      >
        <>
        <section1
  className="relative h-[75vh] bg-cover bg-center flex justify-center items-center transition-opacity duration-500"
  style={{ backgroundSize: "400% 400%", animation: "gradient 10s ease infinite" }}
>
  <motion.h1
    className="text-9xl text-white font-bold line-1 anim-typewriter "
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    Welcome to Digi-Library
  </motion.h1>
</section1>




          <section className="py-16 bg-gray-100 transition-opacity duration-500">
            <h2 className="text-4xl font-bold text-center mb-12">Our Links</h2>
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
              {linksData.map((item, index) => (
                <div
                  key={index}
                  className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-24 h-24 mx-auto object-contain"
                  />
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-700 mb-4">
                      {item.description}
                    </p>
                    <a
                      href={item.linkUrl}
                      className="text-blue-500 hover:text-blue-700 transition duration-300"
                      target="_blank" /* Open the link in a new tab */
                      rel="noopener noreferrer"
                    >
                      Read More
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="py-16 bg-gray-900 text-white">
  <h2 className="text-4xl font-bold text-center mb-12">Meet Our Developers</h2>
  <div className="container mx-auto px-4 flex flex-wrap justify-center gap-8">
    {[
      { name: "Harsh", img: "/harsh.png" },
      { name: "Priyansh", img: "/priyansh.png" }
    ].map((developer, index) => (
      <div
        key={index}
        className="bg-gray-800 shadow-lg rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105 w-full sm:w-64"
      >
        <img
          src={developer.img}
          alt={developer.name}
          className="w-full h-64 object-cover"
        />
        <div className="p-6 text-center">
          <h3 className="text-2xl font-bold mb-2">{developer.name}</h3>
          <p className="text-gray-400 mb-4">Frontend & Backend Developer</p>
          <a
            href="#"
            className="text-blue-500 hover:text-blue-700 transition duration-300"
          >
            View Profile
          </a>
        </div>
      </div>
    ))}
  </div>
</section>

        </>
      </CSSTransition>

      <CSSTransition
        in={currentSection === "books"}
        timeout={500}
        classNames="slide"
        unmountOnExit
      >
        <section className="py-16 bg-white">
          <h2 className="text-4xl font-bold text-center mb-12">Explore Our Books</h2>
          <div className="container mx-auto px-4">
            <BookGrid />
          </div>
        </section>
      </CSSTransition>

      <CSSTransition
        in={currentSection === "notes"}
        timeout={500}
        classNames="slide"
        unmountOnExit
      >
        <div className="container mx-auto px-4">
          <Contents />
        </div>
      </CSSTransition>
      <CSSTransition
        in={currentSection === "about"}
        timeout={500}
        classNames="slide"
        unmountOnExit
      >
        <div className="container mx-auto px-4">
          <AboutUsPage />
        </div>
      </CSSTransition>
      <CSSTransition
        in={currentSection === "dashboard"}
        timeout={500}
        classNames="slide"
        unmountOnExit
      >
        <div className="container mx-auto px-4">
          <Dashboard />
        </div>
      </CSSTransition>
      
      <footer className="py-8 bg-gray-800 text-white text-center">
        <p>&copy; 2024 Digital-library (web-app). All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default App;

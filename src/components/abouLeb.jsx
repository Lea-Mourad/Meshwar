import React, { useState } from "react";

const ExploreLebanon = () => {
  const [activeSection, setActiveSection] = useState("funfacts");
  const [currentSlide, setCurrentSlide] = useState(0);

  const content = {
    funfacts: [
      {
        image: "https://www.hadatheljebbeh.com/wp-beta/wp-content/uploads/2014/12/cedars-haddath-1050x700.jpg",
        text: "The Lebanese cedar tree is a national symbol.",
      },
      {
        image: "https://static1.thetravelimages.com/wordpress/wp-content/uploads/2022/09/Byblos-Lebanon.jpg",
        text: "Lebanon has 5 UNESCO World Heritage Sites. Four of these sites are the ancient cities of Anjar, Baalbek, Byblos, and Tyre.",
      },
      {
        image: "https://www.lbcgroup.tv/uploadImages/DocumentImages/Doc-P-750721-638421208831659880.jpg",
        text: "You can ski and swim on the same day.",
      },
      {
        image: "https://mylebanonguide.com/wp-content/uploads/2022/08/IMG_20220801_142318_782.jpg",
        text: "Lebanon is the only Arab country that doesn't have a desert.",
      },
      {
        image: "https://media.istockphoto.com/id/1165461954/photo/relaxing-at-beirut-souks.jpg?s=612x612&w=0&k=20&c=xBbhLoaVDgZgBey501qtLkuOs-b95xrVYdslWoEWdAs=",
        text: "Lebanese people speak Arabic, English, and sometimes French.",
      },
    ],
    history: {
      title: "History",
      text: "Lebanon’s history spans thousands of years, making it one of the most historically rich destinations in the world. As the homeland of the ancient Phoenicians, Lebanon played a crucial role in the development of the first alphabet. The country has been shaped by Roman, Byzantine, Ottoman, and French influences, each leaving behind remarkable landmarks such as the colossal Roman temples of Baalbek, the ancient city of Byblos—one of the world’s oldest continuously inhabited cities—and the majestic ruins of Anjar.",
      image: "https://upload.wikimedia.org/wikipedia/commons/c/c9/Temple_of_Bacchus%2C_Baalbek%2C_Lebanon_%2849890013476%29.jpg",
    },
    cuisine: {
      title: "Lebanese Cuisine",
      text: "Famous dishes like hummus, tabbouleh, and kibbeh make Lebanese food beloved worldwide.",
     
    },
    culture: {
      title: "Culture and Traditions",
      text: "Lebanese culture blends ancient traditions with modern influences, from music to fashion.",
    
    },
    traveltips: {
      title: "Travel Tips",
      text: "Discover the best places to visit, eat, and stay in Lebanon.",
    
    },
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % content.funfacts.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? content.funfacts.length - 1 : prev - 1));
  };

  return (
    <div className="flex flex-col items-center justify-center py-20 bg-white relative">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: `url(https://i0.wp.com/tayaramuse.com/wp-content/uploads/2020/10/Beirut_Lebanon-70.jpg?resize=1300%2C650&ssl=1)` }}></div>

      <h2 className="text-4xl font-abel font-extrabold mb-6 text-[#984949] relative z-10">
        More About Lebanon
      </h2>

      {/* Tabs */}
      <div className="flex space-x-8 bg-[#F3F4F6] p-3 rounded-full mb-10 w-[80%] justify-center relative z-10">
        {["funfacts", "history", "cuisine", "culture", "traveltips"].map((section) => (
          <button
            key={section}
            onClick={() => setActiveSection(section)}
            className={`px-6 py-2 rounded-lg transition duration-300 ${
              activeSection === section
                ? "bg-gray-200 text-[#984949] font-bold"
                : "bg-[#F3F4F6] text-[#984949]"
            } hover:bg-[#7c3b3b] hover:text-white`}
          >
            {section === "funfacts" ? "Fun Facts" : content[section].title}
          </button>
        ))}
      </div>

      {/* Fun Facts Section */}
      {activeSection === "funfacts" ? (
        <div className="relative max-w-2xl mx-auto z-10">
          <div className="relative flex items-center justify-center">
            <button
              onClick={prevSlide}
              className="absolute left-[-50px] top-1/2 transform -translate-y-1/2 bg-[#984949] text-white p-3 rounded-full hover:bg-[#7c3b3b]"
            >
              ◀
            </button>
            <img
              src={content.funfacts[currentSlide].image}
              alt="Fun Fact"
              className="w-full h-72 object-cover rounded-lg shadow-lg"
            />
            <button
              onClick={nextSlide}
              className="absolute right-[-50px] top-1/2 transform -translate-y-1/2 bg-[#984949] text-white p-3 rounded-full hover:bg-[#7c3b3b]"
            >
              ▶
            </button>
          </div>
          <p className="mt-4 ont-abel font-extrabold text-center">
            {content.funfacts[currentSlide].text}
          </p>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto relative flex flex-col lg:flex-row items-center lg:items-start p-6 bg-white rounded-lg shadow-lg z-10">
          {/* Left Image */}
          <div className="lg:w-2/3 w-full">
            <img
              src={content[activeSection].image}
              alt={content[activeSection].title}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
          {/* Text Section */}
          <div className="lg:w-1/3 w-full lg:pl-6 text-center lg:text-left mt-6 lg:mt-0">
            <h3 className="text-3xl font-semibold text-[#984949]">{content[activeSection].title}</h3>
            <p className="mt-4 text-lg text-gray-700">{content[activeSection].text}</p>
          </div>
          {/* Right Image for History */}
          {activeSection === "history" && (
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-[30%] hidden lg:block">
             
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ExploreLebanon;

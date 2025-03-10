import React, { useState } from "react";
import TravelTips from "./Traveltips";

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
      text: "Lebanon's history spans thousands of years and is rich in ancient influences. As the homeland of the Phoenicians, it contributed to the development of the first alphabet. The country has been shaped by Roman, Byzantine, Ottoman, and French legacies, seen in landmarks like the Roman temples of Baalbek, the ancient city of Byblos, and the ruins of Anjar.",
      image: "https://upload.wikimedia.org/wikipedia/commons/c/c9/Temple_of_Bacchus%2C_Baalbek%2C_Lebanon_%2849890013476%29.jpg",
    },
    cuisine: {
      title: "Lebanese Cuisine",
      text: "Lebanese cuisine is a tasty mix of fresh ingredients and bold flavors! From the famous man’ousheh to refreshing tabbouleh and creamy hummus, each dish is a delight. Kibbeh, a savory blend of meat, bulgur, and spices, is a crowd favorite—whether fried or raw! It's all about balance—spices, herbs, and warm hospitality in every bite. A true taste of Lebanon’s food culture!",
      image: "https://media.istockphoto.com/id/1271870386/photo/arabic-traditional-cuisine-middle-eastern-meze-with-pita-olives-colorful-hummus-falafel.webp?a=1&b=1&s=612x612&w=0&k=20&c=tVtQp8Rrx0IoHc_NG5KuWUDbno4QQFxrH7uhPPgsLec=",
    },
    culture: {
      title: "Culture and Traditions",
      text: "Lebanese culture is shaped by its rich traditions, diverse religions, and strong sense of hospitality. The dabke dance embodies the community spirit, while family and tradition remain at the heart of daily life. In Lebanon, guests are welcomed with open arms, where sharing food and offering small gifts are simple yet meaningful gestures that show respect and appreciation. So Don’t hesitate to interact with the locals or ask for guidance — they’re always happy to help and share their culture.",
      image:"https://kaleela.com/Content/BlogImages/small/lebanese-clothing-why-its-a-reflection-of-lebanese-traditions.png"
    },
    traveltips: {
      title: "Travel Tips",
      text: (
        <>
          <p>Planning a trip to Lebanon? Familiarize yourself with the currency situation. The exchange rate fluctuates a lot, originally 1500 pounds to the dollar, now around 88,000. Keep a converter app on hand for the latest rates. Having both dollars and Lebanese pounds is recommended.Some phrases to know: </p>
          <ul className="list-disc ml-6 mt-4">
            <li>Marhaba: Hi</li>
            <li>Kifak: How are you?</li>
            <li>Sahtain: Enjoy your meal</li>
          </ul>
        </>
      ),
      image: "https://media.istockphoto.com/id/1326101931/photo/lebanese-lira-currency-with-100-usd.jpg?s=612x612&w=0&k=20&c=FO-qnsro4mY7ya-5QW3mpX8f_JqCmVmApEbNYxh9Xxg=",
    },
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % content.funfacts.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? content.funfacts.length - 1 : prev - 1));
  };

  return (
    <div className="flex flex-col items-center justify-center py-20 bg-white relative pb-20">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-center opacity-30 z-6" style={{ backgroundImage: `url(https://i0.wp.com/tayaramuse.com/wp-content/uploads/2020/10/Beirut_Lebanon-70.jpg?resize=1300%2C650&ssl=1)` }}></div>
    
      <h2 className="text-4xl font-abel font-extrabold mb-6 text-[#984949] relative z-5">
        More About Lebanon
      </h2>
    
      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-4 mb-20 w-full relative z-5 ">
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
    
      {/* Content Sections */}
      
      {activeSection === "funfacts" ? (
        <div className="relative max-w-2xl mx-auto z-5">
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
          <p className="mt-4 font-abel font-extrabold text-center">
            {content.funfacts[currentSlide].text}
          </p>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto relative flex flex-col lg:flex-row items-center lg:items-start p-6 bg-white rounded-lg shadow-lg z-5">
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
        </div>
      )}
    </div>
  );
};

export default ExploreLebanon;

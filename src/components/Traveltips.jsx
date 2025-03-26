import { motion } from "framer-motion";

const TravelTips = () => {
  return (
    <div className="flex flex-col items-center p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Travel Tips</h2>

      <div className="flex gap-6">
        {/* First Image - Coming from the Left */}
        <motion.div
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative"
        >
          <img src="https://i.pinimg.com/736x/51/0b/67/510b67fdf55e0b1c53cfdce5214a7d2a.jpg" alt="Beautiful spot" className="w-64 h-40 rounded-lg shadow-lg" />
          <p className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-80 text-sm p-1 rounded">
          **Currency Exchange:** Exchange money at official offices for better rates. Cash is preferred in small shops & taxis.
          </p>
        </motion.div>

        {/* Second Image - Coming from the Left */}
        <motion.div
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
          className="relative"
        >
          <img src="/images/travel2.jpg" alt="Food in Lebanon" className="w-64 h-40 rounded-lg shadow-lg" />
          <p className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-80 text-sm p-1 rounded">
          Use Uber/Bolt for safer rides. Shared taxis are cheap but may take multiple passengers.
          </p>
        </motion.div>

        {/* Third Image - Coming from the Right */}
        <motion.div
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
          className="relative"
        >
          <img src="/images/travel3.jpg" alt="Hotels in Lebanon" className="w-64 h-40 rounded-lg shadow-lg" />
          <p className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-80 text-sm p-1 rounded">
          **Traffic & Safety:** Beirut traffic is unpredictable. Plan ahead & consider hiring a private driver for long trips.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default TravelTips;

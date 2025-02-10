import React from "react";
import SignUpBox from "../components/signUpBox";

const Signup = () => {

  return (
<div className="relative w-screen h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/background.jpg')" }}>
  {/* White Overlay */}
  <div className="absolute inset-0 bg-white bg-opacity-50 z-10"></div>

  {/* Centered SignInBox */}
  <div className="relative z-20 flex items-center justify-center h-full">
    <SignUpBox/>
  </div>
</div>
 );
};

export default  Signup;
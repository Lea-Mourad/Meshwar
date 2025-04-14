import React from "react";
import SignUpBox from "../components/signUpBox";
import Footer from "../components/footer";

const Signup = () => {

  return (
<div className="relative w-screen h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url(https://www.lebanontours.co/uploads/1/0/3/7/10373098/arches-pigeon-rocks-beirut_orig.jpg)" }}>
  {/* White Overlay */}
  <div className="absolute inset-0 bg-white bg-opacity-50 z-10"></div>

  {/* Centered SignInBox */}
  <div className="relative z-20 flex items-center justify-center h-full">
    <SignUpBox/>
    <Footer/>
  </div>
</div>
 );
};

export default  Signup;
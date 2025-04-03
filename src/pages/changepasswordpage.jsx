import React, { useState } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";

function ChangePasswordPage() {
   const { token } = useParams();
   const[newPassword,setNewPassword]=useState("");
   const[confirmPassword,setConfirmPassword]=useState("");
   const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    try {
        await axios.post("http://127.0.0.1:8000/auth/password-reset-confirm/", {
            token,
            new_password: newPassword,
        });

        alert("Password changed successfully!");
        // Optionally redirect user to login
    } catch (error) {
        console.error(error);
        alert(error.response?.data?.message || "Something went wrong");
    }
};


return(
<div className='flex items-center justify-center min-h-screen bg-gray-100'>
<div className='max-w-xl  min-h-[400px] w-full p-8 bg-white rounded-lg shadow-md'>
<h1 className='font-bold mb-4 text-2xl'>Change Password</h1>
<p className='text-gray-600 mb-4'>Create a new password ensure it differs from previous ones for security</p>

<form onSubmit={handleSubmit}>

<h2 className='font-bold mt-3'>New Password</h2>
<input type="password" label="New Password" placeholder='Enter your new password'value ={newPassword} onChange={(e)=>setNewPassword(e.target.value)} 
className="w-full px-4 py-3 border-2 border-[#984949] rounded-lg focus:outline-none focus:border-[#984949] focus:ring-0"/>
<h2 className='font-bold mt-3'>Confirm Password</h2>
<input value={confirmPassword}type="password" label="Confirm Password" placeholder="Confirm New password"  onChange={(e)=>setConfirmPassword(e.target.value)} 
className="w-full px-4 py-3 border-2 border-[#984949] rounded-lg focus:outline-none focus:border-[#984949] focus:ring-0"/>
 <button
  type="submit"
  className="w-full mt-4 p-2 text-white bg-[#984949] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#984949] hover:bg-[#7a3333]"
>
  Change Password
</button>
</form>

</div>
</div>
);

}
export default ChangePasswordPage;


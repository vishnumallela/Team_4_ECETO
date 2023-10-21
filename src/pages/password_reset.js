import React from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useState } from "react";

function password_reset() {
    const[email,setemail]=useState()
  //reset password functionality
  const triggerResetEmail = async () => {
    await sendPasswordResetEmail(auth, email);
    console.log("Password reset email sent");
  };

  return <div>
    password_reset_page
    </div>;
}

export default password_reset;

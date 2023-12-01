import React, {useState, useEffect, useContext} from 'react'
import { auth } from "../../../config/firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import { db } from "../../../config/firebase";
import { getAuth, updateProfile, updateEmail, verifyBeforeUpdateEmail } from "firebase/auth";


export default function UserProfile(){

const[user,loading,error] = useAuthState(auth);
const [curName, setCurName] = useState("");
const [curEmail, setCurEmail] = useState("");

// TODO: SET THE CURRENT NAME, EMAIL, PROFILE PICTURE ON PAGE LOAD to initial values based on the user? Maybe need to do this via useEffect(user) to call a function when user is obtained, dunno tbh been a while for react syntax

const [editing, setEditing] = useState(false);

const setEditingHandler = () => {
  if (editing) {
    // on save, update values
    console.log("DISPLAY NAME", curName);
    console.log("EMAIL", curEmail);

    // Update display name
    updateProfile(user, {
      displayName: curName,
      photoURL: ""
    }).then(() => {
      // Display name updated!
      console.log("Display Name Updated!");

      // Update email
      //getting a verify new email before changing it error, not sure how to go about that
      updateEmail(user, curEmail).then(() => {
        // Email updated!
        console.log("Email Updated!");

        setEditing(false);
        // ...
      }).catch((emailError) => {
        // Handle email update error
        console.log("EMAIL UPDATE ERROR", emailError);
        // ...
      });

    }).catch((profileError) => {
      // Handle display name update error
      console.log("DISPLAY NAME UPDATE ERROR", profileError);
      // ...
    });
  } else {
    setCurName(user.displayName);
    setCurEmail(user.email);
    setEditing(true);
  }
};


const setNameHandler = () => {
  setCurName(document.getElementById("edit_name").value)
}
const setEmailHandler = () => {
  setCurEmail(document.getElementById("edit_email").value)
}
console.log("USER", user)

if (user) {
  if (editing){
    // Edit form section
    return (
      <div>
        {/* USE SIMILAR FRAMEWORK FOR NAME, EMAIL, PROFILE PICTURE. profile picture can be text input or maybe file input, unsure how that works. text input probably easier since we arent 
        storing actual images, just the urls. also simplifies things. then frontend for it in  */}
          <h1>User Profile</h1>
          <h2>Name: </h2><input id="edit_name" type="text" onChange={setNameHandler} value={curName}></input>
          <h2>Email: </h2><input id="edit_email" type="text" onChange={setEmailHandler} value={curEmail}></input>
          {/* <label>Description</label>
          <input type="textarea" name="user_desc" id="user_desc" placeholder="Personalize your profile!"></input> */}
          <button onClick={setEditingHandler}>Save</button>
      </div>
    );
  } else {
    // Displaying details, not editing section.
    // Image frontend here can use the curUrl as value, make sure to limit the size of the image so huge images don't murder the aesthetic
    return (
      <div>
          <h1>User Profile</h1>
          <h2>Name: {user.displayName}</h2>
          <h2>Email: {user.email}</h2>
          {/* <label>Description</label>
          <input type="textarea" name="user_desc" id="user_desc" placeholder="Personalize your profile!"></input> */}
          <button onClick={setEditingHandler}>Edit</button>
      </div>
    );
  }
  

}
else {
  return (
    <div>Loading...</div>
  )
  }
}


export async function getServerSideProps(ctx) {
  return {
    props: {
      data: null,
    },
  };
}
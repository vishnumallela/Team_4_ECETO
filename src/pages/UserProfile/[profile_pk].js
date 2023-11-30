import React, {useState, useEffect, useContext} from 'react'
import { auth } from "../../../config/firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import { db } from "../../../config/firebase";
import { getAuth, updateProfile } from "firebase/auth";


export default function UserProfile(){

const[user,loading,error] = useAuthState(auth);
const [curName, setCurName] = useState("");
const [curEmail, setCurEmail] = useState("");

const [editing, setEditing] = useState(false);

const setEditingHandler = () => {
  if (editing) {
    // on save, update values
    console.log("DISPLAY NAME", curName)
    updateProfile(user, {
      displayName: curName, photoURL: ""
    }).then(() => {
      // Profile updated!
      console.log("Profile Updated!")
      
      setEditing(false)
      // ...
    }).catch((error) => {
      // An error occurred
      console.log("ERROR OCCURED !", error)
      // ...
    });
  } else {
    setCurName(user.displayName)
    setCurEmail(user.email)
    setEditing(true)
  }
}

const setNameHandler = () => {
  setCurName(document.getElementById("edit_name").value)
}
const setEmailHandler = () => {
  setCurEmail(document.getElementById("edit_email").value)
}
console.log("USER", user)

if (user) {
  if (editing){
    return (
      <div>
          <h1>User Profile</h1>
          <h2>Name: </h2><input id="edit_name" type="text" onChange={setNameHandler} value={curName}></input>
          <h2>Email: </h2><input id="edit_email" type="text" onChange={setEmailHandler} value={curEmail}></input>
          {/* <label>Description</label>
          <input type="textarea" name="user_desc" id="user_desc" placeholder="Personalize your profile!"></input> */}
          <button onClick={setEditingHandler}>Save</button>
      </div>
    );
  } else {
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
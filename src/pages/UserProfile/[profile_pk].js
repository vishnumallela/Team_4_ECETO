import React, {useState, useEffect, useContext} from 'react'
import { auth } from "../../../config/firebase";
import { useAuthState } from 'react-firebase-hooks/auth';
import { db } from "../../../config/firebase";
import { getAuth, updateProfile, updateEmail, verifyBeforeUpdateEmail } from "firebase/auth";
import Navbar from '../Navbar';


export default function UserProfile(){

const[user,loading,error] = useAuthState(auth);
const [curName, setCurName] = useState("");
const [curUrl, setCurUrl] = useState("");

// TODO: SET THE CURRENT NAME, EMAIL, PROFILE PICTURE ON PAGE LOAD to initial values based on the user? Maybe need to do this via useEffect(user) to call a function when user is obtained, dunno tbh been a while for react syntax

const [editing, setEditing] = useState(false);

const setEditingHandler = () => {
  if (editing) {
    // on save, update values
    console.log("DISPLAY NAME", curName);
    console.log("DISPLAY URL", curUrl);
    // Update display name
    updateProfile(user, {
      displayName: curName,
      photoURL: curUrl
    }).then(() => {
      // Display name updated!
      console.log("Display Name Updated!");
      setEditing(false);

    }).catch((profileError) => {
      // Handle display name update error
      console.log("DISPLAY NAME UPDATE ERROR", profileError);
    });
  } else {
    setEditing(true);
    setCurUrl(user.photoURL)
    setCurName(user.displayName);
  }
};


const setNameHandler = () => {
  setCurName(document.getElementById("edit_name").value)
}

const setUrlHandler = () => {
  setCurUrl(document.getElementById("edit_url").value)
}

const cancelHandler = () => {
  setEditing(false);
  setCurUrl(user.photoURL)
  setCurName(user.displayName);
}

const profilePicture = {
  borderRadius: "7px",
  width: "65px",
  height: "65px",
  flexSrink: 0

}

const main = {  
  paddingTop: "20px",
  background:" #f9f9f9",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center"

}

const header = { 
  color: "#000",
  fontFamily: "Montserrat",
  fontSize: "40px",
  fontStyle: "normal",
  fontWeight: "700",
  lineHeight: "normal",


}

const label = {
  color: "#000",
  fontFamily: "Montserrat",
  fontSize: "20px",
  fontStyle: "normal",
  fontWeight: "700",
  lineHeight: "normal",
  marginTop: "20px"
  
}

const button = {
  borderRadius: "6px",
  border: "1px solid #000",
  background: "#000",
  color: "#FFF",
  width: "100px",
  height: "40px",
  marginTop: "20px"

}

const cancelButton = {
  borderRadius: "6px",
  border: "1px solid #000",
  background: "#FFF",
  color: "#000",
  width: "100px",
  height: "40px",
  marginTop: "20px",
  marginRight: "4px"
}

const textInput = {
  width: "221px",
  height: "40px",
  top: "335px",
  left: "208px",
  borderRadius: "6px",
  border: "0.5px",
  paddingLeft: "6px",
  borderColor: "black",
  marginTop: "4px",
}


if (user) {
  if (editing){
    // Edit form section
    return (
      <>
      <Navbar />
      <main style={main} background={"#FFF"} >
        <div >
            <h1 style={header}>Edit Profile</h1>
            <h2 style={label}>Profile Picture Url </h2>
            <input style={textInput} id="edit_url" type="text" onChange={setUrlHandler} value={curUrl}></input>
            <h2 style={label}>Full Name</h2>
            <input style={textInput} id="edit_name" type="text" onChange={setNameHandler} value={curName}></input>
            <h2 style={label}>Email </h2>
            <h2>{user.email} </h2>
            <br></br>
            <button style={cancelButton} onClick={cancelHandler}>Cancel</button>
            <button style={button} onClick={setEditingHandler}>Save</button>
        </div>
      </main>
      </>
    );
  } else {
    // Displaying details, not editing section.
    // Image frontend here can use the curUrl as value, make sure to limit the size of the image so huge images don't murder the aesthetic
    return (
      <>
      <Navbar/>
      <main style={main}  background={"#FFF"}  >
        <div style={{margin: "20px"}}>
          <h1 style={header}>My Profile</h1>
          <br />
          {user.photoURL ? <h2 style={label}>Profile Picture </h2> : ""}
          {user.photoURL ? <img src={user.photoURL} alt="Profile Picture" style={profilePicture}/> : <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="Profile Picture" style={profilePicture}/>}
          <h2 style={label}>Full Name</h2>
          <h2> {user.displayName}</h2>
          <h2 style={label}>Email</h2>
          <h2> {user.email}</h2>
          <button style={button} onClick={setEditingHandler}>Edit</button>
        </div>
      </main>
      </>
    );
  }
  

}
else {
  return (
    <>
    <Navbar/>
    <main style={main}>
      <div>Loading...</div>
    </main>
    </>
    
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
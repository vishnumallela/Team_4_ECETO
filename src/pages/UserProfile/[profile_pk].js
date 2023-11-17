import React, {useState, useEffect, useContext} from 'react'
import { auth } from "../../../config/firebase";
import { useAuthState } from 'react-firebase-hooks/auth';

export default function UserProfile(){

const[user,loading,error] = useAuthState(auth);

useEffect(() => function getUser() {
  if (!user) {
    redirect('/Login')
  }
});

return (
    <div>
        <h1>User Profile</h1>
        <h2>Name: {user.displayName}</h2>
        <h2>Email: {user.email}</h2>
        <label for="user_desc">Description</label>
        <input type="textarea" name="user_desc" id="user_desc" placeholder="Personalize your profile!"></input>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  return {
    props: {
      data: null,
    },
  };
}
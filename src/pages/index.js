import Login from "./Login";
import {auth} from '../../config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useSignOut } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";


export default function index() {
  const router = useRouter()
  const[user,loading,error] = useAuthState(auth);
  const [signOut, signOut_loading, signout_error] = useSignOut(auth);
  console.log(useAuthState(auth))
    
  if(!user) return <Login/>
  if(user) {
    router.push(`Dashboard/${user.uid}`)
    console.log(user)
  }

}


import Login from "./Login";
import {auth} from '../../config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useSignOut } from "react-firebase-hooks/auth";


export default function index() {

  const[user,loading,error] = useAuthState(auth);
  const [signOut, signOut_loading, signout_error] = useSignOut(auth);
  
    
      if(!user) return <Login/>
      if(user) return <button onClick={async ()=>{await signOut()}}>Logout</button>
      
      
    

}


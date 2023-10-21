import React from 'react'
import { useState } from "react";
<<<<<<< HEAD
import { auth } from "../../config/firebase";
import toast from "react-hot-toast";
import { createUserWithEmailAndPassword } from "firebase/auth";
=======
import { createUserWithEmailAndPassword } from 'firebase/auth';
import toast,{Toaster} from 'react-hot-toast';
import { auth } from '../../config/firebase';
import { useRouter } from 'next/router'
>>>>>>> b0fdd4b (added logout,register.js and started with navbar)

export default function Signup() {
   const router = useRouter()

  const[email,setemail]=useState();
  const[password,setpassword]=useState();
  const[confirm_pass,set_confirm_pass]=useState();


  const handleRegister = async (e) => {
    console.log("working")
    e.preventDefault();
<<<<<<< HEAD
    if(!email || !password){
      return;
    } 
    if (password.length < 8) {
        toast.error("Password must be at least 6 characters");
        return;
    }
    if (!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/)) {
        toast.error("Password must have a number and one uppercase and lowercase letter");
        return;
    }
    else {
        await createUserWithEmailAndPassword(auth, email, password).catch((e) => {
            toast.error(e.code);
            
          });
          toast.success("Account created successfully");
    }


        
        return;
=======
    if(!email || !password || !confirm_pass){
        toast.error("some inputs are missing")
        
      
    } else {
        if(password !== confirm_pass){
            toast.error("password not matching")
        }else{
            await createUserWithEmailAndPassword(auth,email,password).then((user)=>{
                toast("user registered sucessfully")
                router.push('/login')

            }).catch((e)=>{
                toast("error occured while registering")
            })

        }
    
>>>>>>> b0fdd4b (added logout,register.js and started with navbar)
    }

  return (
      <div>
          <section class="bg-gray-50 dark:bg-gray-900">
              <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                  <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-red-900 dark:text-white">  
                      Register
                  </a>
                  <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                      <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                          <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                              Register for an account
                          </h1>
                          <form class="space-y-4 md:space-y-6" onSubmit={handleRegister}>
                              <div>
                                  <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                  <input type="email" onChange={(e)=>setemail(e.target.value)} name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Your Email" required=""/>
                              </div>
                              <div>
                                  <label for="password"  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                  <input type="password" onChange={(e)=>setpassword(e.target.value)} name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                              </div>
                              <div>
                                  <label for="password"  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Re-enter Password</label>
                                  <input type="password" onChange={(e)=>set_confirm_pass(e.target.value)} name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                              </div>
                              <button type="submit" class="w-full text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Register</button>
                              <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                                  Already have an account? <a href="/" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Login</a>
                              </p>
                          </form>
                      </div>
                  </div>
              </div>
          </section>
          <Toaster/>
      </div>
  );
}
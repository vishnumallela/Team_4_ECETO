import React from 'react'
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../../../config/firebase';
import { BsCalendar2DateFill } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { auth } from '../../../config/firebase';
import { doc, setDoc,deleteDoc,updateDoc ,arrayUnion} from "firebase/firestore"; 
import { useRouter } from 'next/router';


import { useAuthState } from 'react-firebase-hooks/auth';

function Event({ data ,event_id}) {
  const router = useRouter()
    const [user, loading, error] = useAuthState(auth);


    const DeleteEvent = async () => {
      const q = query(collection(db, "events"), where("event_id", "==", event_id));
      const docSnap = await getDocs(q);
      docSnap.forEach((doc) => {
        deleteDoc(doc.ref).then((res)=>{
          console.log("doc deleted")
          router.push("/")
        });
      });

      
    };

    const registerEvent = async () => {
      //code event registration here you  need to add the user id to array of people attending
      const documentRef = doc(db, "events",data[0].event_name);
      await updateDoc(documentRef, {
        people_attending_ids: arrayUnion(user.uid)
    }).then((res)=>{
      console.log("added to Event")
      router.push("/")
    });
     
    };



  console.log(data);
  return (
    <div className="h-screen w-screen bg-black">
      <h1 className="text-white text-4xl pt-5 ml-6 ">{data[0].event_name}</h1>
      <div className="ml-6 mt-5">
        <p className="text-white text-2xl">Date and Time</p>
        <p className="text-white">
          <BsCalendar2DateFill className="inline-block mr-3" />
          {data[0].event_dates.startDate} - {data[0].event_dates.endDate}
        </p>
      </div>

      <div className="ml-6 mt-5">
        <p className="text-white text-2xl">Location</p>
        <p className="text-white">
          <FaLocationDot className="inline-block mr-3" />
          {data[0].location}
        </p>
      </div>

      <div className="ml-6 mt-5">
        <p className="text-white text-2xl">About this Event</p>
        <p className="text-white">{data[0].description}</p>
      </div>

     {user?.uid == data[0].user_created_id ? (<>
        
      <button onClick={DeleteEvent} type="button" class="text-gray-900 bg-gradient-to-r m-3 from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Delete Event</button>
     </>):(<>
        <button onClick={registerEvent}
        type="button"
        class="ml-6 mt-5 text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
      >
        Register
      </button>
     
     </>)}
    </div>
  );
}

export default Event;

export async function getServerSideProps(ctx) {
  const { event_id } = ctx.query;
  const data = [];

  const q = query(collection(db, "events"), where("event_id", "==", event_id));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });

  return {
    props: {
      data: data,
      event_id:event_id,
    },
  };
}
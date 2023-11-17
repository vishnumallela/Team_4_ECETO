import { useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../Navbar";
import {MdLocationPin} from "react-icons/md"

import { db } from "../../../config/firebase";
import { collection, getDocs ,query,where} from "firebase/firestore";
import LatestEvents from "./LatestEvents";

export default function Dashboard({ events }) {
  const router = useRouter();
  const { user_id } = router.query;
  if (user_id) {
    return (
      <div className="h-screen w-screen bg-gradient-to-r from-green-400 to-blue-500 flex flex-col items-center justify-start">
        <Navbar />
        <div className="w-3/4 h-3/4 rounded-md ml-4  bg-white mr-4 mt-[150px] ">
          <div>
          <div className="flex flex-col items-center justify-start">
        <h1 className="ml-3 font-semibold absolute items-center">My Events</h1>
        </div>
          <div className="flex flex-wrap items-start justify-start px-10 py-10">
            {events?.map((event)=>{
                return (<>
                <div className="bg-yellow-300 border-solid border-2 border-indigo-600  w-[200px] h-[200px] rounded-md shadow-lg text-center px-1 py-3 flex flex-col items-center justify-around">
                    <p className="text-bold font-mono">{event.event_name}</p>
                    <p className="text-sm">{event.description}</p>
                    <p className="text-sm">{event.location}</p>
                    <p>{event.people_attending_ids.length} attending</p>
                </div>
                </>)
            })}
        </div>
        </div>
        <LatestEvents/>
        </div>
      </div>
    );
  } else {
    return <h1>Not Authenticated</h1>;
  }
}

export async function getServerSideProps(ctx) {
  let events = [];
  const { user_id } = ctx.query;
  const q = query(collection(db, "events"), where("user_created_id", "==", user_id));
  const docsSnapshot = await getDocs(q);
  docsSnapshot.forEach((doc) => {
    events.push(doc.data());
    console.log(doc.data())
  });
  return {
    props: {
      events: events,
    },
  };
}

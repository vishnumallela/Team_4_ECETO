import { useRouter } from "next/router";
import { useState } from "react";
import Navbar from "../Navbar";
import { db } from "../../../config/firebase";
import { collection, getDocs ,query,where} from "firebase/firestore";
import { useEffect } from "react";


function RegisteredEvents(){

    const router = useRouter();
    const { user_id } = router.query;
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    //for some reason user_id is undefined and not getting picked up
    const getEvents = async () => {
        const q = query(collection(db, "events"), where("people_attending_ids", "array-contains", "Lj20sdKfThWepCZty1skTyXAVde2"));
        const docsSnapshot = await getDocs(q);
        docsSnapshot.forEach((doc) => {
          setEvents(doc.data());
          console.log(doc.data())
        });
        setLoading(false);
      };
    

    useEffect(() => {
        getEvents();
      }, []);

    
    return(
        <div className="h-screen w-screen bg-gradient-to-r from-green-400 to-blue-500 flex flex-col items-center justify-start">
        <Navbar />
        <h1 className="ml-3 mt-[10.75rem] font-semibold absolute">MY EVENTS</h1>
        <div className="w-3/4 h-3/4 rounded-md ml-4  bg-white mr-4 mt-[150px] ">
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
            }
            )}
        </div>
        </div>
        </div>
    )
}

export default RegisteredEvents;
import React from "react";
import { collection, query, where, getDocs, getDoc } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { BsCalendar2DateFill } from "react-icons/bs";
import { FaLocationDot } from "react-icons/fa6";
import { auth } from "../../../config/firebase";
import { doc, deleteDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { useRouter } from "next/router";
import GoogleMapReact from "google-map-react";
import toast, { Toaster } from "react-hot-toast";
import Navbar from '../Navbar';


import { useAuthState } from "react-firebase-hooks/auth";

function Event({ data, event_id }) {
  const [user, loading, error] = useAuthState(auth);


  const notify = () => toast("Already Registered for the Event");
  const defaultProps = {
    center: {
      lat: data[0].location_cordinates.lat,
      lng: data[0].location_cordinates.lng,
    },
    zoom: 16,
  };
  const AnyReactComponent = ({ text }) => <div>{text}</div>;
  const router = useRouter();
  

  const DeleteEvent = async () => {
    const q = query(collection(db, "events"), where("event_id", "==", event_id));
    const docSnap = await getDocs(q);
    docSnap.forEach((doc) => {
      deleteDoc(doc.ref).then((res) => {
        console.log("doc deleted");
        router.push("/");
      });
    });
  };

  const checkIfValueExists = async () => {
    try {
      const eventRef = doc(db, "events", data[0].event_name);
      const eventDoc = await getDoc(eventRef);

      if (eventDoc.exists()) {
        const peopleAttendingIds = eventDoc.data().people_attending_ids || [];

        // Check if the targetValue exists in the array
        const exists = peopleAttendingIds.includes(user.uid);

        if (exists) {
          notify();
        } else {
          const documentRef = doc(db, "events", data[0].event_name);
          await updateDoc(documentRef, {
            people_attending_ids: arrayUnion(user.uid),
          }).then((res) => {
            console.log("added to Event");
            router.push("/");
         
          });
        }
      } else {
        console.log(`Event  does not exist.`);
      }
    } catch (error) {
      console.error("Error checking value:", error);
    }
  };

  // const registerEvent = async () => {
  //   //Check if user id exists in the Array if already Registered show you have already registered for the event
  //   checkIfValueExists()

  //   const documentRef = doc(db, "events", data[0].event_name);
  //   await updateDoc(documentRef, {
  //     people_attending_ids: arrayUnion(user.uid),
  //   }).then((res) => {
  //     console.log("added to Event");
  //     router.push("/");
  //   });
  // };

  console.log(data);
  return (
    <>
    <Navbar/>
    <div className="event-page">
    <div className="event-detail-container">
      <h1 className="text-black text-4xl pt-5 ml-6 ">{data[0].event_name}</h1>
      <div className="ml-6 mt-5">
        <p className="text-black text-2xl">Date and Time</p>
        <p className="text-black">
          <BsCalendar2DateFill className="inline-block mr-3" />
          {data[0].event_dates.startDate} - {data[0].event_dates.endDate}
        </p>
      </div>

      <div className="ml-6 mt-5">
        <p className="text-black text-2xl">Location</p>
        <p className="text-black">
          <FaLocationDot className="inline-block mr-3" />
          {data[0].location}
        </p>
      </div>

      <div className="ml-6 mt-5">
        <p className="text-black text-2xl">About this Event</p>
        <p className="text-black">{data[0].description}</p>
      </div>

      <div className="m-3" style={{ height: "30vh", width: "30%" }}>
        <GoogleMapReact bootstrapURLKeys={{ key: "AIzaSyD1OlA0konjpXPhAid2MJ3EVbAv4r563zY" }} defaultCenter={defaultProps.center} defaultZoom={defaultProps.zoom}>
          <AnyReactComponent lat={data[0].location_cordinates.lat} lng={data[0].location_cordinates.lng} text="📍" />
        </GoogleMapReact>
      </div>

      {user?.uid == data[0].user_created_id ? (
        <>
          <button
            onClick={DeleteEvent}
            type="button"
            class="text-gray-900 bg-gradient-to-r m-3 from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Delete Event
          </button>
        </>
      ) : (
        <>
          <button
            onClick={checkIfValueExists}
            type="button"
            class="ml-6 mt-5 text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            Register
          </button>
        </>
      )}
      <Toaster />
    </div>
        </div>

    </>
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
      event_id: event_id,
    },
  };
}

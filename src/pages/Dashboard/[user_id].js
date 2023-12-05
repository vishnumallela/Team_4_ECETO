import { useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../Navbar";
import { MdLocationPin } from "react-icons/md";
import { db } from "../../../config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import LatestEvents from "./LatestEvents";

export default function Dashboard({ events }) {
  const router = useRouter();
  const { user_id } = router.query;
  if (user_id) {
    return (
      <div className="dashboard">
        <Navbar />
        <div className="events-container">
          <h1 className="my-events-title">My Events</h1>
          <div className="event-cards-container">
            {events?.map((event) => (
              <div key={event.event_id} onClick={() => router.push(`/Event/${event.event_id}`)} className="event-card">
                <p className="event-name">{event.event_name}</p>
                <p className="event-description">{event.description}</p>
                <p className="event-location"><MdLocationPin />{event.location}</p>
                <p className="event-attendance">{event.people_attending_ids.length} attending</p>
              </div>
            ))}
          </div>
        </div>
        <LatestEvents />
      </div>
    );
  } else {
    return <h1 className="not-authenticated">Not Authenticated</h1>;
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

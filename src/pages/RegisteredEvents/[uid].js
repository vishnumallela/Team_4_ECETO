import { collection, query ,where,getDocs} from 'firebase/firestore';
import React from 'react'
import { db } from '../../../config/firebase';
import { useRouter } from 'next/router';
import Navbar from "../Navbar";

function RegisteredEvents({ data, uid }) {
  const router = useRouter();
  console.log(data);

  return (
    <>
      <Navbar />
      <div className="registered-events-container">
        <h1 className="registered-events-header">Registered Events</h1>
        <div className="registered-events-grid">
          {data.map((doc) => (
            <div key={doc.event_id} className="event-card">
              <h1>{doc.event_name}</h1>
              <p className="text-sm">{doc.description}</p>
              <p className="text-sm">{doc.location}</p>
              <p>{doc.people_attending_ids.length} attending</p>
              <button onClick={() => router.push(`/Event/${doc.event_id}`)} className="go-to-event-btn">
                Go to Event
              </button>
              <button onClick={() => router.push(`/Ticket/${doc.event_id}`)} className="view-ticket-btn">
                View Ticket
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const { uid } = ctx.query;
  const data = [];
  const EventsRef = collection(db, "events");
  const q = query(EventsRef, where("people_attending_ids", "array-contains", uid));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });

  return {
    props: {
      data: data,
      uid: uid,
    },
  };
}

export default RegisteredEvents;
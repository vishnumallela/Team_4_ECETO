import { collection, query, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from "react";
import { db } from "../../../config/firebase";

export default function LatestEvents() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            const q = query(collection(db, "events"));
            const querySnapshot = await getDocs(q);

            const eventData = [];
            querySnapshot.forEach((doc) => {
                eventData.push(doc.data());
            });

            setEvents(eventData);
        };

        fetchEvents();
    }, []);

    return (
        <div>
            <div className="flex flex-col items-center justify-start">
                <h1 className="ml-3 font-semibold absolute items-center">Latest Events</h1>
            </div>
            <div className="flex flex-wrap items-start justify-start px-10 py-10">
                {events.map((event) => (
                    <div key={event.id} className="bg-yellow-300 border-solid border-2 border-indigo-600  w-[200px] h-[200px] rounded-md shadow-lg text-center px-1 py-3 flex flex-col items-center justify-around">
                        <p className="text-bold font-mono">Name: {event.event_name}</p>
                        <p className="text-sm">Description: {event.description}</p>
                        <p className="text-sm">Location: {event.location}</p>
                        <p>{event.people_attending_ids.length} attending</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

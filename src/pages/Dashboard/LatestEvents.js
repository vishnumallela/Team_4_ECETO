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
            <div className="events-container">
                <h1 className="my-events-title">Latest Events</h1>
            </div>
            <div className="flex flex-wrap items-start justify-start px-10 py-10">
                {events.map((event) => (
                    <div key={event.id} className="event-card">
                        <p className="event-name">Name: {event.event_name}</p>
                        <p className="event-description">Description: {event.description}</p>
                        <p className="event-location">Location: {event.location}</p>
                        <p>{event.people_attending_ids.length} attending</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

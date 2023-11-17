import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from "react";
import { db } from "../../../config/firebase";

 export default function LatestEvents() {

    const [latestEvents, setLatestEvents] = useState([]);

    useEffect(() => {
        const eventsQuery = query(collection(db,'events'), orderBy('createdAt','desc'),limit(20));
        const fetchLatestEevents = async() => {
            const querySnapshot = await getDocs(eventsQuery);
            const eventsData = [];
            querySnapshot.forEach((doc)=>{
                const eventData = doc.data();
                eventsData.push(eventData);
            });
            setLatestEvents(eventsData);
        };    
        fetchLatestEevents();
    },[]);

    return(<div>
        <h2>Latest Events</h2>
        <br></br>
        <ul>
            {
                latestEvents.map((oneEvent)=>{
                    <li key={oneEvent.id}>
                        <h3>{oneEvent.event_name}</h3>
                        <p>Description: {oneEvent.description}</p>
                        <p>Category: {oneEvent.category}</p>
                        <p>Date: {oneEvent.event_dates.startDate.toDate().toLocaleDateString()}</p>
                        <p>Time: {oneEvent.event_dates.startDate.toDate().toLocaleTimeString()}</p>
                        <p>Location: {oneEvent.location}</p>
                    </li>
                })
            }
        </ul>
    </div>);
 }

 
import React from 'react'
import { getDocs,collection } from 'firebase/firestore'
import { db } from '../../../config/firebase'
import { useRouter } from 'next/router'
import Navbar from "../Navbar";



function TrendingEvents({ all_events }) {
    const router = useRouter();

    return (
        <>
            <Navbar />
            <div className='trending-events-container'>
                <div className='trending-events-grid'>
                    {all_events.map((event) => (
                        <div key={event.event_id} className='trending-event-card'>
                            <h1 className='text-lg uppercase'>{event.event_name}</h1>
                            <p>{event.description}</p>
                            <p className='text-sm text-center'>{event.location}</p>
                            <button onClick={() => router.push(`/Event/${event.event_id}`)} className="explore-event-btn">
                                Explore Event
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export async function getServerSideProps(ctx){

    const querySnapshot = await getDocs(collection(db,"events"))
    const all_events =[]
    querySnapshot.forEach((doc)=>{
        all_events.push(doc.data())
    })



    return {
        props:{
            all_events:all_events,
        }
    }
}

export default TrendingEvents
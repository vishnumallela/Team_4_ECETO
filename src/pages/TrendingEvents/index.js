import React from 'react'
import { getDocs,collection } from 'firebase/firestore'
import { db } from '../../../config/firebase'
import { useRouter } from 'next/router'



function TrendingEvents({all_events}) {
    const router = useRouter()
    console.log(all_events)
  return (
    <div className='w-screen h-screen  p-6'>
        <div  className='w-3/4 h-3/4 flex flex-row items-start justify-start'>
        {all_events.map((event)=>{
            return (<>
            <div className='bg-white w-[250px] h-[250px] rounded shadow-lg m-6 flex flex-col items-center justify-start p-4'>
                <h1 className='text-lg uppercase'>{event.event_name}</h1>
                <p>{event.description}</p>
                <p className='text-sm text-center'>{event.location}</p>
                <button onClick={()=>router.push(`/Event/${event.event_id}`)} type="button" class="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Explore Event</button>

            </div>
            
            
            </>)
        })}

        </div>
        
        
      
      
        </div>
  )
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
import { collection, query ,where,getDocs} from 'firebase/firestore';
import React from 'react'
import { db } from '../../../config/firebase';
import { useRouter } from 'next/router';



function RegisteredEvents({data,uid}) {
  const router = useRouter()
  console.log(data)

  return (
    <div className='h-screen w-screen bg-yellow-300'>
      <h1 className='p-3 font-extrabold'>Registered Events</h1>
      <div className='flex flex-row w-screen m-3'>
        {data.map((doc)=>{
          return (<>
          <div className='w-auto px-2 h-[150px] py-2 bg-white cursor-pointer rounded-md m-2 flex flex-col items-center justify-normal text-center'>
            <h1>{doc.event_name}</h1>
            
                    <p className="text-sm">{doc.description}</p>
                    <p className="text-sm">{doc.location}</p>
                    <p>{doc.people_attending_ids.length} attending</p>
                    <button onClick={()=>router.push(`/Event/${doc.event_id}`)} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  Go to Event 
</button>
            <p></p>

          </div>
          
          </>)
        })}

      </div>
      
      </div>
  )
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
      uid:uid,
    },
  };
}

export default RegisteredEvents
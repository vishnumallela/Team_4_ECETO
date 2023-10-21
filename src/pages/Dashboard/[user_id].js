import { useState } from "react";
import { useRouter } from "next/router";
import Navbar from "../Navbar"


export default function Dashboard() {
    const router = useRouter()
    const { user_id } = router.query;

    if(user_id){
        return <div className="h-screen w-screen bg-yellow-200">
            <Navbar/>
            







        </div>

    }else{
        return <h1>Not Authenticated</h1>
    }
}

export async function getServerSideProps(ctx){


    return {
        props:{
            data:null
        }
    }
}

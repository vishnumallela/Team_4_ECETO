import React from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";
import { FcInfo } from "react-icons/fc";
import { HiLocationMarker } from "react-icons/hi";
import { BsFillCalendar2HeartFill } from "react-icons/bs";
import Datepicker from "react-tailwindcss-datepicker";
import { setDoc,doc } from "firebase/firestore";
import toast, { Toaster } from 'react-hot-toast';
import { db } from "../../../config/firebase";
import { useEffect } from "react";
import Navbar from "../Navbar";
import { v4 as uuidv4 } from 'uuid';

function Event() {
  
  const router = useRouter();
   
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });
  const [ll_values, set_ll_values] = useState(null);
  const [place_value, set_place_value] = useState(null);
  const [event_name, set_event_name] = useState(null);
  const [description, set_description] = useState(null);
  const [event_type, set_event_type] = useState(null);
  const [category, set_category] = useState(null);
  const api_key_maps = process.env.NEXT_PUBLIC_GOOGLE_KEY;
  const { uid } = router.query;
  
  useEffect(() => {
  if (place_value !== null) {
    geocodeByAddress(place_value.label)
      .then((results) => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        set_ll_values({ lat, lng });
      });
  }
  }, [place_value]);

  const handleForm = (e) => {
    e.preventDefault();
  };

  const handledateChange = (val) => {
    setValue(val);
  };
 
  const CreateEvent = async (e) => {
    e.preventDefault()
    console.log("create event clicked")
    if (!event_name || !description || !event_type || !category || !place_value || !value || !ll_values) {
      console.error("fields missing")
    } else {
      await setDoc(doc(db, "events", `${event_name}`), {
        event_name: event_name,
        user_created_id: uid,
        location_cordinates: ll_values,
        event_id:uuidv4(),
        location: place_value.label,
        event_dates: value,
        event_type: event_type,
        event_category: category,
        description: description,
        people_attending_ids:[]
      }).then((res) => {
          toast("event created sucessfully");
          router.push(`/Dashboard/${uid}`)
        }).catch((err) => {
          toast(err.message);
        });
    }
  };

  return (
    <div>
      <Navbar/>
    <div className="creeat-event-container">
      <div className="create-event-form">
        <form onSubmit={CreateEvent}>
          <h1 className="text-2xl text-blue-600">
            {" "}
            <FcInfo className="inline" /> Basic Info
          </h1>
          <p className="font-extralight font-serif mt-4">Name your event and tell event-goers why they should come. Add details that highlight what makes it unique</p>
          <div className="mt-4">
            <label for="event_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Event Name
            </label>
            <input
              type="text"
              id="event_name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter the Event Title here"
              required
              onChange={(e) => set_event_name(e.target.value)}
            />
          </div>
          
          <div className="mt-4">
            <label for="event_type" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Select Event Type
            </label>
            <select
              id="event_type"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => set_event_type(e.target.value)}
            >
              <option value="" data-spec="select-option">
                Type
              </option>
              <option value="Appearance or Signing" data-spec="select-option">
                Appearance or Signing
              </option>
              <option value="Attraction" data-spec="select-option">
                Attraction
              </option>
              <option value="Camp,Trip,or Retreat" data-spec="select-option">
                Camp, Trip, or Retreat
              </option>
              <option value="Class,Training, or Workshop" data-spec="select-option">
                Class, Training, or Workshop
              </option>
              <option value="Concert or Performance" data-spec="select-option">
                Concert or Performance
              </option>
              <option value="Conference" data-spec="select-option">
                Conference
              </option>
              <option value="Convention" data-spec="select-option">
                Convention
              </option>
              <option value="Dinner or Gala" data-spec="select-option">
                Dinner or Gala
              </option>
              <option value="Festival or Fair" data-spec="select-option">
                Festival or Fair
              </option>
              <option value="Game or Competition" data-spec="select-option">
                Game or Competition
              </option>
              <option value="Meeting or Networking Event" data-spec="select-option">
                Meeting or Networking Event
              </option>
              <option value="Other" data-spec="select-option">
                Other
              </option>
              <option value="Party or Social Gathering" data-spec="select-option">
                Party or Social Gathering
              </option>
              <option value="Race or Endurance Event" data-spec="select-option">
                Race or Endurance Event
              </option>
              <option value="Rally" data-spec="select-option">
                Rally
              </option>
              <option value="Screening" data-spec="select-option">
                Screening
              </option>
              <option value="Seminar or Talk" data-spec="select-option">
                Seminar or Talk
              </option>
              <option value="Tour" data-spec="select-option">
                Tour
              </option>
              <option value="Tournament" data-spec="select-option">
                Tournament
              </option>
              <option value="Tradeshow,Consumer Show,or Expo" data-spec="select-option">
                Tradeshow, Consumer Show, or Expo
              </option>
            </select>
          </div>

          <div className="mt-4">
            <label for="category_type" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Select Category Type
            </label>
            <select
              id="category_type"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => set_category(e.target.value)}
            >
              <option value="" data-spec="select-option">
                Category
              </option>
              <option value="Auto,Boat,Air" data-spec="select-option">
                Auto, Boat &amp; Air
              </option>
              <option value="Business and Professional" data-spec="select-option">
                Business &amp; Professional
              </option>
              <option value="Charity and Causes" data-spec="select-option">
                Charity &amp; Causes
              </option>
              <option value="Community and Culture" data-spec="select-option">
                Community &amp; Culture
              </option>
              <option value="Family and Education" data-spec="select-option">
                Family &amp; Education
              </option>
              <option value="Fashion and Beauty" data-spec="select-option">
                Fashion &amp; Beauty
              </option>
              <option value="Film,Media and Entertainment" data-spec="select-option">
                Film, Media &amp; Entertainment
              </option>
              <option value="Food and Drink" data-spec="select-option">
                Food &amp; Drink
              </option>
              <option value="Government and Politics" data-spec="select-option">
                Government &amp; Politics
              </option>
              <option value="Health and Wellness" data-spec="select-option">
                Health &amp; Wellness
              </option>
              <option value="Hobbies and Special Interest" data-spec="select-option">
                Hobbies &amp; Special Interest
              </option>
              <option value="Home and Lifestyle" data-spec="select-option">
                Home &amp; Lifestyle
              </option>
              <option value="Music" data-spec="select-option">
                Music
              </option>
              <option value="other" data-spec="select-option">
                Other
              </option>
              <option value="Performing and Visual Arts" data-spec="select-option">
                Performing &amp; Visual Arts
              </option>
              <option value="Religion and Spirtuality" data-spec="select-option">
                Religion &amp; Spirituality
              </option>
              <option value="School Activities" data-spec="select-option">
                School Activities
              </option>
              <option value="Science and Technology" data-spec="select-option">
                Science &amp; Technology
              </option>
              <option value="Seasonal and Holiday" data-spec="select-option">
                Seasonal &amp; Holiday
              </option>
              <option value="Sports and Fitness" data-spec="select-option">
                Sports &amp; Fitness
              </option>
              <option value="Outdoor" data-spec="select-option">
                Travel &amp; Outdoor
              </option>
            </select>
          </div>

          <div className="mt-9">
            <h1 className="text-2xl text-blue-600 mb-4 ">
              {" "}
              <BsFillCalendar2HeartFill className="inline rounded-md" /> Date and Time
            </h1>
            <Datepicker value={value} onChange={handledateChange} placeholder={"Enter Your Event Dates"} startFrom={new Date()} popoverDirection="down" primaryColor="amber" />
          </div>

          <div className="mt-9">
            <h1 className="text-2xl text-blue-600 mb-2">
              {" "}
              <HiLocationMarker className="inline" /> Location
            </h1>

            <div></div>

            <p className="font-extralight font-serif mb-4">Help people in the area discover your event and let attendees know where to show up.</p>

            <GooglePlacesAutocomplete
              onLoadFailed={(error) => console.error("Could not inject Google script", error)}
              apiKey={api_key_maps}
              selectProps={{ place_value, onChange: (newValue) => set_place_value(newValue), placeholder: "where's your event happenning ??" }}

            />
          </div>
          <div className="mt-4">
            <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              More Info About the Event
            </label>
            <input
              type="text"
              id="description"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-40 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-start"
              placeholder="Give a short description about the event"
              required
              onChange={(e) => set_description(e.target.value)}
            />
          </div>
          
          <button
            type="submit"
            class="text-white mt-7 bg-[#050708] hover:bg-[#050708]/80 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#050708]/40 dark:focus:ring-gray-600 mr-2 mb-2"
          >
            Let's Create
          </button>
        </form>
      </div>
      <Toaster />
    </div>
    </div>
  );
}

export default Event;

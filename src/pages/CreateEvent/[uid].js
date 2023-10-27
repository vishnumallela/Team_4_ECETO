import React from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { geocodeByAddress, getLatLng } from "react-google-places-autocomplete";
import { FcInfo } from "react-icons/fc";
import { HiLocationMarker } from "react-icons/hi";
import { BsFillCalendar2HeartFill } from "react-icons/bs";
import Datepicker from "react-tailwindcss-datepicker";

function Event() {
  const router = useRouter();

  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });
  const [ll_values, set_ll_values] = useState(null);
  const [place_value, set_place_value] = useState(null);
  const api_key_maps = "AIzaSyD1OlA0konjpXPhAid2MJ3EVbAv4r563zY";

  const { uid } = router.query;

  const handleForm = (e) => {
    e.preventDefault();
  };

  const handleValueChange = (val) => {
    setValue(val);
    console.log(value);
  };

  const handlePlace = async (val) => {
    set_place_value(val);
    console.log(place_value);
    if (place_value) {
      await geocodeByAddress(place_value.label)
        .then((results) => getLatLng(results[0]))
        .then(({ lat, lng }) => set_ll_values({ lat, lng }));
      console.log(ll_values);
    }
  };

  const CreateEvent = async (e) => {
    e.preventDefault();
    //adding event to database goes here
  };

  return (
    <div className="h-screen w-screen bg-white flex justify-center align-top">
      <div className="form h-auto px-20 py-20 bg-yellow-200 w-3/5 mt-5 rounded-md flex justify-start align-top ">
        <form onSubmit={CreateEvent}>
          <h1 className="text-2xl text-blue-600">
            {" "}
            <FcInfo className="inline" /> Basic Info
          </h1>
          <p className="font-extralight font-serif">Name your event and tell event-goers why they should come. Add details that highlight what makes it unique</p>
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
            />
          </div>

          <div className="mt-4">
            <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              More Info About the Event
            </label>
            <input
              type="text"
              id="description"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 h-20 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-start"
              placeholder="Give short description about the event"
              required
            />
          </div>
          <div className="mt-4">
            <label for="event_type" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Select Event Type
            </label>
            <select
              id="event_type"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="" data-spec="select-option">
                Type
              </option>
              <option value="19" data-spec="select-option">
                Appearance or Signing
              </option>
              <option value="17" data-spec="select-option">
                Attraction
              </option>
              <option value="18" data-spec="select-option">
                Camp, Trip, or Retreat
              </option>
              <option value="9" data-spec="select-option">
                Class, Training, or Workshop
              </option>
              <option value="6" data-spec="select-option">
                Concert or Performance
              </option>
              <option value="1" data-spec="select-option">
                Conference
              </option>
              <option value="4" data-spec="select-option">
                Convention
              </option>
              <option value="8" data-spec="select-option">
                Dinner or Gala
              </option>
              <option value="5" data-spec="select-option">
                Festival or Fair
              </option>
              <option value="14" data-spec="select-option">
                Game or Competition
              </option>
              <option value="10" data-spec="select-option">
                Meeting or Networking Event
              </option>
              <option value="100" data-spec="select-option">
                Other
              </option>
              <option value="11" data-spec="select-option">
                Party or Social Gathering
              </option>
              <option value="15" data-spec="select-option">
                Race or Endurance Event
              </option>
              <option value="12" data-spec="select-option">
                Rally
              </option>
              <option value="7" data-spec="select-option">
                Screening
              </option>
              <option value="2" data-spec="select-option">
                Seminar or Talk
              </option>
              <option value="16" data-spec="select-option">
                Tour
              </option>
              <option value="13" data-spec="select-option">
                Tournament
              </option>
              <option value="3" data-spec="select-option">
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
            >
              <option value="" data-spec="select-option">
                Category
              </option>
              <option value="118" data-spec="select-option">
                Auto, Boat &amp; Air
              </option>
              <option value="101" data-spec="select-option">
                Business &amp; Professional
              </option>
              <option value="111" data-spec="select-option">
                Charity &amp; Causes
              </option>
              <option value="113" data-spec="select-option">
                Community &amp; Culture
              </option>
              <option value="115" data-spec="select-option">
                Family &amp; Education
              </option>
              <option value="106" data-spec="select-option">
                Fashion &amp; Beauty
              </option>
              <option value="104" data-spec="select-option">
                Film, Media &amp; Entertainment
              </option>
              <option value="110" data-spec="select-option">
                Food &amp; Drink
              </option>
              <option value="112" data-spec="select-option">
                Government &amp; Politics
              </option>
              <option value="107" data-spec="select-option">
                Health &amp; Wellness
              </option>
              <option value="119" data-spec="select-option">
                Hobbies &amp; Special Interest
              </option>
              <option value="117" data-spec="select-option">
                Home &amp; Lifestyle
              </option>
              <option value="103" data-spec="select-option">
                Music
              </option>
              <option value="199" data-spec="select-option">
                Other
              </option>
              <option value="105" data-spec="select-option">
                Performing &amp; Visual Arts
              </option>
              <option value="114" data-spec="select-option">
                Religion &amp; Spirituality
              </option>
              <option value="120" data-spec="select-option">
                School Activities
              </option>
              <option value="102" data-spec="select-option">
                Science &amp; Technology
              </option>
              <option value="116" data-spec="select-option">
                Seasonal &amp; Holiday
              </option>
              <option value="108" data-spec="select-option">
                Sports &amp; Fitness
              </option>
              <option value="109" data-spec="select-option">
                Travel &amp; Outdoor
              </option>
            </select>
          </div>

          <div className="mt-9">
            <h1 className="text-2xl text-blue-600 mb-2">
              {" "}
              <HiLocationMarker className="inline" /> Location
            </h1>

            <div></div>

            <p className="font-extralight font-serif mb-4">Help people in the area discover your event and let attendees know where to show up.</p>

            <GooglePlacesAutocomplete apiKey={api_key_maps} selectProps={{ onChange: (val) => handlePlace(val), placeholder: "where's your event happenning ??" }} />
          </div>

          <div className="mt-9">
            <h1 className="text-2xl text-blue-600 mb-4 ">
              {" "}
              <BsFillCalendar2HeartFill className="inline rounded-md" /> Date and Time
            </h1>
            <Datepicker value={value} onChange={handleValueChange} placeholder={"Enter Your Event Dates"} startFrom={new Date()} popoverDirection="down" primaryColor="amber" />
          </div>

          <button
            type="submit"
            class="text-white mt-7 bg-[#050708] hover:bg-[#050708]/80 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#050708]/40 dark:focus:ring-gray-600 mr-2 mb-2"
          >
            Let's Create
          </button>
        </form>
      </div>
    </div>
  );
}

export default Event;

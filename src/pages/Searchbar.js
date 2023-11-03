import React, { useEffect } from "react";
import { useState } from "react";
import { db } from "../../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { set } from "cypress/types/lodash";

function Searchbar() {
  const [input_text, set_input_text] = useState("");
  const [events_data, set_events_data] = useState([]);
  const [filtered_data, set_filtered_data] = useState([]);

  useEffect(() => {
    const get_events_snapshot = async () => {
      const events_data_snapshot = await getDocs(collection(db, "events"));
      set_events_data(events_data_snapshot);
      events_data_snapshot.forEach((doc) => {
        console.log(doc.data());
      });
    };

    get_events_snapshot();
  }, []);

  //filtering everytime the user types in the search bar
  const handleInputChange = (e) => { 
    set_input_text(e.target.value);
    const filtered = events_data.docs.filter((doc) => doc.data().event_name.includes(input_text));
    set_filtered_data(filtered);
    filtered_data.forEach((doc) => console.log(doc.data().event_name));
  };


  const form_submit = (e) => {
    e.preventDefault();
    set_input_text(e.target.value);
    const filtered_data = events_data.docs.filter((doc) => doc.data().event_name.includes(input_text));
    filtered_data.forEach((doc) => console.log(doc.data().event_name));
  };

  return (
    <div>
      <form class="flex items-center" onSubmit={form_submit}>
        <label for="voice-search" class="sr-only">
          Search
        </label>
        <div class="relative w-full">
          <input
            type="text"
            id="voice-search"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Events By Name..."
            required
            onChange={handleInputChange}
          />
        </div>

        <button
          type="submit"
          class="inline-flex items-center py-2.5 px-6 ml-2 text-sm font-medium text-white bg-blue-700 rounded-full border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <svg class="w-8 h-4 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>
        </button>
      </form>
      <div className="w-[3/4] h-10 rounded-md  bg-blue-300 mt-2">
        {
          filtered_data.map((doc) => (
            <div>
              <p>{doc.data().event_name}</p>
            </div>
          ))

          }
      </div>
    </div>
  );
}

export default Searchbar;
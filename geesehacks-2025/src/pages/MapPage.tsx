import React, { useEffect, useState } from "react";

interface Activity {
  title: string;
  participants: string;
  location: string;
  image: string;
}

const Map: React.FC = () => {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    // Fetch the JSON file dynamically
    fetch("../public/locations.json")
      .then((response) => response.json())
      .then((data) => {
        const shuffled = data.sort(() => 0.5 - Math.random());
        setActivities(shuffled.slice(0, 2)); // Take 2 random activities
      })
      .catch((error) => console.error("Failed to load activities:", error));
  }, []);

  return (
    <div className="p-6 bg-gray-100 text-gray-800">
      {/* Greeting and Search Bar */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-semibold text-blue-800">Hello, Edward 👋</h1>
        <input
          type="text"
          placeholder="What do you want to do today?"
          className="mt-4 px-4 py-2 w-full max-w-md border border-gray-300 rounded-lg bg-white text-gray-800 shadow-sm focus:ring focus:ring-blue-300"
        />
      </div>

      {/* Map Section */}
      <div className="relative mb-8">
        <div className="w-full h-72 bg-gray-300 rounded-lg shadow-md">
          <img
            src="/mnt/data/image.png" // Replace with your actual map image path
            alt="Map"
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>

      {/* People Nearby and Ongoing Activities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* People Nearby */}
        <div className="flex flex-col items-center">
          <h2 className="text-xl font-bold mb-4 text-blue-800">People who are also interested in</h2>
          <select className="mb-4 px-4 py-2 w-full max-w-xs border border-gray-300 rounded-lg bg-white text-gray-800 shadow-sm focus:ring focus:ring-blue-300">
            <option>Food</option>
            <option>Sports</option>
            <option>Music</option>
          </select>

          {/* Content centered */}
          <div className="space-y-4">
            {/* Centered "Within 1km" with its icons */}
            <div className="flex flex-col items-center">
              <h3 className="text-lg font-semibold text-gray-800">Within 1km</h3>
              <div className="flex space-x-2">
                {["A", "B", "C"].map((initial, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-center w-10 h-10 bg-blue-100 text-blue-800 rounded-full font-bold"
                  >
                    {initial}
                  </div>
                ))}
              </div>
            </div>

            {/* Other distances: centered with icons */}
            {["Within 1-3km", "Within 3-5km"].map((distance, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <h3 className="text-lg font-semibold text-gray-800">{distance}</h3>
                <div className="flex space-x-2">
                  {["A", "B", "C"].map((initial, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-center w-10 h-10 bg-blue-100 text-blue-800 rounded-full font-bold"
                    >
                      {initial}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ongoing Activities */}
        <div className="flex justify-center">
          <div className="w-full max-w-3xl">
            <h2 className="text-xl font-bold mb-4 text-blue-800 text-center">Ongoing Activities</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activities.map((activity, idx) => (
                <div key={idx} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img
                    src={activity.image}
                    alt={activity.title}
                    className="w-full h-36 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800">{activity.title}</h3>
                    <p className="text-gray-600">{activity.participants}</p>
                    <p className="text-gray-600">{activity.location}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-6">
              <button className="px-4 py-2 bg-blue-800 text-white font-bold rounded-lg shadow-md hover:bg-blue-700 max-w-3xl w-full">
                + Add a new activity
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;

import React, { useEffect, useState } from "react";

interface Activity {
  title: string;
  participants: string;
  location: string;
  image: string;
}

interface Person {
  name: string;
  age: number;
  major: string;
  interests: string[];
  description: string;
  distance: number;
  latitude: number;
  longitude: number;
}

const Map: React.FC = () => {
  // const [name, setName] = useState("Goosling");
  const [activities, setActivities] = useState<Activity[]>([]);
  const [people, setPeople] = useState<Person[]>([]);
  const [currentGroup, setCurrentGroup] = useState<Person[]>([]);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [inviteSent, setInviteSent] = useState(false);

  useEffect(() => {
    fetchActivities();
    fetchPeople();
  }, []);

  const fetchActivities = () => {
    fetch("/locations.json")
      .then((response) => response.json())
      .then((data) =>
        setActivities(data.sort(() => 0.5 - Math.random()).slice(0, 2))
      )
      .catch((error) => console.error("Failed to load activities:", error));
  };

  const fetchPeople = () => {
    fetch("/people.json")
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const peopleWithDistance = data.map((person: Person) => ({
            ...person,
            distance: Math.floor(Math.random() * 5) + 1,
          }));
          setPeople(peopleWithDistance);
        } else {
          console.error("Invalid data format received:", data);
        }
      })
      .catch((error) => console.error("Failed to load people:", error));
  };

  const generateNewGroup = () => {
    const within1km = people
      .filter((person) => person.distance === 1)
      .slice(0, Math.floor(Math.random() * 5));
    const within3km = people
      .filter((person) => person.distance === 2 || person.distance === 3)
      .slice(0, Math.floor(Math.random() * 5));
    const within5km = people
      .filter((person) => person.distance === 4 || person.distance === 5)
      .slice(0, Math.floor(Math.random() * 5));
    setCurrentGroup([...within1km, ...within3km, ...within5km]);
  };

  useEffect(() => {
    generateNewGroup();
  }, [people]);

  const handleInterestChange = () => {
    fetchPeople();
    generateNewGroup();
    setSelectedPerson(null);
    setInviteSent(false);
  };

  const handleIconClick = (index: number) => {
    setSelectedPerson(currentGroup[index] || null);
    setInviteSent(false);
  };

  const handleSendInvite = () => {
    setInviteSent(true);
  };

  const handleSearchKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      fetchActivities();
    }
  };

  const groupByDistance = (people: Person[]) => {
    const within1km = people.filter((person) => person.distance === 1);
    const within3km = people.filter(
      (person) => person.distance === 2 || person.distance === 3
    );
    const within5km = people.filter(
      (person) => person.distance === 4 || person.distance === 5
    );
    return { within1km, within3km, within5km };
  };
  const { within1km, within3km, within5km } = groupByDistance(
    currentGroup || []
  );

  return (
    <div className="p-6 text-gray-800">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-semibold text-blue-800">
          Hello, {name} 👋
        </h1>
        <input
          type="text"
          placeholder="What do you want to do today?"
          className="mt-4 px-4 py-2 w-full max-w-md border border-gray-300 rounded-lg bg-white text-gray-800 shadow-sm focus:ring focus:ring-blue-300"
          onKeyPress={handleSearchKeyPress}
        />
      </div>

      <div className="relative mb-8 w-3/4 mx-auto">
        <div className="w-full h-72 bg-gray-200 rounded-lg shadow-md relative">
          {selectedPerson ? (
            selectedPerson.latitude && selectedPerson.longitude ? (
              <iframe
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps/embed/v1/place?key=${
                  import.meta.env.VITE_GOOGLE_MAPS_API_KEY
                }&q=${selectedPerson.latitude},${selectedPerson.longitude}`}
              ></iframe>
            ) : (
              <p>Location data for this person is unavailable.</p>
            )
          ) : (
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps/embed/v1/place?key=${
                import.meta.env.VITE_GOOGLE_MAPS_API_KEY
              }&q=University+of+Waterloo`}
            ></iframe>
          )}

          {selectedPerson && (
            <div className="absolute top-4 left-4 bg-white p-4 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold text-gray-800">
                {selectedPerson.name} ({selectedPerson.age})
              </h3>
              <p className="text-gray-600">Major: {selectedPerson.major}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                Interests:
                {selectedPerson.interests.map((interest, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm"
                  >
                    {interest}
                  </span>
                ))}
              </div>
              <p className="text-gray-600 mt-2">{selectedPerson.description}</p>
              <div className="flex justify-center mt-4">
                <button
                  className="px-4 py-2 bg-blue-800 text-white font-bold rounded-lg shadow-md hover:bg-blue-700"
                  onClick={handleSendInvite}
                >
                  {inviteSent ? "Invite Sent" : "Send Invite"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between items-start mb-8">
        <div className="flex flex-col items-center mt-8 max-w-xs mx-auto">
          <h3 className="text-xl font-semibold text-blue-800 mb-4">
            Choose an Interest
          </h3>
          <select
            className="mb-4 px-4 py-2 w-full max-w-xs border border-gray-300 rounded-lg bg-white text-gray-800 shadow-sm focus:ring focus:ring-blue-300"
            onChange={handleInterestChange}
          >
            <option>Food</option>
            <option>Sports</option>
            <option>Music</option>
          </select>

          {within1km.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                Within 1km
              </h4>
              <div className="grid grid-cols-3 gap-4 mb-4">
                {within1km.map((person, index) => (
                  <div
                    key={index}
                    onClick={() => handleIconClick(index)}
                    className={`w-12 h-12 rounded-full font-bold flex items-center justify-center cursor-pointer hover:bg-blue-200 ${
                      selectedPerson === person
                        ? "bg-blue-800 text-white"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {person.name.charAt(0)}
                  </div>
                ))}
              </div>
            </div>
          )}

          {within3km.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                Within 3km
              </h4>
              <div className="grid grid-cols-3 gap-4 mb-4">
                {within3km.map((person, index) => (
                  <div
                    key={index}
                    onClick={() => handleIconClick(index + within1km.length)}
                    className={`w-12 h-12 rounded-full font-bold flex items-center justify-center cursor-pointer hover:bg-blue-200 ${
                      selectedPerson === person
                        ? "bg-blue-800 text-white"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {person.name.charAt(0)}
                  </div>
                ))}
              </div>
            </div>
          )}

          {within5km.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                Within 5km
              </h4>
              <div className="grid grid-cols-3 gap-4">
                {within5km.map((person, index) => (
                  <div
                    key={index}
                    onClick={() =>
                      handleIconClick(
                        index + within1km.length + within3km.length
                      )
                    }
                    className={`w-12 h-12 rounded-full font-bold flex items-center justify-center cursor-pointer hover:bg-blue-200 ${
                      selectedPerson === person
                        ? "bg-blue-800 text-white"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {person.name.charAt(0)}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col items-center max-w-sm mx-auto">
          <h3 className="text-xl font-semibold text-blue-800 mb-4">
            Ongoing Activities
          </h3>
          <div>
            {activities.map((activity, index) => (
              <div
                key={index}
                className="mb-4 p-4 bg-white shadow-lg rounded-lg border border-gray-300"
              >
                <h4 className="text-lg font-semibold text-blue-800">
                  {activity.title}
                </h4>
                <p className="text-gray-600">{activity.participants}</p>
                <p className="text-gray-500">{activity.location}</p>
                <img
                  src={activity.image}
                  alt={activity.title}
                  className="w-full mt-4 rounded-lg"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;

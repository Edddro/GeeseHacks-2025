import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TeamOutlined, FileTextOutlined, FireOutlined } from '@ant-design/icons';
import OtherBackgroundImage from '/assets/image.png';
import { Dumbbell, Gamepad2, Headphones, Paintbrush, Plus, Utensils } from 'lucide-react';

interface Feature {
  title: string;
  content: string;
  icon: JSX.Element;
}

const Home: React.FC = () => {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    fetch('/locations.json')
      .then((response) => response.json())
      .then((data) => {
        const shuffled = data.sort(() => 0.5 - Math.random());
        setEvents(shuffled.slice(0, 3));
      });
  }, []);

  const features: Feature[] = [
    {
      title: 'Find Friends',
      content: 'Discover people who share your interests and build meaningful connections.',
      icon: (
        <div className="flex items-center justify-center bg-gradient-to-r from-indigo-500 via-indigo-400 to-blue-300 text-white w-14 h-14 rounded-lg shadow-md">
          <TeamOutlined className="text-2xl" />
        </div>
      ),
    },
    {
      title: 'Meet Up',
      content: 'Plan and attend meetups with others to turn online friendships into real-life experiences.',
      icon: (
        <div className="flex items-center justify-center bg-gradient-to-r from-teal-500 via-teal-400 to-green-300 text-white w-14 h-14 rounded-lg shadow-md">
          <FileTextOutlined className="text-2xl" />
        </div>
      ),
    },
    {
      title: 'Profit',
      content: 'Earn achievements and rewards for every new connection you make.',
      icon: (
          <div className="flex items-center justify-center bg-gradient-to-r from-gray-700 to-gray-900 text-white w-14 h-14 rounded-lg shadow-md transition transform hover:scale-105 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-400">
            <FireOutlined className="text-2xl" />
          </div>
      ),
    },
  ];

  const handleIconClick = (iconName: string) => {
    console.log(`${iconName} button clicked`);
    window.location.href = '/';
  };
  const items = ['Friends', 'Study Buddies', 'Teammates', 'Mentors', 'Colleagues'];
  const randomItem = items[Math.floor(Math.random() * items.length)];

  return (
    <div>
      <div className="bg-gray-100">
        {/* Hero Section */}
        <div
          className="relative bg-cover bg-center text-white min-h-screen flex flex-col justify-center items-center text-center px-4"
          style={{ backgroundImage: `url(${OtherBackgroundImage})`, backgroundColor: 'rgba(0, 0, 0, 0.15)', backgroundBlendMode: 'darken' }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-indigo-400 via-indigo-300 to-blue-300 bg-clip-text text-transparent">Search. Filter. Connect.</span>
          </h1>
          <p className="text-xl md:text-2xl max-w-2xl mb-10">
            Meet people around you anytime, anywhere. Find friends, study buddies, and more.
          </p>
          <div className="flex space-x-4">
            <Link to="/map" className="bg-blue-700 text-white font-bold py-3 px-6 rounded-lg">
              View Map
            </Link>
            <Link to="/friends" className="bg-white text-blue-700 font-bold py-3 px-6 rounded-lg">
              Search for {randomItem}
            </Link>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div ref={contentRef} className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            Find Friends Because You Are a{' '}
            <span className="bg-gradient-to-r from-yellow-400 to-amber-400 px-2 py-1 rounded">
              Waterloo Student
            </span>
          </h2>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-10 m-16">
            {features.map((feature, index) => (
              <div key={index} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-800 rounded-xl blur opacity-45 group-hover:opacity-90 transition duration-1000"></div>
                <div
                  className="relative bg-white/95 backdrop-blur-sm rounded-xl p-6 flex flex-col items-start space-y-4 h-full transform transition duration-300 hover:scale-102 hover:shadow-md"
                >
                  {feature.icon}
                  <div>
                    <h3 className="text-xl font-semibold mb-2 bg-clip-text text-transparent bg-blue-800">
                      {feature.title}
                    </h3>
                    <p className="text-gray-700">{feature.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Statistics */}
          <div className="relative group mx-16">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-800 rounded-xl blur opacity-45 group-hover:opacity-90 transition duration-1000"></div>
            <div
              className="relative bg-white/95 backdrop-blur-sm rounded-xl p-4 flex justify-around transform transition duration-300 hover:scale-102 hover:shadow-md"
            >
              <div className="grid md:grid-cols-3 gap-16">
                <div className="text-center p-3">
                  <p className="text-4xl font-bold text-blue-800">42,439</p>
                  <p className="text-gray-600">Users</p>
                </div>
                <div className="text-center p-3">
                  <p className="text-4xl font-bold text-blue-800">246+</p>
                  <p className="text-gray-600">Friends Made</p>
                </div>
                <div className="text-center p-3">
                  <p className="text-4xl font-bold text-blue-800">1 day</p>
                  <p className="text-gray-600">And counting</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Icon Circle Section */}
      <div className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">
            Search by Interests
          </h2>
          <div className="flex justify-center space-x-8">
            <div className="flex flex-col items-center" onClick={() => handleIconClick('Food')}>
              <div className="border-2 border-black text-black w-16 h-16 rounded-full flex items-center justify-center">
                <Utensils className="text-2xl" />
              </div>
              <p className="mt-2">Food</p>
            </div>
            <div className="flex flex-col items-center" onClick={() => handleIconClick('Music')}>
              <div className="border-2 border-black text-black w-16 h-16 rounded-full flex items-center justify-center">
                <Headphones className="text-2xl" />
              </div>
              <p className="mt-2">Music</p>
            </div>
            <div className="flex flex-col items-center" onClick={() => handleIconClick('Games')}>
              <div className="border-2 border-black text-black w-16 h-16 rounded-full flex items-center justify-center">
                <Gamepad2 className="text-2xl" />
              </div>
              <p className="mt-2">Games</p>
            </div>
            <div className="flex flex-col items-center" onClick={() => handleIconClick('Fitness')}>
              <div className="border-2 border-black text-black w-16 h-16 rounded-full flex items-center justify-center">
                <Dumbbell className="text-2xl" />
              </div>
              <p className="mt-2">Fitness</p>
            </div>
            <div className="flex flex-col items-center" onClick={() => handleIconClick('Art')}>
              <div className="border-2 border-black text-black w-16 h-16 rounded-full flex items-center justify-center">
                <Paintbrush className="text-2xl" />
              </div>
              <p className="mt-2">Art</p>
            </div>
            <div className="flex flex-col items-center" onClick={() => handleIconClick('More')}>
              <div className="border-2 border-black text-black w-16 h-16 rounded-full flex items-center justify-center">
                <Plus className="text-2xl" />
              </div>
              <p className="mt-2">More</p>
            </div>
          </div>
        </div>
          {/* Activities Section */}
      <div className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-16">Top Trending Near Me 🔥</h2>
        <div className="flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {events.map((events, idx) => (
                <div key={idx} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <img
                    src={events.image}
                    alt={events.title}
                    className="w-full h-36 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800">{events.title}</h3>
                    <p className="text-gray-600">{events.participants}</p>
                    <p className="text-gray-600">{events.location}</p>
                  </div>
                </div>
              ))}
              </div>
              </div>
              </div>
      </div>
      </div>
    </div>
  );
};

export default Home;
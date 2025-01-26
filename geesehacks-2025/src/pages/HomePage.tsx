  import React, { useRef } from 'react';
  import { Link } from 'react-router-dom';
  import { TeamOutlined, FileTextOutlined, FireOutlined } from '@ant-design/icons';
  import OtherBackgroundImage from '../assets/image.png';

  interface Feature {
    title: string;
    content: string;
    icon: JSX.Element;
  }

  const Home: React.FC = () => {
    const contentRef = useRef<HTMLDivElement | null>(null);

    const features: Feature[] = [
      {
        title: 'Find Friends',
        content: 'Y\'all waterloo students lonely asf',
        icon: (
          <div className="flex items-center justify-center bg-gradient-to-r from-indigo-500 via-indigo-400 to-blue-300 text-white w-14 h-14 rounded-lg shadow-md">
            <TeamOutlined className="text-2xl" />
          </div>
        ),
      },
      {
        title: 'Meet Up',
        content: 'Access explanations, test files, and multiple approaches to solve CCC problems dating back to 1996.',
        icon: (
          <div className="flex items-center justify-center bg-gradient-to-r from-teal-500 via-teal-400 to-green-300 text-white w-14 h-14 rounded-lg shadow-md">
            <FileTextOutlined className="text-2xl" />
          </div>
        ),
      },
      {
        title: 'Profit',
        content: 'get new achievements for your actions',
        icon: (
            <div className="flex items-center justify-center bg-gradient-to-r from-gray-700 to-gray-900 text-white w-14 h-14 rounded-lg shadow-md transition transform hover:scale-105 hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-400">
              <FireOutlined className="text-2xl" />
            </div>
        ),
      },
    ];

    return (
      <div>
        <div className="bg-gray-100">
          {/* Hero Section */}
          <div
            className="relative bg-cover bg-center text-white min-h-screen flex flex-col justify-center items-center text-center px-4"
            style={{ backgroundImage: `url(${OtherBackgroundImage})` }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              The <span className="bg-gradient-to-r from-indigo-400 via-indigo-300 to-blue-300 bg-clip-text text-transparent">most comprehensive</span> friend repository
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl mb-10">
              Find <span className="font-bold">detailed friends</span> to the Waterloo Friend Competition, all in one place
            </p>
            <div className="flex space-x-4">
              <Link to="/solutions" className="bg-blue-700 text-white font-bold py-3 px-6 rounded-lg">
                Explore Solutions
              </Link>
              <Link to="/forum" className="bg-white text-blue-700 font-bold py-3 px-6 rounded-lg">
                Visit Forum
              </Link>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div ref={contentRef} className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16">
              Find Friends{' '}
              <span className="bg-gradient-to-r from-yellow-400 to-amber-400 px-2 py-1 rounded">
                Because you're a waterloo student
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
                    <p className="text-4xl font-bold text-blue-800">N/A</p>
                    <p className="text-gray-600">Users</p>
                  </div>
                  <div className="text-center p-3">
                    <p className="text-4xl font-bold text-blue-800">200+</p>
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
      </div>
    );
  };

  export default Home;

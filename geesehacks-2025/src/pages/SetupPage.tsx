import React, { useState } from 'react';

const Setup = () => {
  const [formData, setFormData] = useState({
    name: '',
    year: '',
    major: '',
    campusLocation: '',
    interests: [],
    lookingFor: [],
    classes: '',
    hobbies: ''
  });

  const campusLocations = [
    'MC (Mathematics & Computer)',
    'E7 (Engineering 7)',
    'DC (Davis Centre)',
    'SLC (Student Life Centre)',
    'Other'
  ];

  const interestOptions = [
    'Coding', 'Gaming', 'Sports', 'Music', 'Art',
    'Hiking', 'Photography', 'Reading', 'Cooking'
  ];

  const lookingForOptions = [
    'Study Buddies', 'Hangout Friends',
    'Career Networking', 'Hobby Partners'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-xl">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-800">
        Find Your Waterloo Crew
      </h1>

      <div className="space-y-6">
        {/* Personal Details */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Your name"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Year of Study</label>
            <select
              name="year"
              value={formData.year}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="">Select year</option>
              {['1st Year', '2nd Year', '3rd Year', '4th Year', 'Graduate', 'Other'].map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Academic Details */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-2 text-sm font-medium">Major</label>
            <input
              type="text"
              name="major"
              value={formData.major}
              onChange={handleInputChange}
              placeholder="e.g., Computer Science"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Campus Location</label>
            <select
              name="campusLocation"
              value={formData.campusLocation}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="">Select campus area</option>
              {campusLocations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Interests */}
        <div>
          <label className="block mb-2 text-sm font-medium">Interests</label>
          <div className="grid md:grid-cols-3 gap-2">
            {interestOptions.map(interest => (
              <div key={interest} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={`interest-${interest}`}
                  checked={formData.interests.includes(interest)}
                  onChange={() => handleCheckboxChange('interests', interest)}
                  className="mr-2"
                />
                <label htmlFor={`interest-${interest}`}>{interest}</label>
              </div>
            ))}
          </div>
        </div>

        {/* What Are You Looking For */}
        <div>
          <label className="block mb-2 text-sm font-medium">Looking For</label>
          <div className="grid md:grid-cols-2 gap-2">
            {lookingForOptions.map(option => (
              <div key={option} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id={`lookingFor-${option}`}
                  checked={formData.lookingFor.includes(option)}
                  onChange={() => handleCheckboxChange('lookingFor', option)}
                  className="mr-2"
                />
                <label htmlFor={`lookingFor-${option}`}>{option}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Details */}
        <div>
          <label className="block mb-2 text-sm font-medium">Current Classes</label>
          <input
            type="text"
            name="classes"
            value={formData.classes}
            onChange={handleInputChange}
            placeholder="e.g., CS 241, MATH 137"
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium">Hobbies & Extra Details</label>
          <input
            type="text"
            name="hobbies"
            value={formData.hobbies}
            onChange={handleInputChange}
            placeholder="Tell us more about yourself"
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <button
          type="button"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Find My Crew
        </button>
      </div>
    </div>
  );
};

export default WaterlooFriendFinder;
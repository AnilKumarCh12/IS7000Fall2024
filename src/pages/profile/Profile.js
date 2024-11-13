import React, { useState } from 'react';
import CommunicationPreferences from './CommunicationPreferences';

function Profile() {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-gray-700">Profile Page</h1>

      <div className="w-full max-w-2xl">
        <div className="flex space-x-4 mb-4 border-b">
          <button
            className={`py-2 px-4 ${activeTab === 'profile' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'}`}
            onClick={() => setActiveTab('profile')}
          >
            Profile Info
          </button>
          <button
            className={`py-2 px-4 ${activeTab === 'preferences' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'}`}
            onClick={() => setActiveTab('preferences')}
          >
            Communication Preferences
          </button>
        </div>

        {activeTab === 'profile' && (
          <div className="bg-white shadow-lg p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Profile Information</h2>
            <p className="text-gray-600 mb-2">Name: Sampath</p>
            <p className="text-gray-600 mb-2">Email: sampath@gmail.com</p>
            <p className="text-gray-600">Subscription Plan: Premium</p>
          </div>
        )}

        {activeTab === 'preferences' && (
          <CommunicationPreferences />
        )}
      </div>
    </div>
  );
}

export default Profile;

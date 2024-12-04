// BatchesList.js

import React, { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setAuthToken } from "./AuthToken"; // Import the setAuthToken function

const BatchesList = () => {
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  // Fetch the token (from localStorage using the 'id_token' variable name)
  const token = localStorage.getItem("id_token");

  // Set the token using the setAuthToken function
  useEffect(() => {
    if (token) {
      setAuthToken(token); // Set the token for all subsequent API requests
    }
  }, [token]);

  // Function to fetch data from the API
  const fetchBatches = async () => {
    try {
      const response = await axios.get(
        "http://3.218.8.102/api/batches?page=0&size=20&sort=id,asc"
      );
      console.log("API Response:", response.data); // Log the response for debugging
      setBatches(response.data); // Set the data directly if it is an array
      setLoading(false);
    } catch (err) {
      console.error("Error fetching batches:", err.response || err.message);
      setError("Failed to fetch data. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBatches();
  }, []);

  const handleRefresh = () => {
    fetchBatches();
  };

  return (
    <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 min-h-screen p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Batches</h1>
      <div className="flex justify-end mb-4">
        <button
          onClick={handleRefresh}
          className="flex items-center bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded mr-2"
        >
          🔄 Refresh
        </button>
        <button
          onClick={() => navigate("/create-job")}
          className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded"
        >
          + Create Job
        </button>
      </div>
      <div className="bg-blue-800 p-6 rounded-lg shadow-lg">
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
          <table className="table-auto w-full text-left">
            <thead className="bg-blue-700 text-white">
              <tr>
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Job</th>
                <th className="px-4 py-2">Run Date</th>
                <th className="px-4 py-2">Batch Status</th>
                <th className="px-4 py-2">User</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {batches.length > 0 ? (
                batches.map((batch, index) => (
                  <tr
                    key={batch.id}
                    className={
                      index % 2 === 0 ? "bg-blue-600" : "bg-blue-500"
                    }
                  >
                    <td className="px-4 py-2">{batch.id}</td>
                    <td className="px-4 py-2">{batch.name}</td>
                    <td className="px-4 py-2">{batch.job}</td>
                    <td className="px-4 py-2">{batch.rundate}</td>
                    <td className="px-4 py-2">{batch.status}</td>
                    <td className="px-4 py-2">{batch.user}</td>
                    <td className="px-4 py-2 flex space-x-2">
                      <button
                        onClick={() => navigate(`/batch/${batch.id}`)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                      >
                        <FaEye className="inline mr-2" /> View
                      </button>
                      <button
                        onClick={() => console.log(`Edit batch: ${batch.id}`)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded flex items-center"
                      >
                        <FaEdit className="mr-2" /> Edit
                      </button>
                      <button
                        onClick={() => console.log(`Delete batch: ${batch.id}`)}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded flex items-center"
                      >
                        <FaTrash className="mr-2" /> Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="text-center py-4 text-gray-300 italic"
                  >
                    No batches available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default BatchesList;

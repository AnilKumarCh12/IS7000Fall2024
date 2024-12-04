import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const BatchDetails = () => {
  const { id } = useParams(); // Get the ID from the URL
  const navigate = useNavigate();

  // Mock data (replace with actual data fetching logic)
  const batches = [
    { id: 2, name: "vibration sadly", job: "toward range", rundate: "20/11/2024", status: "RUNNING", user: "" },
    // Add other batches as needed
  ];

  // Find the batch by ID
  const batch = batches.find((b) => b.id === parseInt(id, 10));

  if (!batch) {
    return <div>Batch not found!</div>;
  }

  return (
    <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 min-h-screen p-6 text-white">
      <h1 className="text-3xl font-bold mb-4">Batch</h1>
      <div className="bg-blue-800 p-6 rounded-lg shadow-lg">
        <p><strong>ID:</strong> {batch.id}</p>
        <p><strong>Name:</strong> {batch.name}</p>
        <p><strong>Job:</strong> {batch.job}</p>
        <p><strong>Run Date:</strong> {batch.rundate}</p>
        <p><strong>Batch Status:</strong> {batch.status}</p>
        <p><strong>User:</strong> {batch.user}</p>
        <div className="flex space-x-4 mt-4">
          <button
            onClick={() => navigate(-1)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Back
          </button>
          <button
            onClick={() => alert("Edit functionality not implemented yet!")}
            className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded"
          >
            Edit
          </button>
        </div>
      </div>
      <footer className="mt-8 text-center text-sm">This is your footer</footer>
    </div>
  );
};

export default BatchDetails;

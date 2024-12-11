import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // For navigation
import { FaEdit, FaTrash } from 'react-icons/fa'; // For icons
import { apiUrl } from './Api';
import { setAuthToken } from './AuthToken';

const BatchData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(0); // Current page state
  const [totalPages, setTotalPages] = useState(0); // Total pages state
  const navigate = useNavigate(); // Navigation hook
  const pageSize = 10; // Number of items per page

  const apiUrl = 'http://3.218.8.102/api/batches?page=${currentPage}&size=${pageSize}20&sort=id,asc';
  const bearerToken = setAuthToken;
    
  // Function to fetch data
  const fetchData = async () => {
    try {
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      });
      setData(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  // Function to handle refresh
  const handleRefresh = () => {
    setLoading(true);
    fetchData();
  };
  const handlePageChange = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) {
      setCurrentPage(newPage);
    }
  };
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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
          onClick={() => navigate('/create-job')}
          className="bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded"
        >
          + Create Job
        </button>
      </div>

      <div className="bg-blue-800 p-6 rounded-lg shadow-lg">
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
            {data.map((batch, index) => (
              <tr
                key={batch.id}
                className={index % 2 === 0 ? 'bg-blue-600' : 'bg-blue-500'}
              >
                <td className="px-4 py-2">{batch.id}</td>
                <td className="px-4 py-2">{batch.name}</td>
                <td className="px-4 py-2">{batch.job}</td>
                <td className="px-4 py-2">{batch.rundate}</td>
                <td className="px-4 py-2">{batch.batchstatus}</td>
                <td className="px-4 py-2">
                  {batch.user
                    ? batch.user.login // Adjust this to display the desired user property
                    : 'N/A'}
                </td>
                <td className="px-4 py-2 flex space-x-2">
                  <button
                    onClick={() => navigate(`/batch/${batch.id}`)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                  >
                    View
                  </button>
                  <button
                    onClick={() => navigate(`/update-job/${batch.id}`)} // Navigate to update page
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded flex items-center"
                  >
                    <FaTrash className="mr-2" /> Edit
                  </button>
                  <button
                    onClick={() => navigate(`/delete-job/${batch.id}`)} // Navigate to delete page
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded flex items-center"
                  >
                    <FaTrash className="mr-2" /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center items-center mt-4 space-x-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 0}
          className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-white">Page {currentPage + 1} of {totalPages}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages - 1}
          className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BatchData;

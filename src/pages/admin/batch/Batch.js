import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

function Batch() {
  const [jobs, setJobs] = useState([
    { id: 1, title: 'Update Website Banner', description: 'Change homepage banner for promotions' },
    { id: 2, title: 'Fix Broken Links', description: 'Check and fix broken links on the website' },
    { id: 3, title: 'Content Moderation', description: 'Review and approve user-generated content' },
    { id: 4, title: 'Database Backup', description: 'Perform a full database backup' },
    { id: 5, title: 'Email Campaign', description: 'Set up monthly newsletter' }
  ].map(job => ({ ...job, status: 'Pending' }))); // Automatically set default status

  const updateStatus = (id, newStatus) => {
    setJobs(jobs.map(job => job.id === id ? { ...job, status: newStatus } : job));
  };

  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;

  // Calculate the total number of pages
  const totalPages = Math.ceil(jobs.length / jobsPerPage);

  // Get current jobs to display
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  // Function to change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className='text-white flex flex-col items-center w-full h-screen p-8 bg-pink-400'>
      {/* Align the heading and list together */}
      <div className='w-full max-w-3xl'>
        <h2 className='text-3xl font-semibold mb-6 text-center'>Manage Your Tasks</h2>
        <table className='table-auto bg-white text-black w-3/4 shadow-lg rounded-lg'>
        <thead>
          <tr className='bg-gray-800 text-white'>
            <th className='py-2 px-4'>#</th>
            <th className='py-2 px-4'>Task</th>
            <th className='py-2 px-4'>Status</th>
            <th className='py-2 px-4'>Update Status</th>
          </tr>
        </thead>
        <tbody> 
        {jobs.map((job, index) => (
            <tr key={job.id} className='border-b'>
              {/* Index */}
              <td className='py-3 px-4 text-center'>{index + 1}</td>

              {/* Task Details */}
              <td className='py-3 px-4'>
                <span className='font-semibold'>{job.title}</span>: {job.description}
              </td>

              {/* Status */}
              <td className={`py-3 px-4 text-center ${job.status === 'Completed' ? 'text-green-600' : job.status === 'In Progress' ? 'text-yellow-600' : 'text-red-600'}`}>
                {job.status}
              </td>

              {/* Update Status Buttons */}
              <td className='py-3 px-4 flex justify-center space-x-4'>
                <button
                  onClick={() => updateStatus(job.id, 'Completed')}
                  className='bg-green-600 hover:bg-green-500 text-white py-1 px-3 rounded'
                >
                  Complete
                </button>
                <button
                  onClick={() => updateStatus(job.id, 'In Progress')}
                  className='bg-yellow-600 hover:bg-yellow-500 text-white py-1 px-3 rounded'
                >
                  In Progress
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        </table>
        <div className='flex space-x-4 mt-8'>
        {Array.from({ length: totalPages }, (_, index) => (
          <><><button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`py-2 px-4 rounded ${currentPage === index + 1 ? 'bg-blue-600 text-white' : 'bg-gray-300 text-black'}`}
          >
            {index + 1}
          </button><button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className={`py-2 px-5 rounded-md transition-colors duration-300 ${
              currentPage === 1
                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            }`}
          >
              Previous
            </button></><button
              onClick={handleNext}
              disabled={currentPage === totalPages}
              className={`py-2 px-5 rounded-md transition-colors duration-300 ${
                currentPage === totalPages
                  ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                  : 'bg-blue-500 text-white hover:bg-blue-600'




              }`}
            >
              Next
            </button></>
        ))}

      </div>
      </div>
    </div>
  );
}

export default Batch;

import React from 'react';

function Users() {
  const users = [
    { id: 1, name: 'David', email: 'david@example.com' },
    { id: 2, name: 'Heinz', email: 'heinz@example.com' },
    { id: 3, name: 'Charlie', email: 'charlie@example.com' },
  ];

  return (
    <div className="bg-pink-500 min-h-screen flex flex-col items-center py-10">
      <h3 className="text-2xl font-bold text-white mb-6">Registered Users</h3>
      <ul className="bg-white shadow-md rounded-lg p-6 w-full max-w-md space-y-4">
        {users.map((user) => (
          <li
            key={user.id}
            className="p-4 border-b last:border-b-0 border-gray-200"
          >
            <p className="font-bold text-lg text-gray-800">{user.name}</p>
            <p className="text-sm text-gray-600">{user.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users;

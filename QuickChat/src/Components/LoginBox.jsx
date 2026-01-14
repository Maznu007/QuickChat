import React from "react";

export default function LoginBox({ selectedUser, setSelectedUser, handleLogin }) {
  return (
    <div className="w-full max-w-sm bg-white border border-gray-300 rounded-xl shadow-md p-6 space-y-4 text-center">
      <h1 className="text-xl mb-4">🗨️ QuickChat</h1>
      <p className="text-sm text-gray-600">Select a user to log in</p>

      <select
        value={selectedUser}
        onChange={(e) => setSelectedUser(e.target.value)}
        className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="Bacchu">Bacchu</option>
        <option value="Rahul">Rahul</option>
      </select>

      <button onClick={handleLogin} className="gradient-btn">
        Login →
      </button>
    </div>
  );
}
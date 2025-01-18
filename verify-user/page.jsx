"use client";
import React from "react";
import Link from "next/link"; 
const VerifyUser = () => {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold mb-6">Verify User</h2>
      <table className="w-full border-collapse bg-primary text-text">
        <thead className="bg-secondary text-primary">
          <tr>
            <th className="p-4 text-left">#</th>
            <th className="p-4 text-left">User Name</th>
            <th className="p-4 text-left">Email</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-accent">
            <td className="p-4">1</td>
            <td className="p-4">John Doe</td>
            <td className="p-4">johndoe@example.com</td>
            <td className="p-4">Pending</td>
            <td className="p-4">
              <button className="px-4 py-2 bg-secondary text-primary rounded hover:bg-accent">
                Verify
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default VerifyUser;
"use client";
import React,{useState} from "react";
; 
import Link from "next/link"; 

const Land = () => {
  
  return (
    <div className="h-screen flex bg-background text-text">
      {/* Sidebar */}
      
      {/* Main Content */}
      <main className="flex-1 p-8">
        <h2 className="text-3xl font-bold mb-6">Verify Land</h2>
        <table className="w-full border-collapse bg-primary text-text">
          <thead className="bg-secondary text-primary">
            <tr>
              <th className="p-4 text-left">#</th>
              <th className="p-4 text-left">Owner Address</th>
              <th className="p-4 text-left">Area</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">PID</th>
              <th className="p-4 text-left">SurveyNo.</th>
              <th className="p-4 text-left">Document</th>
              <th className="p-4 text-left">Verify</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-accent">
              <td className="p-4">1</td>
              <td className="p-4 truncate">0x32fd21181bf4ca...</td>
              <td className="p-4">Pune, Maharashtra, India</td>
              <td className="p-4">500000</td>
              <td className="p-4">123</td>
              <td className="p-4">101</td>
              <td className="p-4 text-accent">
                <a href="#" className="hover:underline">
                  View Document
                </a>
              </td>
              <td className="p-4">
                <button className="px-4 py-2 bg-secondary text-primary rounded hover:bg-accent">
                  Verify
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default Land;
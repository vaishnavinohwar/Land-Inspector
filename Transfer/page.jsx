"use client";
import jsPDF from "jspdf";
import Link from "next/link"; 
import { useState, useRef, useEffect } from "react";

export default function Home() {
  const [sellerPhoto, setSellerPhoto] = useState(null);
  const [buyerPhoto, setBuyerPhoto] = useState(null);
  const [witnessPhoto, setWitnessPhoto] = useState(null);

  const [witnessName, setWitnessName] = useState(""); 
  const [witnessAge, setWitnessAge] = useState("");
  const [witnessAddress, setWitnessAddress] = useState("");
  
  const sellerVideoRef = useRef(null);
  const buyerVideoRef = useRef(null);
  const witnessVideoRef = useRef(null);
  const sellerCanvasRef = useRef(null);
  const buyerCanvasRef = useRef(null);
  const witnessCanvasRef = useRef(null);


  const [isWitnessInfoFilled, setIsWitnessInfoFilled] = useState(false);

  const handleTransfer = () => {
    setIsTransferred(true);
  };

  const handleWitnessInfoChange = () => {
    // Check if all witness fields are filled
    if (witnessName && witnessAge && witnessAddress) {
      setIsWitnessInfoFilled(true);
    } else {
      setIsWitnessInfoFilled(false);
    }
  };


  const [isTransferred, setIsTransferred] = useState(false);
  const [nameError, setNameError] = useState(false);

 

  // Function to start the camera and display the live feed
  const startCamera = async (videoRef) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  // Function to capture photo
  const capturePhoto = (videoRef, canvasRef, setPhoto) => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      if (context) {
        context.drawImage(videoRef.current, 0, 0, 150, 150);
        const photo = canvasRef.current.toDataURL("image/png");
        setPhoto(photo);
      } else {
        console.error("Canvas context is not available.");
      }
    } else {
      console.error("Error: Video or Canvas ref is missing.");
    }
  };
  const [ageError, setAgeError] = useState(false);


  // Start the seller's camera feed when the component mounts
  useEffect(() => {
    if (sellerVideoRef.current && !sellerPhoto) {
      startCamera(sellerVideoRef);
    }
  }, [sellerPhoto]);

  // Start the buyer's camera feed only after the seller's photo is captured
  useEffect(() => {
    if (buyerVideoRef.current && sellerPhoto && !buyerPhoto) {
      startCamera(buyerVideoRef);
    }
  }, [sellerPhoto, buyerPhoto]);

  // Start the witness's camera feed only after the buyer's photo is captured
  useEffect(() => {
    if (witnessVideoRef.current && buyerPhoto && !witnessPhoto) {
      startCamera(witnessVideoRef);
    }
  }, [buyerPhoto, witnessPhoto]);

   // Function to generate the PDF
   const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Ownership Transfer Document", 20, 20);

    doc.setFontSize(12);
    doc.text("Seller Information:", 20, 40);
    doc.text(`Name: Saurabh Waghmare`, 20, 50);
    doc.text(`Age: 22`, 20, 60);
    doc.text(`City: Pune, Maharashtra, India`, 20, 70);
    doc.text(`Wallet Address: 0x32FD...`, 20, 80);

    doc.text("Buyer Information:", 20, 100);
    doc.text(`Name: Zaid`, 20, 110);
    doc.text(`Age: 22`, 20, 120);
    doc.text(`City: Pune, Maharashtra, India`, 20, 130);
    doc.text(`Wallet Address: 0xAB12...`, 20, 140);

    doc.text("Witness Information:", 20, 160);
    doc.text(`Name: Witness Name`, 20, 170); // Update dynamically if needed
    doc.text(`Age: Witness Age`, 20, 180); // Update dynamically if needed
    doc.text(`Address: Witness Address`, 20, 190); // Update dynamically if needed

    doc.text("Land Information:", 20, 210);
    doc.text(`Owner Address: 0x32FD211B1Bf4CAF24D8974E25460198cf41DC`, 20, 220);
    doc.text(`Area: 1000 sqft`, 20, 230);
    doc.text(`PID: 123`, 20, 240);
    doc.text(`Survey No.: 101`, 20, 250);
    doc.text(`Price: 500000`, 20, 260);

    doc.save("Ownership_Transfer_Document.pdf");
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-background">
      <div className="bg-primary p-8 rounded-lg shadow-lg w-full max-w-5xl">
        <h1 className="text-2xl font-bold text-center mb-6">Transfer Ownership</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
           {/* Seller Profile */}
           <div className="p-6 bg-background rounded-lg shadow-md">
            <h2 className="text-accent font-semibold text-lg mb-4">Seller Profile</h2>
            {sellerPhoto ? (
              <img src={sellerPhoto} alt="Seller" className="w-40 h-40 rounded-lg mb-4" />
            ) : (
              <div className="w-40 h-40 bg-gray-300 flex items-center justify-center rounded-lg mb-4">
                <video
                  ref={sellerVideoRef}
                  width="150"
                  height="150"
                  className="w-40 h-40"
                  style={{ objectFit: "cover" }}
                />
              </div>
            )}
            <button
              onClick={() => capturePhoto(sellerVideoRef, sellerCanvasRef, setSellerPhoto)}
              className="bg-green-500 text-white py-2 px-4 rounded"
            >
              Capture Seller Photo
            </button>
            <div className="space-y-2 mt-6">
              <p>Wallet Address: <span className="text-secondary">0x32FD...</span></p>
              <p>Name: <span className="text-secondary">Saurabh Waghmare</span></p>
              <p>Age: <span className="text-secondary">22</span></p>
              <p>City: <span className="text-secondary">Pune, Maharashtra, India</span></p>
              <p>Aadhaar: <span className="text-secondary">123412341234</span></p>
              <p>Pan: <span className="text-secondary">ABC1234123</span></p>
            </div>
          </div>

           {/* Buyer Profile */}
           <div className="p-6 bg-background rounded-lg shadow-md">
            <h2 className="text-accent font-semibold text-lg mb-4">Buyer Profile</h2>
            
            {buyerPhoto ? (
              <img src={buyerPhoto} alt="Buyer" className="w-40 h-40 rounded-lg mb-4" />
            ) : (
              <div className="w-40 h-40 bg-gray-300 flex items-center justify-center rounded-lg mb-4">
                <video
                  ref={buyerVideoRef}
                  width="150"
                  height="150"
                  className="w-40 h-40"
                  style={{ objectFit: "cover" }}
                />
              </div>
            )}
           
            <button
              onClick={() => capturePhoto(buyerVideoRef, buyerCanvasRef, setBuyerPhoto)}
              className="bg-green-500 text-white py-2 px-4 rounded"
            >
              Capture Buyer Photo
            </button>
            <div className="space-y-2 mt-6">
              <p>Wallet Address: <span className="text-secondary">0xAB12...</span></p>
              <p>Name: <span className="text-secondary">Zaid</span></p>
              <p>Age: <span className="text-secondary">22</span></p>
              <p>City: <span className="text-secondary">Pune, Maharashtra, India</span></p>
              <p>Aadhaar: <span className="text-secondary">123412341234</span></p>
              <p>Pan: <span className="text-secondary">ABC1234123</span></p>
            </div>
          </div>

          {/* Land Info */}
          <div className="p-6 bg-background rounded-lg shadow-md">
            <h2 className="text-accent font-semibold text-lg mb-4">Land Info</h2>
            <div className="space-y-2">
              <p>Owner Address: <span className="text-secondary">0x32FD211B1Bf4CAF24D8974E25460198cf41DC</span></p>
              <p>Area: <span className="text-secondary">1000sqft</span></p>
              <p>PID: <span className="text-secondary">123</span></p>
              <p>Survey No.: <span className="text-secondary">101</span></p>
              <p>Address: <span className="text-secondary">Pune, Maharashtra, India</span></p>
              <p>Price: <span className="text-secondary">500000</span></p>
              <a href="#" className="text-accent underline">View Document</a>
            </div>
          </div>

          
          {/* Enter Witness Info */}
          <div className="p-6 rounded-lg shadow-md">
            <h2 className="text-accent font-semibold text-lg mb-4">Enter Witness Info</h2>
           
            {witnessPhoto ? (
              <img
                src={witnessPhoto}
                alt="Witness"
                className="w-40 h-40 rounded-lg mb-4"
              />
            ) : (
              <div className="w-40 h-40 bg-gray-300 flex items-center justify-center rounded-lg mb-4">
                <video
                  ref={witnessVideoRef}
                  width="150"
                  height="150"
                  className="w-40 h-40"
                  style={{ objectFit: "cover" }}
                />
              </div>
            )}
          
          <button
            onClick={() => capturePhoto(witnessVideoRef, witnessCanvasRef, setWitnessPhoto)}
            className="bg-green-500 text-white py-2 px-4 rounded"
          >
            Capture Witness Photo
          </button>
            
            <div className="space-y-2 mt-6">
              <input
                type="text"
                placeholder="Name"
                value={witnessName}
                onChange={(e) => {
                    const value = e.target.value;
                    if (/^[a-zA-Z\s'-]*$/.test(value)) { // Allow letters, spaces, apostrophes, and hyphens
                      setWitnessName(value); // Update name if valid
                      setNameError(false); // Clear any error
                    } else {
                      setNameError(true); // Show error for invalid input
                    }
                    handleWitnessInfoChange(); // Check if all fields are filled
                  }}
                  className={`w-full p-2 border rounded-lg text-black ${
                    nameError ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {nameError && (
                  <p className="text-red-500 text-sm mt-1">
                    Please enter a valid name (letters, spaces, apostrophes, and hyphens only).
                  </p>
                )}
              <input
                type="text"
                placeholder="Age"
                value={witnessAge}
                onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value)) {
                      setWitnessAge(value); // Allow only numeric values
                      setAgeError(false); // Clear any error
                    } else {
                      setAgeError(true); // Show error for invalid input
                    }
                    handleWitnessInfoChange(); // Check if all fields are filled
                  }}
                  className={`w-full p-2 border rounded-lg text-black ${
                    ageError ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {ageError && (
                  <p className="text-red-500 text-sm mt-1">
                    Please enter a valid age (numeric only).
                  </p>
                )}
              <input
                type="text"
                placeholder="Address"
                value={witnessAddress}
              onChange={(e) => { setWitnessAddress(e.target.value); handleWitnessInfoChange(); }}
                className="w-full p-2 border border-gray-300 rounded-lg text-black"
              />

                
            </div>
          </div>
          {/* Hidden Canvases */}
          <div className="hidden">
            <canvas ref={sellerCanvasRef} width="150" height="150"></canvas>
            <canvas ref={buyerCanvasRef} width="150" height="150"></canvas>
            <canvas ref={witnessCanvasRef} width="150" height="150"></canvas>
          </div>
           
            </div>
           {/* to transfer ownership and download pdf */}
<div className="flex flex-col items-center justify-center mt-6">
  {/* The download button will be enabled only after transfer */}
  {isTransferred && (
    <button 
      onClick={generatePDF}
      className="bg-blue-500 text-white py-2 px-4 rounded mb-4"
    >
      Download Ownership Transfer Document
    </button>
  )}

  {isTransferred && (
    <p className="mb-4 text-lg font-semibold text-green-600">
      Successfully Transferred
    </p>
  )}

<button
  onClick={handleTransfer}
  className={`px-6 py-3 font-bold text-white rounded-lg mt-4 ${
    isWitnessInfoFilled && sellerPhoto && buyerPhoto && witnessPhoto && !isTransferred
      ? "bg-green-500 hover:bg-green-600"
      : "bg-gray-400 cursor-not-allowed"
  }`}
  disabled={!(isWitnessInfoFilled && sellerPhoto && buyerPhoto && witnessPhoto && !isTransferred)}
>
  {isTransferred ? "Ownership Transferred" : "Transfer"}
</button>


</div>

      </div>
      </div>
    
  );
  }
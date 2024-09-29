import React, { useState } from 'react';
import Tesseract from 'tesseract.js';
import { motion } from 'framer-motion';
import axios from 'axios';

async function addBlock(blockData) {
  try {
    // Make the POST request
    const response = await axios.post('http://192.168.247.170:3000/api/blockchain/verify-data', blockData);
    console.log('Block added successfully:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error adding block:', error.message);
    return "Document is Invalid";
  }
}

const UploadDocument = () => {
  const [documentType, setDocumentType] = useState('');
  const [documentFile, setDocumentFile] = useState(null);
  const [message, setMessage] = useState('');
  const [result, setResult] = useState(null);
  const [apiResponse, setApiResponse] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!documentFile) {
      setMessage('Please select a file before submitting');
      return;
    }

    // Create an object URL for the selected file
    const image = URL.createObjectURL(documentFile);

    try {
      // Perform OCR using Tesseract.js
      const { data: { text } } = await Tesseract.recognize(
        image,
        'eng+guj',
        { logger: info => console.log(info) }
      );

      // Extract information from the OCR result
      const lines = text.trim().split('\n');
      const name = lines[2]?.trim() || "Name not found";

      const dobPattern = /DOB\s*:\s*(\d{2}\/\d{2}\/\d{4})/;
      const genderPattern = /(Male|Female)/i;
      const aadharPattern = /(\d{4}\s\d{4}\s\d{4})/;

      const dobMatch = dobPattern.exec(text);
      const genderMatch = genderPattern.exec(text);
      const aadharMatch = aadharPattern.exec(text);

      const data = {
        name,
        dob: dobMatch ? dobMatch[1] : "DOB not found",
        gender: genderMatch ? genderMatch[1] : "Gender not found",
        aadhar: aadharMatch ? aadharMatch[1] : "Aadhaar not found"
      };

      setResult(data);

      setMessage('Document processed successfully!');

      const blockData = {
        document_content: {
          aadhar_number: data.aadhar
        }
      };

      // Add the block and get the response
      const apiResult = await addBlock(blockData);
      setApiResponse(apiResult);

    } catch (err) {
      console.error('Error processing document:', err);
      setMessage('Error processing document');
    }
  };

  return (
    <div className="relative bg-gray-50 min-h-screen py-12 px-6 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-md"
        style={{ backgroundImage: 'url("")' }}
      ></div>
      <div className="relative z-10 max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg opacity-90">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Verify Document</h2>
        {message && <p className={`mb-4 p-3 rounded-md text-center ${message.includes('Error') ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>{message}</p>}
        
        <motion.form 
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          <div>
            <label htmlFor="documentType" className="block text-gray-700 text-sm font-semibold mb-2">
              Document Type
            </label>
            <select
              className="form-select block w-full mt-1 border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
              id="documentType"
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
              required
            >
              <option value="" disabled>Select Document Type</option>
              <option>Aadhar Card</option>
              <option>PAN Card</option>
              <option>driving license</option>
            </select>
          </div>

          <div>
            <label htmlFor="documentFile"  className="block text-gray-700 text-sm font-semibold mb-2">
              Upload File
            </label>
            <input
              type="file"
              className="block text-gray-700 text-sm font-semibold mb-2"
              id="documentFile"
              onChange={(e) => setDocumentFile(e.target.files[0])}
              required
            />
          </div>

          <motion.button 
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-md shadow-none hover:bg-blue-600 transition-transform transform-gpu"
            whileHover={{ scale: 1.05 }}
          >
            Submit
          </motion.button>
        </motion.form>

        {result && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold">Extracted Details</h3>
            <p><strong>Name:</strong> {result.name}</p>
            <p><strong>Aadhaar Number:</strong> {result.aadhar}</p>
          </div>
        )}

        {apiResponse && (
          <div className="mt-6">
            <h3 className="text-xl font-semibold">Block Data</h3>
            <pre className="bg-gray-100 p-4 rounded-md">{JSON.stringify(apiResponse, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadDocument;

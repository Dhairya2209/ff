// {//} ocr-module.js
// const Tesseract = require('tesseract.js');
// const fs = require('fs');

// module.exports = {
//   async processImage(imagePath) {
//     try {
//       const result = await Tesseract.recognize(
//         imagePath,
//         'eng+guj',
//         { logger: info => console.log(info) }
//       );
      
//       const { data: { text } } = result;
//       const lines = text.trim().split('\n');
//       const name = lines[2]?.trim() || "Name not found";

//       const dobPattern = /DOB\s*:\s*(\d{2}\/\d{2}\/\d{4})/;
//       const genderPattern = /(Male|Female)/i;
//       const aadharPattern = /(\d{4}\s\d{4}\s\d{4})/;

//       const dobMatch = dobPattern.exec(text);
//       const genderMatch = genderPattern.exec(text);
//       const aadharMatch = aadharPattern.exec(text);
      
//       return {
//         name,
//         dob: dobMatch ? dobMatch[1] : "DOB not found",
//         gender: genderMatch ? genderMatch[1] : "Gender not found",
//         aadhar: aadharMatch ? aadharMatch[1] : "Aadhaar not found"
//       };
//     } catch (error) {
//       console.error("Error processing image:", error);
//       throw new Error(`Error processing image: ${error.message}`);
//     }
//   }
// };
// }

const Tesseract = require('tesseract.js');
const fs = require('fs');

module.exports = {
  async processImage(imagePath) {
    try {
      const result = await Tesseract.recognize(
        imagePath,
        'eng+guj',
        { logger: info => console.log(info) }
      );
      
      const { data: { text } } = result;
      const lines = text.trim().split('\n');
      
      // Adjust regex patterns to improve name extraction
      const namePattern = /Shah\s+[A-Za-z]+\s+[A-Za-z]+(?:\s+[A-Za-z]+)?/; // Adjust as needed
      const dobPattern = /(\d{8})/; // Match 161091971 format
      const genderPattern = /(Male|Female)/i;
      const aadharPattern = /(\d{4}\s\d{4}\s\d{4})/;

      const nameMatch = namePattern.exec(text);
      const dobMatch = dobPattern.exec(text);
      const genderMatch = genderPattern.exec(text);
      const aadharMatch = aadharPattern.exec(text);
      
      return {
        name: nameMatch ? nameMatch[0].replace(/\s*\|\s*/g, ' ').trim() : "Name not found",
        dob: dobMatch ? dobMatch[1] : "DOB not found",
        gender: genderMatch ? genderMatch[1] : "Gender not found",
        aadhar: aadharMatch ? aadharMatch[1] : "Aadhaar not found"
      };
    } catch (error) {
      console.error("Error processing image:", error);
      throw new Error(`Error processing image: ${error.message}`);
    }
  }
};

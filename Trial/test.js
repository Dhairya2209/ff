// test.js
const ocrModule = require('./ocr-module');

async function test() {
  try {
    const result = await ocrModule.processImage('mummy.jpg');
    console.log('OCR Result:', result);
  } catch (error) {
    console.error('Error:', error);
  }
}

test();

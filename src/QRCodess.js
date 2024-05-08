import React, { useState } from 'react';
import axios from 'axios';
import Scan from '../src/Scan.png'

const QRCodess = () => {
  const [text, setText] = useState('');
  const [qrCodeUrl, setQRCodeUrl] = useState('');

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const generateQRCode = () => {
    axios
      .get(`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(text)}`)
      .then((response) => {
        setQRCodeUrl(response.request.responseURL);
      })
      .catch((error) => {
        console.error('Error generating QR code:', error);
      });
  };

  return (
    <header className = 'flex justify-center items-center text-center w-full h-screen '>
    <div className='bg-blue-800 p-16 rounded-md text-white' >
      <h2 className= 'text-2xl mb-2 '>QR Code Generator</h2>
      <input
        type="text"
        value={text}
        onChange={handleInputChange}
        placeholder="Enter text or URL"
        className='mb-8 rounded-lg w-full p-2 text-black'
      />
      
      
       {
        qrCodeUrl === ''? (
          <img src={Scan} width={250} height={250} className='mx-auto'  alt="QR Code" />
        ) : (
          <img src={qrCodeUrl}  width={250} height={250} className='mx-auto'  alt="QR Code" />
        )
       }

        
      <button onClick={generateQRCode} className='mt-9 p-2 bg-blue-800 "border-solid border-2 border-white text-white rounded-lg hover:bg-white hover:text-blue-600'>Generate QR Code</button>
    </div>
    </header>
  );
};

export default QRCodess;

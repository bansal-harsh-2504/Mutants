import React, { useState } from 'react';
import axios from 'axios';

const MyComponent = () => {
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handlePullImage = async () => {
    try {
      const response = await fetch('http:localhost:5000/pull_image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          image_name: ''
        })
      });
      const data = await response.json();
      setOutput(data.output);
      setError('');
    } catch (error) {
      setError('Error pulling image');
      setOutput('');onst MyComponent = () => {
        const [output, setOutput] = useState('');
        const [error, setError] = useState('');
      
        const handlePullImage = async () => {
          try {
            const response = await fetch('http:localhost:5000/pull_image', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                image_name: ''
              })
            });
            const data = await response.json();
            setOutput(data.output);
            setError('');
          } catch (error) {
            setError('Error pulling image');
            setOutput('');
          }
        };
      
        const handleDisplayImages = async () => {
          try {
            const response = await fetch('http://your-flask-api-server:5000/display_images');
            const data = await response.json();
            setOutput(data.output);
            setError('');
          } catch (error) {
            setError('Error displaying images');
            setOutput('');
          }
        };
    }
  };

  const handleDisplayImages = async () => {
    try {
      const response = await fetch('http://your-flask-api-server:5000/display_images');
      const data = await response.json();
      setOutput(data.output);
      setError('');
    } catch (error) {
      setError('Error displaying images');
      setOutput('');
    }
  };


  return (
    <div>
      <button onClick={postData}>Send POST Request</button>
      <p>{data}</p>
    </div>
  );
};

export default MyComponent;

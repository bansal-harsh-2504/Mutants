import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './docker.css';
import './Images.css';
import axios from 'axios';

const Images = () => {
  const [imageName, setImageName] = useState('');
  const [output, setOutput] = useState('');
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');


  const handleDelete = async (imageID) => {
    try {
      const response = await axios.post('http://localhost:5000/delete_image', {
        image_id: imageID
      });
      // Handle success response, if needed
      console.log('Image deleted successfully');
    } catch (error) {
      // Handle error
      console.error('Error deleting image:', error);
    }
  };
  const handleChange = (e) => {
    setImageName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/pull_image', {
        image_name: imageName
      });
      setOutput(response.data.output);
      setError('');
    } catch (error) {
      setError('Error pulling image');
      setOutput('');
    }
  };

 
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get('http://localhost:5000/display_images');
        if (response.data && response.data.output) {
          const output = response.data.output;
          const lines = output.split('\n'); // Split output by newline
          const data = lines.slice(1, -1).map(line => {
            const columns = line.trim().split(/\s{2,}/); // Split line by two or more whitespaces
            return {
              repository: columns[0],
              tag: columns[1],
              imageID: columns[2],
              created: columns[3],
              size: columns[4]
            };
          });
          setImages(data);
          setError('');
        } else {
          setError('Invalid response received');
          setImages([]);
        }
      } catch (error) {
        setError('Error fetching images');
        setImages([]);
      }
    };

    fetchImages();
  }, []); // Empty dependency array to execute only once on mount

  return (
    <>
      <div className='body'>
        {/* Top */}
        <div className="top">
          <div className="logo">
            <i className="fa-brands fa-docker"></i>
            <h1>docker<span>desktop</span></h1>
          </div>
          <div className="menu-btns">
            <div className="search">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input typeprofile="text" placeholder='Search for images, containers, volumes, extensions...' />
              <button className='ctrlk'>Ctrl+K</button>
            </div>
            <i className="fa-solid fa-graduation-cap menu-icon"></i>
            <i className="fa-solid fa-bug menu-icon"></i>
            <i className="fa-solid fa-gear menu-icon"></i>
            <i className="fa-solid fa-braille menu-icon"></i>
            <Link to="/login">
              <i className="fa-solid fa-user menu-icon"></i>
            </Link>
          </div>
        </div>

        <div className="main">
          {/* Sidebar */}
          <div className="sidebar">
            <div className='info'>
              <ul>
                <Link to={"/container"}>
                  <li><i className="fa-solid fa-box-open side-icon"></i>Containers</li>
                </Link>
                <Link to={"/images"}>
                  <li className='active'><i className="fa-solid fa-film side-icon"></i>Images</li>
                </Link>
                <li><i className="fa-sharp fa-solid fa-hard-drive side-icon"></i>Volumes</li>
                <li><i className="fa-sharp fa-solid fa-wrench side-icon"></i>Builds </li>
                <li><i className="fa-sharp fa-solid fa-border-none side-icon"></i>Dev Environments<button className='blue-btn'>BETA</button></li>
                <li><i className="fa-solid fa-dna side-icon"></i>Docker Scout</li>
              </ul>
            </div>
            <hr className='hr' />
            <div className="bottom">
              <div className="extension">
                <h4>Extensions</h4>
                <i className="fa-solid fa-ellipsis-vertical"></i>
              </div>
              <div className="add-extension">
                <i className="fa-solid fa-circle-plus"></i>
                <h4>Add Extensions</h4>
              </div>
            </div>
          </div>
          {/* Hero */}
          <div className="hero">
            <h1>Images <a href="#">Give Feedback <i className="fa-solid fa-comments"></i></a></h1>

            <div className="searchh">
              <div className="search-box">
                <form onSubmit={handleSubmit}>
                  <div>
                    <input type="text" placeholder="pull image" value={imageName} onChange={handleChange} />
                    <button type="submit" className='btnn'><i class="fa-solid fa-magnifying-glass"></i></button>
                  </div>
                </form>
              </div>
              <i className="fa-solid fa-filter"></i>
              <i className="fa-solid fa-bars"></i>

              <div className="hide">
                <button className="delete-btn">Delete</button>
                <button><i class="fa-solid fa-play controls-icon"></i></button>
                <button><i class="fa-solid fa-pause controls-icon"></i></button>
                <button><i class="fa-solid fa-stop controls-icon"></i></button>
              </div>
            </div>

            {/* Display Images */}
            <div className="docker-info">
              <i class="fa-regular fa-square"></i>
              <h2>Name</h2>
              <h2>Tag</h2>
              <h2>Status</h2>
              <h2>Created</h2>
              <h2>Size</h2>
              <h2>Actions</h2>
            </div>
            <hr className="docker-info-hr" />

            {images.map((image, index) => (
              <div className="container-info" key={index}>
                <i class="fa-regular fa-square"></i>
                <h2>
                  <div className="details-container">
                    <div className="details-detail-container">
                      <a href="#">{image.repository}</a>
                      <p className='details-para'>{image.imageID}&nbsp;&nbsp;<i className="fa-regular fa-copy"></i></p>
                    </div>
                  </div>
                </h2>
                <h2>{image.tag}</h2>
                <h2>Unused</h2>
                <h2>{image.created}</h2>
                <h2>{image.size}</h2>
                <h2>
                      {/* <button type='submit' onClick={handlePause} className='btnn'><i className="fa-solid fa-stop  actions-icons"></i></button> */}
                      <button type='submit' onClick={() => handleDelete(image.imageID)} className='btnn'><i className="fa-solid fa-trash  actions-icons"></i></button>
                    </h2>
              </div>
            ))}
            <hr className="container-info-hr" />
          </div>
        </div>
      </div>
    </>
  )
}

export default Images;

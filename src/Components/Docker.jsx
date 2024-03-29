import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './docker.css';
import axios from 'axios';

const Docker = () => {
  const [imageName, setImageName] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [containers, setContainers] = useState([]);
  const [memoryUsage, setMemoryUsage] = useState('');
  const [cpuUsage, setCpuUsage] = useState('');
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/run_container', {
        image_name: "ubuntu"
      });
      setOutput(response.data.output);
      setError('');
    } catch (error) {
      setError('Error running container');
      setOutput('');
    }
  };

  const handleRemove = async (containerID) => {
    try {
      const response = await axios.post('http://localhost:5000/remove_container', {
        container_id: containerID
      });
      // Handle success response, if needed
      console.log('Container removed successfully');
    } catch (error) {
      // Handle error
      console.error('Error removing container:', error);
    }
  };

  const handleStop = async (containerID) => {
    try {
      const response = await axios.post('http://localhost:5000/stop_container', {
        container_id: containerID
      });
      // Handle success response, if needed
      console.log('Container stopped successfully');
    } catch (error) {
      // Handle error
      console.error('Error stopping container:', error);
    }
  };

  useEffect(() => {
    const fetchContainers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/display_containers');
        if (response.data && response.data.output) {
          const output = response.data.output;
          const lines = output.split('\n'); // Split output by newline
          const data = lines.slice(1, -1).map(line => {
            const columns = line.trim().split(/\s{2,}/); // Split line by two or more whitespaces
            return {
              ID: columns[0],
              image: columns[1],
              command: columns[2],
              created: columns[3],
              status: columns[4],
              names: columns[6]
            };
          });
          setContainers(data);
          setError('');
        } else {
          setError('Invalid response received');
          setContainers([]);
        }
      } catch (error) {
        setError('Error fetching containers');
        setContainers([]);
      }
    };

    fetchContainers();
  }, []); // Empty dependency array to execute only once on mount

  useEffect(() => {
    const fetchMemoryUsage = async () => {
      try {
        if (containers.length > 0) {
          const firstContainerImageID = containers[0].ID;
          const response = await axios.post('http://localhost:5000/get_memory_usage', {
            container_id: firstContainerImageID
          });
          setMemoryUsage(response.data.output);
        }
      } catch (error) {
        console.error('Error fetching memory usage:', error);
        setMemoryUsage('');
      }
    };
    
    fetchMemoryUsage();
  }, [containers]); // Dependency on containers to refetch when containers change

  useEffect(() => {
    const fetchCpuUsage = async () => {
      try {
        if (containers.length > 0) {
          const firstContainerImageID = containers[0].ID;
          const response = await axios.post('http://localhost:5000/get_cpu_usage', {
            container_id: firstContainerImageID
          });
          setCpuUsage(response.data.output);
        }
      } catch (error) {
        console.error('Error fetching memory usage:', error);
        setCpuUsage('');
      }
    };
    
    fetchCpuUsage();
  }, [containers]); // Dependency on containers to refetch when containers change


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
                <input typeprofile="text" placeholder='Search for images, containers, volumes, extensions...'/>
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
                        <li className='active'><i className="fa-solid fa-box-open side-icon"></i>Containers </li>
                        <Link to={"/images"}>
                          <li><i className="fa-solid fa-film side-icon"></i>Images</li>
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
              <h1>Containers <button onClick={handleSubmit} className='hero-btn'><i className="fa-solid fa-play"></i></button> <a href="#">Give Feedback <i className="fa-solid fa-comments"></i></a></h1>
              <div className="stats">
                <div className="cpu">
                  <div className="cpu-item">
                    <p>Container CPU usage</p>
                    <i className="fa-solid fa-circle-info"></i>
                  </div>
                  <p className="hero-p"><span className="percent"></span>{cpuUsage}<span className="percent2"> / 1600%</span> <span className="less-size">(16 CPUs available)</span></p>
                </div>
                <div className="memory">
                  <div className="memory-item">
                    <p>Container memory usage</p>
                    <i className="fa-solid fa-circle-info"></i>
                  </div>
                  <p className="hero-p"><span className="percent">{memoryUsage}</span><span className="percent2"></span></p>
                </div>
                <p className="show-charts">Show Charts</p>
              </div>
              <div className="searchh">
                <div className="search-box">
                  <i className="fa-solid fa-magnifying-glass"></i>
                  <input type="text" placeholder="Search"/>
                </div>
                <i className="fa-solid fa-bars"></i>
                <i className="fa-solid fa-toggle-off"></i>
                <p className="search-para">Only show running containers</p>

                <div className="hide">
                  <button className="delete-btn">Delete</button>
                  <button><i className="fa-solid fa-play controls-icon"></i></button>
                  <button><i className="fa-solid fa-pause controls-icon"></i></button>
                  <button><i className="fa-solid fa-stop controls-icon"></i></button>
                </div>
              </div>
              
              <div className="docker-info">
                <i className="fa-regular fa-square"></i>
                <h2>Name</h2>
                <h2>Image</h2>
                <h2>Status</h2>
                <h2>Commands</h2>
                <h2>Last Started</h2>
                <h2>Actions</h2>
              </div>
                <hr className="docker-info-hr" />
                
                {containers.map((container, index) => (
                  <div className="container-info" key={index}>
                    <i className="fa-regular fa-square"></i>
                    <h2>
                      <div className="details-container">
                        <i className="fa-solid fa-box-open side-icon"></i>
                        <div className="details-detail-container">
                          <a href="#">{container.names}</a>
                          <p className='details-para'>{container.ID}&nbsp;&nbsp;<i className="fa-regular fa-copy"></i></p>
                        </div>
                      </div>
                    </h2>
                    <h2><a href="#">{container.image}</a></h2>
                    <h2>{container.status}</h2>
                    <h2>{container.command}</h2>
                    <h2>{container.created}</h2>
                    <h2>
                      <button type='submit' onClick={() => handleStop(container.ID)} className='btnn'><i className="fa-solid fa-stop  actions-icons"></i></button>
                      <button type='submit' onClick={() => handleRemove(container.ID)} className='btnn'><i className="fa-solid fa-trash  actions-icons"></i></button>
                    </h2>
                  </div>
                ))}
                <hr className="container-info-hr" />
            </div>
          </div>
      </div>
    </>
  );
};

export default Docker;

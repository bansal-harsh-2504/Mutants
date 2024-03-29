import React from 'react';
import {Link} from 'react-router-dom';
import './docker.css';

const Docker = () => {
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
                <i class="fa-solid fa-magnifying-glass"></i>
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
                        <li className='active'><i className="fa-solid fa-box-open side-icon"></i>Containers</li>
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
              <h1>Containers <a href="#">Give Feedback <i className="fa-solid fa-comments"></i></a></h1>
              <div className="stats">
                <div className="cpu">
                  <div className="cpu-item">
                    <p>Container CPU usage</p>
                    <i className="fa-solid fa-circle-info"></i>
                  </div>
                  <p className="hero-p"><span className="percent">0.00%</span><span className="percent2"> / 1600%</span> <span className="less-size">(16 CPUs available)</span></p>
                </div>
                <div className="memory">
                  <div className="memory-item">
                    <p>Container memory usage</p>
                    <i className="fa-solid fa-circle-info"></i>
                  </div>
                  <p className="hero-p"><span className="percent">43.82MB</span><span className="percent2"> / 7.43GB</span></p>
                </div>
                <p className="show-charts">Show Charts</p>
              </div>
              <div className="searchh">
                <div className="search-box">
                  <i class="fa-solid fa-magnifying-glass"></i>
                  <input type="text" placeholder="Search"/>
                </div>
                <i className="fa-solid fa-bars"></i>
                <i className="fa-solid fa-toggle-off"></i>
                <p className="search-para">Only show running containers</p>

                <div className="hide">
                  <button className="delete-btn">Delete</button>
                  <button><i class="fa-solid fa-play controls-icon"></i></button>
                  <button><i class="fa-solid fa-pause controls-icon"></i></button>
                  <button><i class="fa-solid fa-stop controls-icon"></i></button>
                </div>
              </div>
              
              <div className="docker-info">
                {/* <i class="fa-solid fa-square-check"></i> */}
                <i class="fa-regular fa-square"></i>
                <h2>Name</h2>
                <h2>Image</h2>
                <h2>Status</h2>
                <h2>CPU(%)  Port(s)</h2>
                <h2>Last Started</h2>
                <h2>Actions</h2>
              </div>
                <hr className="docker-info-hr" />

                <div className="container-info">
                {/* <i class="fa-solid fa-square-check"></i> */}
                  <i class="fa-regular fa-square"></i>
                  <h2>
                    <div className="details-container">
                      <i className="fa-solid fa-box-open side-icon"></i>
                      <div className="details-detail-container">
                        <a href="#">amazing</a>
                        <p className='details-para'>34fac417b762&nbsp;&nbsp;<i className="fa-regular fa-copy"></i></p>
                      </div>
                    </div>
                  </h2>
                <h2><a href="#">ubuntu</a></h2>
                <h2>Running</h2>
                <h2>0%</h2>
                <h2>9 hours ago</h2>
                <h2>
                  <i class="fa-solid fa-stop  actions-icons"></i>
                  <i class="fa-solid fa-ellipsis-vertical  actions-icons"></i>
                  <i class="fa-solid fa-trash  actions-icons"></i>
                </h2>
              </div>
                <hr className="container-info-hr" />
            </div>
          </div>
      </div>
    </>
  );
};

export default Docker;
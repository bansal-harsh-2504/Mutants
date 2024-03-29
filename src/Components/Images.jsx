import React from 'react'
import {Link} from 'react-router-dom'
import './docker.css'
import './Images.css'

const Images = () => {
  return (
    <div>
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
                  <i class="fa-solid fa-magnifying-glass"></i>
                  <input type="text" placeholder="Search"/>
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
              
              <div className="docker-info">
                {/* <i class="fa-solid fa-square-check"></i> */}
                <i class="fa-regular fa-square"></i>
                <h2>Name</h2>
                <h2>Tag</h2>
                <h2>Status</h2>
                <h2>Created</h2>
                <h2>Size</h2>
                <h2>Actions</h2>
              </div>
                <hr className="docker-info-hr" />

                <div className="container-info">
                {/* <i class="fa-solid fa-square-check"></i> */}
                  <i class="fa-regular fa-square"></i>
                  <h2>
                    <div className="details-container">
                      <div className="details-detail-container">
                        <a href="#">basic_app</a>
                        <p className='details-para'>e76fda53c278&nbsp;&nbsp;<i className="fa-regular fa-copy"></i></p>
                      </div>
                    </div>
                  </h2>
                <h2>1</h2>
                <h2>Unused</h2>
                <h2>12 days ago</h2>
                <h2>646.64 MB</h2>
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
    </div>
  )
}

export default Images

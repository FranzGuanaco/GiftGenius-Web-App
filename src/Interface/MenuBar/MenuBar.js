import React from 'react';
import './MenuBar.css';


function MenuBar(props) {
    return (
      <div className="accordion" style={{ width: props.width }}>
        <div className="accordion-item">
        <nav>
          <div className="wrapper">
            <input type="radio" name="slider" id="menu-btn" className='input'/>
            <input type="radio" name="slider" id="close-btn" className='input'/>
            <ul className="nav-links">
              <label htmlFor="close-btn" className="btn close-btn"><i className="fas fa-times"></i></label>
              
              <li>
              <a href="#" className="desktop-item">Prix</a>
                <input type="checkbox" id="showDrop" className='input'/>
                <label htmlFor="showDrop" className="mobile-item">Dropdown Menu</label>
                <ul className="drop-menu">
                  <li><a href="#">Drop menu 1</a></li>
                  <li><a href="#">Drop menu 2</a></li>
                  <li><a href="#">Drop menu 3</a></li>
                  <li><a href="#">Drop menu 4</a></li>
                </ul>
              </li>
              <li>
                <a href="#" className="desktop-item">Marque</a>
                <input type="checkbox" id="showDrop" className='input' />
                <label htmlFor="showDrop" className="mobile-item">Dropdown Menu</label>
                <ul className="drop-menu">
                  <li><a href="#">Drop menu 1</a></li>
                  <li><a href="#">Drop menu 2</a></li>
                  <li><a href="#">Drop menu 3</a></li>
                  <li><a href="#">Drop menu 4</a></li>
                </ul>
              </li>
              <li>
              <a href="#" className="desktop-item">Vendeur</a>
                <input type="checkbox" id="showDrop" className='input'/>
                <label htmlFor="showDrop" className="mobile-item">Dropdown Menu</label>
                <ul className="drop-menu">
                  <li><a href="#">Drop menu 1</a></li>
                  <li><a href="#">Drop menu 2</a></li>
                  <li><a href="#">Drop menu 3</a></li>
                  <li><a href="#">Drop menu 4</a></li>
                </ul>
              </li>
              <li>
              <a href="#" className="desktop-item">Nouveauté</a>
                <input type="checkbox" id="showDrop" className='input'/>
                <label htmlFor="showDrop" className="mobile-item">Dropdown Menu</label>
                <ul className="drop-menu">
                  <li><a href="#">Drop menu 1</a></li>
                  <li><a href="#">Drop menu 2</a></li>
                  <li><a href="#">Drop menu 3</a></li>
                  <li><a href="#">Drop menu 4</a></li>
                </ul>
              </li>
            </ul>
            <label htmlFor="menu-btn" className="btn menu-btn"><i className="fas fa-bars"></i></label>
          </div>
        </nav>
      </div>
      </div>
    );
  }
  
  MenuBar.defaultProps = {
    width: '1800px'
  };
  
  

export default MenuBar;
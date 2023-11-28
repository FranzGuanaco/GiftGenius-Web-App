import React from 'react';
import './MenuBar.css';


function MenuBar(props) {
    return (
        <div class="accordion" style={{width: props.width}}>
        <div class="accordion-item">
            <div class="accordion-header">XXX</div>
            <div class="accordion-content">
                 <p>Proposition 1</p>
                <p>Proposition 2</p>
                <p>Proposition 3</p>
                </div>
                </div>
             <div class="accordion-item">
             <div class="accordion-header">XXX</div>
             <div class="accordion-content">
                  <p>Proposition A</p>
                  <p>Proposition B</p>
                 <p>Proposition C</p>
                    </div>
                    </div>
             <div class="accordion-item">
               <div class="accordion-header">XXX</div>
           <div class="accordion-content">
                  <p>Option X</p>
                 <p>Option Y</p>
                 <p>Option Z</p>
             </div>
            </div>
            <div class="accordion-item">
               <div class="accordion-header">XXX</div>
           <div class="accordion-content">
                  <p>Option X</p>
                 <p>Option Y</p>
                 <p>Option Z</p>
             </div>
            </div>
            <div class="accordion-item">
               <div class="accordion-header">XXX</div>
           <div class="accordion-content">
                  <p>Option X</p>
                 <p>Option Y</p>
                 <p>Option Z</p>
             </div>
            </div>
        </div>
    );
}

MenuBar.defaultProps = {
    width: '1800px'
   
  }
  

export default MenuBar;
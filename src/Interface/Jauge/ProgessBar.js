import React, { useEffect } from 'react';
import gsap from 'gsap';
import './Jauge.css';

const ProgressBar = ({ trigger }) => {
  useEffect(() => {
    if (trigger) {
      const progressBar = document.querySelector('.progress-bar');
      const progressBarText = document.querySelector('.progress-bar__text');

      gsap.to(progressBar, {
        x: `100%`,
        scaleY: 1,
        duration: 1,
        backgroundColor: '#4895ef',
    
        onComplete: () => {
          
          progressBar.style.boxShadow = '0 0 1px #4895ef';
        },
      });
    }
  }, [trigger]);

  return (
    <div className="progress-bar__container">
      <div className="progress-bar">
        <span className="progress-bar__text">Uploaded Successfully!</span>
      </div>
    </div>
  );
};

export default ProgressBar;



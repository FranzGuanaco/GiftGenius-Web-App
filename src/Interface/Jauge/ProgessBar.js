import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import './Jauge.css'

const ProgressBar = () => {
  useEffect(() => {
    const progressBar = document.querySelector('.progress-bar');
    const progressBarText = document.querySelector('.progress-bar__text');

    const progressBarStates = [0, 7, 27, 34, 68, 80, 95, 100];

    let time = 0;
    let endState = 100;

    progressBarStates.forEach(state => {
      let randomTime = Math.floor(Math.random() * 3000);
      setTimeout(() => {
        if (state === endState) {
          gsap.to(progressBar, {
            x: `${state}%`,
            duration: 2,
            backgroundColor: '#4895ef',
            onComplete: () => {
              progressBarText.style.display = 'initial';
              progressBar.style.boxShadow = '0 0 5px #4895ef';
            },
          });
        } else {
          gsap.to(progressBar, {
            x: `${state}%`,
            duration: 2,
          });
        }
      }, randomTime + time);
      time += randomTime;
    });
  }, []);

  return (
    <div className="progress-bar__container">
      <div className="progress-bar">
        <span className="progress-bar__text">Uploaded Successfully!</span>
      </div>
    </div>
  );
};

export default ProgressBar;



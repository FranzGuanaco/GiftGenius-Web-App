import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import './Jauge.css'

const ProgressBar = () => {
  const [progressState, setProgressState] = useState(0);

  useEffect(() => {
    const progressBarContainer = document.querySelector('.progress-bar__container');
    const progressBar = document.querySelector('.progress-bar');
    const progressBarText = document.querySelector('.progress-bar__text');

    const progressBarStates = [0, 7, 27, 34, 68, 80, 95, 100];

    let time = 0;
    let endState = 100;

    progressBarStates.forEach((state) => {
      let randomTime = Math.floor(Math.random() * 3000);
      setTimeout(() => {
        if (state === endState) {
          gsap.to(progressBar, {
            x: `${state}%`,
            duration: 2,
            backgroundColor: '#4895ef',
            onComplete: () => {
              progressBarText.style.display = 'initial';
              progressBarContainer.style.boxShadow = '0 0 5px #4895ef';
            },
          });
        } else {
          gsap.to(progressBar, {
            x: `${state}%`,
            duration: 2,
          });
        }
        setProgressState(state); // Mettre à jour l'état de progression React
      }, randomTime + time);
      time += randomTime;
    });
  }, []); // Utilisez un tableau vide pour exécuter cela uniquement une fois au montage

  return (
    <div className="container">
      <div className="progress-bar__container">
        <div className="progress-bar" style={{ width: `${progressState}%` }}>
          <span className="progress-bar__text">Uploaded Successfully!</span>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;


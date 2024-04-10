import React, { useEffect } from 'react';
import gsap from 'gsap';
import './Jauge.css';
import { useProgressBar } from './ProgressBarContext'; // Assurez-vous que le chemin d'import est correct

const ProgressBar = () => {
  const { progression } = useProgressBar();

  useEffect(() => {
    const progressBar = document.querySelector('.progress-bar');
    const progressBarWidth = `${progression}%`;

    gsap.to(progressBar, {
      x: progressBarWidth,
      scaleY: 1,
      duration: 1,
      backgroundColor: '#4895ef',
      onComplete: () => {
        progressBar.style.boxShadow = '0 0 1px #4895ef';
      },
    });
  }, [progression]);

  return (
    <div className="progress-bar__container">
      <div className="progress-bar" >
        <span className="progress-bar__text">Uploaded Successfully!</span>
      </div>
    </div>
  );
};

export default ProgressBar;








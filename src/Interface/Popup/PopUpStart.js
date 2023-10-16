import React from 'react';
import './PopUpStart.css';

const PopUpStart = (props) => {

    const size = {width: props.width, height:props.height}
  return (
    
    <div>
      <div className="popUp" style={size}>
        {props.PopUpStartText}
      </div>
    </div>
  );
};

PopUpStart.defaultProps = {
    width: "500px",
    height: "500px",
    PopUpStartText: 'eee'
  };

export default PopUpStart;

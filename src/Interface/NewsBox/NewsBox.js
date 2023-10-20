import React from 'react';
import './NewsBox.css'

const message = "Explorez notre réseau de plus de 200 partenaires avec Gift Genius et trouvez le cadeau idéal à chaque fois !";

const NewsBox = (props) => {
  return (
    <div className="NewsBox" style={{width: props.width}}> {/* Utilisez la classe CSS */}
      {message}
    </div>
  );
}

NewsBox.defaultProps = {
  width: '1800px'
 
}

export default NewsBox;

  

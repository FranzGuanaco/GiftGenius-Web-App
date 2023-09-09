import React from 'react';
import './NewsBox.css'

const message = "Explorez notre réseau de plus de 200 partenaires avec Gift Genius et trouvez le cadeau idéal à chaque fois !";

const NewsBox = () => {
  return (
    <div className="NewsBox"> {/* Utilisez la classe CSS */}
      {message}
    </div>
  );
}

export default NewsBox;

  

import React from 'react';

class NewsBox extends React.Component {
    render() {
      const boxStyle = {
        backgroundColor: '#ECC25A',
        color: 'white',
        padding: '10px',
        height: '40px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center', // Centre verticalement le contenu
      };
  
      const message = "Explorez notre réseau de plus de 200 partenaires avec Gift Genius et trouvez le cadeau idéal à chaque fois !";
  
      return (
        <div style={boxStyle}>
          {message}
        </div>
      );
    }
  }
  
  export default NewsBox;
  

import React from 'react';
import './Category.css'; // Importez le fichier CSS pour le style

const CategoryBox = ({ width, height }) => {
  return (
      <button className="category" style={{width: width, height: height}}>
        Cadeaux technologiques
      </button>
  );
}

CategoryBox.defaultProps = {
  width: "2000px",
  height: "20px"
};

export default CategoryBox;


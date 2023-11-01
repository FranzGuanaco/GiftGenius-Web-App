import React from 'react';
import './Category.css'; // Importez le fichier CSS pour le style

const CategoryBox = ({ width, height, category }) => {
  return (
      <button className="category" style={{width: width, height: height}}>
        {category}
      </button>
  );
}

CategoryBox.defaultProps = {
  category:"category"
};

export default CategoryBox;


import React from 'react';
import PropTypes from 'prop-types';
import './Input.css';

function Input(props) {
    const { type, placeholder, handleChange } = props;
    
    return (
        <input
            type={type}
            placeholder={placeholder}
            onChange={handleChange}
            className="input-responsive"
        />

    );
}

Input.propTypes = {
    type: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    handleChange: PropTypes.func.isRequired,
    width: "100%"
};

export default Input;

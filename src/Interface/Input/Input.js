import React from 'react';
import PropTypes from 'prop-types';

function Input(props) {
    const { type, placeholder, handleChange, width } = props;
    
    return (
        <input
            type={type}
            placeholder={placeholder}
            onChange={handleChange}
            style={{
                width: width,
                padding: '10px',
                margin: '10px 0',
                border: 'none',
                borderRadius:"33px"
            }}
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

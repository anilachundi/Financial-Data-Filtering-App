import React, {useState, useEffect } from 'react';
import PropTypes from "prop-types";
import './Slider.css'




const Slider = ({min, max, onRangeChange}) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);

  useEffect(() => {
    // console.log("minVal: ", minVal, " maxVal: ", maxVal)
    onRangeChange(minVal, maxVal);
  }, [minVal, maxVal, onRangeChange]);

  return (
    <div className="slider">
      <div
        className="slider-track"
        style={{
          left: `${((minVal - min) / (max - min)) * 100}%`,
          right: `${100 - ((maxVal - min) / (max - min)) * 100}%`,
        }}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        onChange={(e) =>
          setMinVal(Math.min(Number(e.target.value), maxVal - 1))
        }
        className="thumb thumb-left"
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        onChange={(e) =>
          setMaxVal(Math.max(Number(e.target.value), minVal + 1))
        }
        className="thumb thumb-right"
      />
      <div>
        Selected range: {minVal} - {maxVal}
      </div>
    </div>
  );
};

Slider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
};

export default Slider;



import React, {useState, useEffect, useRef } from 'react';
import './DropDownTree.css';
import "react-dropdown-tree-select/dist/styles.css";


const SortDropdown = ({ onSortChange }) => {
    const [category, setCategory] = useState("");
    const [order, setOrder] = useState("");
  
    const handleCategoryChange = (event) => {
      setCategory(event.target.value);
      setOrder(""); // Reset order when category changes
    };
  
    const handleOrderChange = (event) => {
        
      setOrder(event.target.value);
    };

    useEffect(() => {
        // console.log("minVal: ", minVal, " maxVal: ", maxVal)
        onSortChange(category, order)
      }, [category, order]);
  
    
  
    return (
      <div style={{ width: "300px", margin: "20px" }}>
        <h3>Sort By:</h3>
        <select value={category} onChange={handleCategoryChange}>
          <option value="" disabled>
            Select Category
          </option>
          <option value="date">Date</option>
          <option value="revenue">Revenue</option>
          <option value="netIncome">Net Income</option>
        </select>
        {category && (
          <>
            <select value={order} onChange={handleOrderChange}>
              <option value="" disabled>
                Select Order
              </option>
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </>
        )}
        {category && order && (
          <p>
            Sorting by: <b>{category}</b> (<b>{order}</b>)
          </p>
        )}
      </div>
    );
  };
  
  export default SortDropdown;
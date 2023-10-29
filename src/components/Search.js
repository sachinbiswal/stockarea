import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchWarehouse, spaceRangeWarehouse } from "../redux/actions/warehouseActions";
import { BsSearch } from 'react-icons/bs';

export default function Search() {
  const dispatch = useDispatch();
  const { spaceRange } = useSelector((state) => state.spaceRange);
  const [cities, setCities] = useState([]);
  const [clusters, setClusters] = useState([]);

  useEffect(() => {
    fetch("/warehouse.json")
      .then((response) => response.json())
      .then((data) => {
        const uniqueCities = [...new Set(data.map((warehouse) => warehouse.city))];
        const uniqueClusters = [...new Set(data.map((warehouse) => warehouse.cluster))];
        setCities(uniqueCities);
        setClusters(uniqueClusters);
      })
      .catch((error) => {
        console.error("Error fetching warehouse data:", error);
      });
  }, []);

  const handleSearchChange = (e) => {
    const searchText = e.target.value;
    const searchResult = searchText
      ? searchText.trim().toLowerCase()
      : searchText;

    dispatch(searchWarehouse(searchResult));
  };

  return (
    <div className="search_container">
      <div className="search_box">
        <input
          type="text"
          onChange={handleSearchChange}
          placeholder="Search Warehouse Name"
        />
        <BsSearch className="search_icon" />
      </div>
      
      

      <div className="search_dropdowns">
         <select className="abc" onChange={(e) => dispatch(searchWarehouse(e.target.value))}>
            <option value="">Select a city</option>
            {cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
       
       
             <select  className="abc" onChange={(e) => dispatch(searchWarehouse(e.target.value))}>
            <option value="">Select a cluster</option>
            {clusters.map((cluster) => (
              <option key={cluster} value={cluster}>
                {cluster}
              </option>
            ))}
          </select>
        
            
      </div>
      <div className="search_range">
        <p>Space</p>
        <input
          value={spaceRange}
          type="range"
          min="0"
          max="5000"
          onChange={(e) => dispatch(spaceRangeWarehouse(e.target.value))}
        />
        <p>{spaceRange}</p>
      </div>
    </div>
  );
}

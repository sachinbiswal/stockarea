import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectedWarehouse, removeSelectedWarehouse } from "../redux/actions/warehouseActions";
import { MdKeyboardBackspace } from 'react-icons/md';
import { Link } from 'react-router-dom';
import EditWarehouseModal from "./EditWarehouseModal"; // Import the modal component for editing warehouse details

export default function WarehouseDetail() {
  const warehouse = useSelector((state) => state.warehouse);
  const { name, city, cluster, img, code, type, space_available, is_registered, is_live } = warehouse;
  const { warehouseID } = useParams();
  const dispatch = useDispatch();

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const fetchWarehouseDetail = async () => {
    try {
      const response = await fetch("/warehouse.json");
      const data = await response.json();
      const queryWarehouse = data.find(warehouse => warehouse.id.toString() === warehouseID);
      dispatch(selectedWarehouse(queryWarehouse));
    } catch (err) {
      console.log("Error", err);
    }
  };

  useEffect(() => {
    if (warehouseID && warehouseID !== "") {
      fetchWarehouseDetail();
    }
    return () => {
      dispatch(removeSelectedWarehouse());
    };
  }, [warehouseID]);

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleEditSave = (editedDetails) => {
    dispatch(selectedWarehouse(editedDetails));
    setIsEditModalOpen(false);
  };

  return (
    <div className="warehouse_detail_container">
      <Link to="/" className="back_btn">
        <span><MdKeyboardBackspace className="back_icon" /></span>
        <span>BACK</span>
      </Link>
      <div className="warehouse_container">
        {Object.keys(warehouse).length === 0 ? (
          <p>Loading...</p>
        ) : (
          <div className="warehouse_detail_box">
            <div className="warehouse_image_box">
              <img src={img} alt={name} />
            </div>
            <div className="warehouse_details">
              <h1>{name}</h1>
              <div className="splitter">
                <h4>Code:</h4>
                <p>{code}</p>
              </div>
              <div className="splitter">
                <h4>Type:</h4>
                <p>{type}</p>
              </div>
              <div className="splitter">
                <h4>City:</h4>
                <p>{city}</p>
              </div>
              <div className="splitter">
                <h4>Cluster:</h4>
                <p>{cluster}</p>
              </div>
              <div className="splitter">
                <h4>Space Available:</h4>
                <p>{space_available}</p>
              </div>
              <div className="splitter">
                <h4>Status:</h4>
                <p>{is_registered ? 'Registered' : 'Not Registered'}</p>
              </div>
              <button className='btn' onClick={handleEditClick}>Edit</button>
            </div>
          </div>
        )}
      </div>

       <EditWarehouseModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        warehouseDetails={warehouse}
        onSave={handleEditSave}
      />
    </div>
  );
}

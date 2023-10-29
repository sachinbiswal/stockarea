import React, { useState } from "react";
import Modal from "react-modal";
import "./modal-styles.css"; // Import the CSS file
import { useEffect } from "react";

Modal.setAppElement("#root");

export default function EditWarehouseModal({ isOpen, onClose, warehouseDetails, onSave }) {
  const [editedDetails, setEditedDetails] = useState({ ...warehouseDetails });

  const handleSave = () => {
    updateWarehouseData(editedDetails);
    onSave(editedDetails);
    alert('Data updated successfully')
    onClose();
  };

  useEffect(()=>{
    setEditedDetails(warehouseDetails);
  },[warehouseDetails])

  const updateWarehouseData = (updatedData) => {
    fetch("/warehouse.json")
      .then((response) => response.json())
      .then((data) => {
        const warehouseIndex = data.findIndex((item) => item.id === updatedData.id);
        if (warehouseIndex !== -1) {
          data[warehouseIndex] = updatedData;
          fetch("/warehouse.json", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          })
            .then((response) => response.json())
            .then(() => {
              console.log("Data updated successfully.");
            })
            .catch((error) => {
              console.error("Error updating data:", error);
            });
        }
      });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Edit Warehouse Details"
      className="modal-container"
    >
      <h2>Edit Warehouse Details</h2>
      <input
        type="text"
        className="modal-input"
        value={editedDetails.name}
        placeholder="Name"
        onChange={(e) => setEditedDetails({ ...editedDetails, name: e.target.value })}
      />

      <input
        type="text"
        className="modal-input"
        value={editedDetails.city}
        placeholder="City"
        onChange={(e) => setEditedDetails({ ...editedDetails, city: e.target.value })}
      />

      <input
        type="text"
        className="modal-input"
        value={editedDetails.cluster}
        placeholder="Cluster"
        onChange={(e) => setEditedDetails({ ...editedDetails, cluster: e.target.value })}
      />

      <input
        type="text"
        className="modal-input"
        value={editedDetails.type}
        placeholder="Type"
        onChange={(e) => setEditedDetails({ ...editedDetails, type: e.target.value })}
      />

      <input
        type="text"
        className="modal-input"
        value={editedDetails.code}
        placeholder="Code"
        onChange={(e) => setEditedDetails({ ...editedDetails, code: e.target.value })}
      />

      <input
        type="text"
        className="modal-input"
        value={editedDetails.space_available}
        placeholder="Space Available"
        onChange={(e) => setEditedDetails({ ...editedDetails, space_available: e.target.value })}
      />

      <select
        className="modal-select"
        value={editedDetails.is_registered ? "registered" : "not_registered"}
        onChange={(e) =>
          setEditedDetails({
            ...editedDetails,
            is_registered: e.target.value === "registered",
          })
        }
      >
        <option value="registered">Registered</option>
        <option value="not_registered">Not Registered</option>
      </select>

      <select
        className="modal-select"
        value={editedDetails.is_live ? "live" : "not_live"}
        onChange={(e) =>
          setEditedDetails({
            ...editedDetails,
            is_live: e.target.value === "live",
          })
        }
      >
        <option value="live">Live</option>
        <option value="not_live">Not Live</option>
      </select>

      <div className="modal-buttons">
        <button className="modal-button modal-button-save" onClick={handleSave}>
          Save
        </button>
        <button className="modal-button modal-button-cancel" onClick={onClose}>
          Cancel
        </button>
      </div>
    </Modal>
  );
}

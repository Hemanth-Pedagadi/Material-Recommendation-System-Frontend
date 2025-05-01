import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MaterialForm from '../FetchMaterialForm/FetchMaterialForm';
import './FetchMaterials.css';

function MaterialList() {
  const [materials, setMaterials] = useState([]);
  const [editMaterial, setEditMaterial] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchMaterials();
  }, []);

  const fetchMaterials = async () => {
    const res = await axios.get("https://material-recommendation-backend.vercel.app/materials");
    setMaterials(res.data);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this material?")) {
      await axios.delete(`https://material-recommendation-backend.vercel.app/materials/${id}`);
      fetchMaterials();
    }
  };

  const handleEdit = (material) => {
    setEditMaterial(material);
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditMaterial(null);
    setShowForm(true);
  };

  const handleFormSubmit = () => {
    fetchMaterials();
    setShowForm(false);
    setEditMaterial(null);
  };

  return (
    <div className="materials-container">
      <h1 className="page-title">Materials List</h1>
      <div className="table-wrapper">
        <table className="material-table">
          <thead>
            <tr>
              <th>S.no</th>
              <th>Material</th>
              <th>Durability</th>
              <th>Cost/Unit</th>
              <th>Environmental Suitability</th>
              <th>Thermal Insulation</th>
              <th>Availability</th>
              <th>Fire Resistance</th>
              <th>Water Resistance</th>
              <th>Weight (kg)</th>
              <th colSpan="2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {materials.map((mat, index) => (
              <tr key={mat._id}>
                <td>{index + 1}</td>
                <td>{mat.Material}</td>
                <td>{mat.Durability}</td>
                <td>{mat.Cost_Per_Unit}</td>
                <td>{mat.Environmental_Suitability}</td>
                <td>{mat.Thermal_Insulation}</td>
                <td>{mat.Availability}</td>
                <td>{mat.Fire_Resistance}</td>
                <td>{mat.Water_Resistance}</td>
                <td>{mat["Weight_Per_Unit (kg)"]}</td>
                <td><button className="btn update" onClick={() => handleEdit(mat)}>Update</button></td>
                <td><button className="btn delete" onClick={() => handleDelete(mat._id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="btn add" onClick={handleAdd}>+ Add Material</button>

      {showForm && (
        <div className="overlay">
          <div className="overlay-content">
            <MaterialForm
              onSubmit={handleFormSubmit}
              material={editMaterial}
              onCancel={() => setShowForm(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default MaterialList;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './FetchMaterialForm.css';

// function MaterialForm({ onSubmit, material, onCancel }) {
//   const [form, setForm] = useState({
//     Material: '',
//     Durability: '',
//     Cost_Per_Unit: '',
//     Environmental_Suitability: '',
//     Thermal_Insulation: '',
//     Availability: '',
//     Fire_Resistance: '',
//     Water_Resistance: '',
//     "Weight_Per_Unit (kg)": ''
//   });

//   useEffect(() => {
//     if (material) setForm(material);
//   }, [material]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (form._id) {
//       await axios.put(`https://material-recommendation-backend.vercel.app/materials/${form._id}`, form);
//     } else {
//       await axios.post("https://material-recommendation-backend.vercel.app/materials", form);
//     }
//     onSubmit();
//   };

//   return (
//     <div className="fetching">
//       <form className="Fetchmaterial" onSubmit={handleSubmit}>
//       {Object.keys(form).map((key) =>
//         key !== '_id' ? (
//           <div className="details" key={key}>
//             <label>{key}:</label>
//             <input name={key} value={form[key]} onChange={handleChange} />
//           </div>
//         ) : null
//       )}
//       <button className="fetchingbtn1" type="submit">{form._id ? "Update" : "Add"}</button> <br />
//       <button className="fetchingbtn2" type="button" onClick={onCancel}>Cancel</button>
//       </form>
//     </div>
//   );
// }

// export default MaterialForm;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FetchMaterialForm.css';

function MaterialForm({ onSubmit, material, onCancel }) {
  const [form, setForm] = useState({
    Material: '',
    Durability: '',
    Cost_Per_Unit: '',
    Environmental_Suitability: '',
    Thermal_Insulation: '',
    Availability: '',
    Fire_Resistance: '',
    Water_Resistance: '',
    "Weight_Per_Unit (kg)": ''
  });

  useEffect(() => {
    if (material) setForm(material);
  }, [material]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (form._id) {
        await axios.put(`https://material-recommendation-backend.vercel.app/materials/${form._id}`, form);
      } else {
        await axios.post('https://material-recommendation-backend.vercel.app/materials', form);
      }
      onSubmit();
    } catch (error) {
      console.error('Error submitting material:', error);
      alert('Something went wrong!');
    }
  };

  return (
    <div className="material-form-container">
      <form className="material-form" onSubmit={handleSubmit}>
        <h2>{form._id ? 'Update Material' : 'Add New Material'}</h2>

        {Object.keys(form).map(
          (key) =>
            key !== '_id' && (
              <div className="form-group" key={key}>
                <label>{key.replace(/_/g, ' ')}:</label>
                <input
                  type="text"
                  name={key}
                  value={form[key]}
                  onChange={handleChange}
                  required
                />
              </div>
            )
        )}

        <div className="form-buttons">
          <button className="submit-btn" type="submit">
            {form._id ? 'Update' : 'Add'}
          </button>
          <button className="cancel-btn" type="button" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default MaterialForm;

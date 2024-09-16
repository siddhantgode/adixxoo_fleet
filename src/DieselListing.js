import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs

function AddDieselForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    date: new Date(),
    vehicle: '',
    type: '',
    category: '',
    fuel: 'Diesel',
    owner: '',
    holder: '',
    dept: '',
    qty: 0,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const newData = {
      id: uuidv4(), // Auto-generated ID
      ...formData,
      qty: Number(formData.qty),
    };
    onSubmit(newData); // Pass the new data to the parent component
    setFormData({
      date: new Date(),
      vehicle: '',
      type: '',
      category: '',
      fuel: 'Diesel',
      owner: '',
      holder: '',
      dept: '',
      qty: 0,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="container mt-4">
      <div class="container">
      <h2 style={{margin:30}}>Add New Diesel Entry</h2>
      <div style={{ width: '80%', margin: '0 auto', height: '300px',  border: '1px solid #eeeeee', padding: '10px' }}>
      <div class="row">
    <div class="col">{/* Date Input */}
      <div className="form-group">
        <label>Date</label>
        <DatePicker
          selected={formData.date}
          onChange={(date) => setFormData({ ...formData, date })}
          className="form-control"
        />
      </div></div>
    <div class="col">{/* Vehicle Input */}
      <div className="form-group">
        <label>Vehicle</label>
        <input
          type="text"
          name="vehicle"
          value={formData.vehicle}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div></div>
    <div class="col">{/* Type Dropdown */}
      <div className="form-group">
        <label>Type</label>
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="form-control"
          required
        >
          <option value="">Select Type</option>
          <option value="JCB">JCB</option>
          <option value="CRANE">Crane</option>
          <option value="TRANSIT MIXER">Transit Mixer</option>
          <option value="TATA ACE">Tata Ace</option>
          <option value="GENERATOR">Generator</option>
        </select>
      </div></div>
    <div class="w-100"></div>
    <div class="col">{/* Category Dropdown */}
      <div className="form-group">
        <label>Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="form-control"
          required
        >
          <option value="">Select Category</option>
          <option value="VEHICLE">Vehicle</option>
          <option value="GENERATOR">Generator</option>
          <option value="MACHINE">Machine</option>
        </select>
      </div></div>
    <div class="col">{/* Fuel Dropdown */}
      <div className="form-group">
        <label>Fuel</label>
        <select
          name="fuel"
          value={formData.fuel}
          onChange={handleChange}
          className="form-control"
        >
          <option value="Diesel">Diesel</option>
          <option value="Petrol">Petrol</option>
        </select>
      </div></div>
    <div class="col">{/* Owner Dropdown */}
      <div className="form-group">
        <label>Owner</label>
        <select
          name="owner"
          value={formData.owner}
          onChange={handleChange}
          className="form-control"
          required
        >
          <option value="">Select Owner</option>
          <option value="PRIVATE">Private</option>
          <option value="ASHRAM">Ashram</option>
        </select>
      </div></div>
    <div class="w-100"></div>
    <div class="col">{/* Holder Dropdown */}
      <div className="form-group">
        <label>Holder</label>
        <select
          name="holder"
          value={formData.holder}
          onChange={handleChange}
          className="form-control"
          required
        >
          <option value="">Select Holder</option>
          <option value="SMSF">SMSF</option>
          <option value="BSK CRANES">BSK Cranes</option>
          <option value="GPS CRANES">GPS Cranes</option>
          <option value="RMC PLANT">RMC Plant</option>
        </select>
      </div></div>
    <div class="col">{/* Department Dropdown */}
      <div className="form-group">
        <label>Department</label>
        <select
          name="dept"
          value={formData.dept}
          onChange={handleChange}
          className="form-control"
          required
        >
          <option value="">Select Department</option>
          <option value="VEHICLE ASHRAM">Vehicle Ashram</option>
          <option value="PRIVATE">Private</option>
        </select>
      </div></div>
    <div class="col">{/* Quantity Input */}
      <div className="form-group">
        <label>Quantity (liters)</label>
        <input
          type="number"
          name="qty"
          value={formData.qty}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div></div>

      </div>
    </div>
</div>

      <button type="submit" className="btn btn-primary" style={{margin:30}}>
        Add Entry
      </button>
    </form>
  );
}

export default AddDieselForm;












// // src/DieselListing.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import DatePicker from 'react-datepicker';
// import 'react-datepicker/dist/react-datepicker.css';
// import { v4 as uuidv4 } from 'uuid';

// function DieselListing() {
//   const [vehicleOptions, setVehicleOptions] = useState([]);
//   const [categoryOptions, setCategoryOptions] = useState([]);
//   const [ownerOptions, setOwnerOptions] = useState([]);
//   const [deptOptions, setDeptOptions] = useState([]);
//   const [formData, setFormData] = useState({
//     id: '',
//     date: new Date(),
//     vehicle: '',
//     type: '',
//     category: '',
//     fuel: 'Diesel',
//     owner: '',
//     qty: '',
//     holder: '',
//     dept: ''
//   });

//   useEffect(() => {
//     // Fetch options for drop-down fields
//     const fetchOptions = async () => {
//       try {
//         // These endpoints should return an array of options
//         const [vehicles, categories, owners, departments] = await Promise.all([
//           axios.get('http://localhost:8000/vehicles'), // Example endpoint
//           axios.get('http://localhost:8000/categories'), // Example endpoint
//           axios.get('http://localhost:8000/owners'), // Example endpoint
//           axios.get('http://localhost:8000/departments') // Example endpoint
//         ]);

//         setVehicleOptions(vehicles.data);
//         setCategoryOptions(categories.data);
//         setOwnerOptions(owners.data);
//         setDeptOptions(departments.data);
//       } catch (error) {
//         console.error('Error fetching options', error);
//       }
//     };

//     fetchOptions();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevData => ({
//       ...prevData,
//       [name]: value
//     }));
//   };

//   const handleDateChange = (date) => {
//     setFormData(prevData => ({
//       ...prevData,
//       date
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const newEntry = {
//       ...formData,
//       id: uuidv4(), // Auto-generate unique ID
//       date: formData.date.toISOString().split('T')[0] // Convert date to YYYY-MM-DD format
//     };

//     try {
//       await axios.post('http://localhost:8000/DIESEL', newEntry);
//       alert('Entry added successfully');
//       // Reset form
//       setFormData({
//         id: '',
//         date: new Date(),
//         vehicle: '',
//         type: '',
//         category: '',
//         fuel: 'Diesel',
//         owner: '',
//         qty: '',
//         holder: '',
//         dept: ''
//       });
//     } catch (error) {
//       console.error('Error adding entry', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Add New Diesel Entry</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Date:</label>
//           <DatePicker
//             selected={formData.date}
//             onChange={handleDateChange}
//             dateFormat="yyyy-MM-dd"
//           />
//         </div>
//         <div>
//           <label>Vehicle:</label>
//           <select
//             name="vehicle"
//             value={formData.vehicle}
//             onChange={handleChange}
//             required
//           >
//             <option value="">Select Vehicle</option>
//             {vehicleOptions.map(option => (
//               <option key={option} value={option}>{option}</option>
//             ))}
//           </select>
//         </div>
//         <div>
//           <label>Type:</label>
//           <input
//             type="text"
//             name="type"
//             value={formData.type}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Category:</label>
//           <select
//             name="category"
//             value={formData.category}
//             onChange={handleChange}
//             required
//           >
//             <option value="">Select Category</option>
//             {categoryOptions.map(option => (
//               <option key={option} value={option}>{option}</option>
//             ))}
//           </select>
//         </div>
//         <div>
//           <label>Fuel:</label>
//           <input
//             type="text"
//             name="fuel"
//             value={formData.fuel}
//             onChange={handleChange}
//             disabled
//           />
//         </div>
//         <div>
//           <label>Owner:</label>
//           <select
//             name="owner"
//             value={formData.owner}
//             onChange={handleChange}
//             required
//           >
//             <option value="">Select Owner</option>
//             {ownerOptions.map(option => (
//               <option key={option} value={option}>{option}</option>
//             ))}
//           </select>
//         </div>
//         <div>
//           <label>Quantity:</label>
//           <input
//             type="number"
//             name="qty"
//             value={formData.qty}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Holder:</label>
//           <input
//             type="text"
//             name="holder"
//             value={formData.holder}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div>
//           <label>Department:</label>
//           <select
//             name="dept"
//             value={formData.dept}
//             onChange={handleChange}
//             required
//           >
//             <option value="">Select Department</option>
//             {deptOptions.map(option => (
//               <option key={option} value={option}>{option}</option>
//             ))}
//           </select>
//         </div>
//         <button type="submit">Add Entry</button>
//       </form>
//     </div>
//   );
// }

// export default DieselListing;

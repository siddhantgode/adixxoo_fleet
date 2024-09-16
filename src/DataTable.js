import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import for routing
import 'bootstrap/dist/css/bootstrap.min.css';

function DataTable() {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const navigate = useNavigate();

  // Fetch the data from the JSON server
  useEffect(() => {
    fetch('http://localhost:8000/DIESEL')
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // Handle delete operation
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      await fetch(`http://localhost:8000/DIESEL/${id}`, {
        method: 'DELETE',
      });
      setData(data.filter((item) => item.id !== id));
    }
  };

  // Handle search
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle edit, redirects to the form component
  const handleEdit = (entry) => {
    navigate(`/edit/${entry.id}`, { state: { entry } });
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const filteredData = data.filter((entry) =>
    entry.vehicle.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const currentData = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mt-4">
      <h2>Diesel Data Table</h2>

      <div className="row mb-3">
        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search by vehicle"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="col-md-8 text-right">
          <button
            className="btn btn-primary float-right"
            onClick={() => navigate('/add')}
          >
            Add New Entry
          </button>
        </div>
      </div>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Vehicle</th>
            <th>Type</th>
            <th>Category</th>
            <th>Fuel</th>
            <th>Owner</th>
            <th>Holder</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.id}</td>
              <td>{new Date(entry.date).toLocaleDateString()}</td>
              <td>{entry.vehicle}</td>
              <td>{entry.type}</td>
              <td>{entry.category}</td>
              <td>{entry.fuel}</td>
              <td>{entry.owner}</td>
              <td>{entry.holder}</td>
              <td>{entry.qty}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm mr-2"
                  onClick={() => handleEdit(entry)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(entry.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <nav>
        <ul className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <li
              key={index + 1}
              className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
            >
              <button
                onClick={() => handlePageChange(index + 1)}
                className="page-link"
              >
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default DataTable;

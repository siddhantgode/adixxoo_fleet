import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';

function CrudTableComponent() {
  const [dieselData, setDieselData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    date: '',
    vehicle: '',
    type: '',
    qty: '',
  });
  const [editing, setEditing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Items per page for pagination

  // Fetch data from JSON server
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:8000/DIESEL');
      const data = await response.json();
      setDieselData(data);
      setFilteredData(data);
    };
    fetchData();
  }, []);

  // Handle search functionality
  useEffect(() => {
    const filtered = dieselData.filter(item =>
      item.vehicle.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchQuery, dieselData]);

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle adding new entry
  const handleAdd = () => {
    setFormData({
      id: Date.now().toString(),
      date: '',
      vehicle: '',
      type: '',
      qty: '',
    });
    setEditing(false);
    setShowModal(true);
  };

  // Handle edit entry
  const handleEdit = (item) => {
    setFormData(item);
    setEditing(true);
    setShowModal(true);
  };

  // Handle form submit (Add/Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = editing
      ? `http://localhost:8000/DIESEL/${formData.id}`
      : 'http://localhost:8000/DIESEL';
    const method = editing ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method: method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const updatedData = editing
        ? dieselData.map(item => (item.id === formData.id ? formData : item))
        : [...dieselData, formData];
      setDieselData(updatedData);
      setFilteredData(updatedData);
      setShowModal(false);
    }
  };

  // Handle delete entry
  const handleDelete = async (id) => {
    const response = await fetch(`http://localhost:8000/DIESEL/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      const updatedData = dieselData.filter(item => item.id !== id);
      setDieselData(updatedData);
      setFilteredData(updatedData);
    }
  };

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    
    <div style={{ margin: '20px' }}>
      <h2>Diesel Data Table</h2>

      Search Input
      <Form.Group controlId="search">
        <Form.Label>Search by Vehicle:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Search vehicle..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Form.Group>

      {/* Add New Entry Button */}
      <Button variant="primary" onClick={handleAdd} style={{ margin: '10px 0' }}>
        Add New Entry
      </Button>

      {/* Data Table */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Vehicle</th>
            <th>Type</th>
            <th>Quantity (liters)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((item) => (
            <tr key={item.id}>
              <td>{item.date}</td>
              <td>{item.vehicle}</td>
              <td>{item.type}</td>
              <td>{item.qty}</td>
              <td>
                <Button variant="info" onClick={() => handleEdit(item)}>
                  Edit
                </Button>{' '}
                <Button variant="danger" onClick={() => handleDelete(item.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Pagination */}
      <nav>
        <ul className="pagination">
          {Array.from({ length: Math.ceil(filteredData.length / itemsPerPage) }).map(
            (_, index) => (
              <li key={index + 1} className="page-item">
                <button
                  onClick={() => paginate(index + 1)}
                  className="page-link"
                >
                  {index + 1}
                </button>
              </li>
            )
          )}
        </ul>
      </nav>

      {/* Modal for Add/Edit */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editing ? 'Edit Entry' : 'Add New Entry'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="date">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="text"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                placeholder="Enter date (e.g., 2023-09-15)"
              />
            </Form.Group>

            <Form.Group controlId="vehicle">
              <Form.Label>Vehicle</Form.Label>
              <Form.Control
                type="text"
                name="vehicle"
                value={formData.vehicle}
                onChange={handleInputChange}
                placeholder="Enter vehicle"
              />
            </Form.Group>

            <Form.Group controlId="type">
              <Form.Label>Type</Form.Label>
              <Form.Control
                type="text"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                placeholder="Enter type"
              />
            </Form.Group>

            <Form.Group controlId="qty">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                name="qty"
                value={formData.qty}
                onChange={handleInputChange}
                placeholder="Enter quantity (liters)"
              />
            </Form.Group>

            <Button variant="primary" type="submit" style={{ marginTop: '10px' }}>
              {editing ? 'Update' : 'Add'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default CrudTableComponent;

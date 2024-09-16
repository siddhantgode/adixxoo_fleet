import logo from './logo.svg';
import Dadiesel from './Dadiesel';
import AddDieselForm from './DieselListing';
import DataTable from './DataTable';
import CrudTableComponent from './CrudTableComponent';
import Login from './Login';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import './App.css';

function App() {
  return (
    <div className="App">
      <div>
        <img src="https://res.cloudinary.com/dexhxoret/image/upload/v1709107998/aidxoo-black_egjkbp.png" alt="React Image" />


      </div>
      <BrowserRouter>
    
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/"  element={<CrudTableComponent/>}/>
        <Route path="/add" element={<AddDieselForm />} />
        <Route path="/edit/:id" element={<AddDieselForm />} />
        <Route path="/overview" element={<Dadiesel/>} />

      </Routes>
    
      </BrowserRouter>
      
    </div>
  );
}

export default App;

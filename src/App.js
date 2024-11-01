import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'

const EmployeeTable = () => {
  const [employees, setEmployees] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [error, setError] = useState(null);
  const rowsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json'
        );
        setEmployees(response.data);
      } catch (error) {
        setError('Failed to fetch data');
        alert('Failed to fetch data');
      }
    };
    fetchData();
  }, []);

  const totalPages = Math.ceil(employees.length / rowsPerPage);

  const currentPageData = employees.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container">
      <h1>Employee Data Table</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {currentPageData.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage}</span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EmployeeTable;

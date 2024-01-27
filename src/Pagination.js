// Pagination.js

import React, { useState, useEffect } from "react";
import "./Pagination.css";

const Pagination = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      const result = await response.json();
      setData(result);
    } catch (error) {
      alert("Failed to fetch data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = data.slice(startIndex, endIndex);

  return (
    <div>
      <h1>Employee Data Table</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            {/* Add more headers based on your data */}
          </tr>
        </thead>
        <tbody>
          {currentItems.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.role}</td>
              {/* Add more columns based on your data */}
            </tr>
          ))}
        </tbody>
      </table>

      <div>
      <button onClick={handlePrevPage} disabled={currentPage === 1} data-cy="prev-button" >
  Previous
</button>
        <span>
          {" "}
           {currentPage} {" "}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages} data-cy="next-button">
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;

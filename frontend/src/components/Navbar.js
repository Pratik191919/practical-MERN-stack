import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ cartCount, onSearch, onSort }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value); // Call the parent onSearch function with the search query
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Product App
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/create">
                Create Product
              </Link>
            </li>
            <li className="nav-item position-relative">
              <Link className="nav-link" to="/cart">
                Cart
                <span
                  className="badge bg-danger position-absolute top-0 start-100 translate-middle"
                  style={{ fontSize: '0.8rem' }}
                >
                  {cartCount}
                </span>
              </Link>
            </li>
          </ul>
          {/* Right side: Search bar and Sort button */}
          <div className="d-flex ms-3">
            <input
              type="text"
              className="form-control me-2"
              placeholder="Search by name"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button
              className="btn btn-outline-light ms-2"
              onClick={onSort}
            >
              Sort by Price
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

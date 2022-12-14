import React from 'react';
import PropTypes from 'prop-types';
import './header.scss';
import { NavLink } from 'react-router-dom';
import axios from "axios";

const onSave = async (e, code, setCode, quantity, setQuantity, price, setPrice, name, setName, productCategory, setProductCategory) => {
  e.preventDefault();
  await axios.post("http://localhost:8080/api/product", {
    code, quantity, price, name, productCategory,
  }).then((res) => console.log(res)).then(() => {
    setName("");
    setCode("");
    setProductCategory("");
    setPrice(0);
    setQuantity(0);
  });
};

const onDelete = async (e, codesToDelete) => {
  e.preventDefault();

  await axios.delete(`http://localhost:8080/api/product/`, { data: { codesToDelete } });
};

function Header({
  headerText, navText, code, setCode, quantity, setQuantity, price, setPrice, name, setName, productCategory, setProductCategory, codesToDelete, setCodesToDelete,
}) {
  const addButton = (
    <NavLink
      to={navText[0] === 'ADD' ? '/add-product' : ''}
      className="control-button"
    >
      {navText[0]}
    </NavLink>
  );
  const saveButton = (
    <button
      type="button"
      className="add control-button"
      onClick={(e) => onSave(e, code, setCode, quantity, setQuantity, price, setPrice, name, setName, productCategory, setProductCategory)}
    >
      {navText[0]}
    </button>
  );
  const cancelButton = (
    <NavLink to="/" className="control-button">
      {navText[1]}
    </NavLink>
  );
  const deleteButton = (
    <button
      type="button"
      className="add control-button"
      id="delete-product-button"
      onClick={(e) => onDelete(e, codesToDelete)}
    >
      {navText[1]}
    </button>
  );
  return (
    <header id="products-heading">
      <h1>{headerText}</h1>
      <div id="products-control-buttons">
        {navText[0].toLowerCase().charAt(0).toUpperCase() + navText[0].slice(1).toLowerCase() === 'Save' ? saveButton : addButton}
        {navText[1].toLowerCase().charAt(0).toUpperCase() + navText[1].slice(1).toLowerCase() === 'Cancel' ? cancelButton : deleteButton}
      </div>
    </header>
  );
}

Header.propTypes = {
  headerText: PropTypes.string.isRequired,
  navText: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Header;

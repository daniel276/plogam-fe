import axios from "axios";
import {DELETE_SUPPLIER, GET_SUPPLIER, GET_SUPPLIER_CONTACT, GET_SUPPLIER_CONTACTS ,GET_SUPPLIERS} from "./types";

export const addSupplier = (supplierData, history) => async dispatch => {
  try{
    await axios.post("/api/supplier/add-supplier", supplierData);
    history.push("/supplier");
    window.location.reload();
  }catch (e) {
    console.log('err')
  }
};

export const addContactPerson = (ContactPerson, supplier_id) => async dispatch => {
  try{
    await axios.post(`/api/supplier/add-contact/${supplier_id}`, ContactPerson)
    window.location.reload();
  }catch (e) {
    console.log('err')
  }
};

export const updateSupplier = (Supplier) => async dispatch => {
  try {
    await axios.patch("/api/supplier", Supplier);
    window.location.reload();
  }catch (e) {
    console.log('err', e)
  }
};

export const getSuppliers = () => async dispatch => {
  const res = await axios.get("/api/supplier/all");
  dispatch({
    type: GET_SUPPLIERS,
    payload: res.data
  })
};

export const getSupplierContacts = (supplier_id) => async dispatch => {
  const res = await axios.get(`/api/supplier/contacts/${supplier_id}`)
  dispatch({
    type: GET_SUPPLIER_CONTACTS,
    payload: res.data
  })
}

export const getSupplierContact = (supplier_id, contact_id) => async dispatch => {
  const res = await axios.get(`/api/supplier/${supplier_id}/contact/${contact_id}`);
  dispatch({
    type: GET_SUPPLIER_CONTACT,
    payload: res.data
  })
};

export const updateSupplierContact = (ContactPerson, supplier_id) => async dispatch => {
  try{
    await axios.patch(`/api/supplier/update-contact/${supplier_id}`, ContactPerson);
    window.location.reload();
  }catch (e) {
    console.log('error', e);
  }
};

export const deleteSupplier = (supplier_id) => async dispatch => {
  if(window.confirm("Apakah anda yakin ingin menghapus supplier ini?")){
    await axios.delete(`/api/supplier/${supplier_id}`)
    dispatch({
      type: DELETE_SUPPLIER,
      payload: supplier_id
    })
  }
};

export const getSupplier = (id) => async dispatch => {
  const res = await axios.get(`/api/supplier/${id}`);
  dispatch({
    type: GET_SUPPLIER,
    payload: res.data
  })
};


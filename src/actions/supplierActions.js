import axios from "axios";
import {
  DELETE_SUPPLIER,
  GET_ERRORS,
  GET_SUPPLIER, GET_SUPPLIER_BANK_ACCOUNT, GET_SUPPLIER_BANK_ACCOUNTS,
  GET_SUPPLIER_CONTACT,
  GET_SUPPLIER_CONTACTS,
  GET_SUPPLIERS
} from "./types";

export const addSupplier = (supplierData, history) => async dispatch => {
  try{
    await axios.post("/supplier/add-supplier", supplierData);
    history.push("/supplier");
    window.location.reload();
  }catch (e) {
    dispatch({
      type: GET_ERRORS,
      payload: e.response.data
    })
  }
};

export const addContactPerson = (ContactPerson, supplier_id) => async dispatch => {
  try{
    await axios.post(`/supplier/add-contact/${supplier_id}`, ContactPerson);
    window.location.reload();
  }catch (e) {
    dispatch({
      type: GET_ERRORS,
      payload: e.response.data
    })
  }
};

export const addBankAccount = (BankAccount, supplier_id) => async dispatch => {
  try {
    await axios.post(`/bank-account/${supplier_id}`, BankAccount);
    window.location.reload()
  }catch (e) {
    dispatch({
      type: GET_ERRORS,
      payload: e.response.data
    })
  }
};

export const updateSupplier = (Supplier) => async dispatch => {
  try {
    await axios.patch("/supplier", Supplier);
    window.location.reload();
  }catch (e) {
    dispatch({
      type: GET_ERRORS,
      payload: e.response.data
    })
  }
};

export const updateBankAccount = (BankAccount) => async dispatch => {
  try {
    await axios.patch(`/bank-account`, BankAccount);
    window.location.reload();
  }catch (e) {
    dispatch({
      type: GET_ERRORS,
      payload: e.response.data
    })
  }
};

export const getSuppliers = () => async dispatch => {
  const res = await axios.get("/supplier/all");
  dispatch({
    type: GET_SUPPLIERS,
    payload: res.data
  })
};

export const getSupplierContacts = (supplier_id) => async dispatch => {
  const res = await axios.get(`/supplier/contacts/${supplier_id}`);
  dispatch({
    type: GET_SUPPLIER_CONTACTS,
    payload: res.data
  })
};

export const getBankAccounts = (supplier_id) => async dispatch => {
  const res = await axios.get(`/bank-account?supplier_id=${supplier_id}`);
  dispatch({
    type: GET_SUPPLIER_BANK_ACCOUNTS,
    payload: res.data
  })
};

export const getBankAccount = (account_id) => async dispatch => {
  const res = await axios.get(`/bank-account/${account_id}`);
  dispatch({
    type: GET_SUPPLIER_BANK_ACCOUNT,
    payload: res.data
  })
};

export const getSupplierContact = (supplier_id, contact_id) => async dispatch => {
  const res = await axios.get(`/supplier/${supplier_id}/contact/${contact_id}`);
  dispatch({
    type: GET_SUPPLIER_CONTACT,
    payload: res.data
  })
};

export const updateSupplierContact = (ContactPerson, supplier_id) => async dispatch => {
  try{
    await axios.patch(`/supplier/update-contact/${supplier_id}`, ContactPerson);
    window.location.reload();
  }catch (e) {
    console.log('error', e);
  }
};

export const deleteSupplier = (supplier_id) => async dispatch => {
  if(window.confirm("Apakah anda yakin ingin menghapus supplier ini?")){
    await axios.delete(`/supplier/${supplier_id}`);
    dispatch({
      type: DELETE_SUPPLIER,
      payload: supplier_id
    })
  }
};

export const deleteBankAccount = (account_id) => async dispatch => {
  if(window.confirm("Apakah anda yakin untuk menghapus?")){
    await axios.delete(`/bank-account/${account_id}`)
    window.location.reload();
  }
}

export const getSupplier = (id) => async dispatch => {
  const res = await axios.get(`/supplier/${id}`);
  dispatch({
    type: GET_SUPPLIER,
    payload: res.data
  })
};


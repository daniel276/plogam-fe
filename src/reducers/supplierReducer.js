import {
  DELETE_SUPPLIER,
  GET_SUPPLIER, GET_SUPPLIER_BANK_ACCOUNT,
  GET_SUPPLIER_BANK_ACCOUNTS,
  GET_SUPPLIER_CONTACT,
  GET_SUPPLIER_CONTACTS,
  GET_SUPPLIERS
} from "../actions/types";

const initialState = {
  suppliers: [],
  supplier: {},
  contacts: [],
  contact: {},
  bankAccounts: [],
  bankAccount: {}
};

export default function(state = initialState, action){
  switch (action.type) {
    case GET_SUPPLIERS:
      return {
        ...state,
        suppliers: action.payload
      };

      case GET_SUPPLIER:
        return {
          ...state,
          supplier: action.payload
        };

      case GET_SUPPLIER_CONTACT:
        return{
          ...state,
          contact: action.payload
        };

      case GET_SUPPLIER_CONTACTS:
        return {
          ...state,
          contacts: action.payload
        };

      case GET_SUPPLIER_BANK_ACCOUNT:
        return {
          ...state,
          bankAccount: action.payload
        };

      case GET_SUPPLIER_BANK_ACCOUNTS:
        return {
          ...state,
          bankAccounts: action.payload
        };

      case DELETE_SUPPLIER:
        return {
          ...state,
          suppliers: state.suppliers.filter(supplier => (supplier.id !== action.payload))
        };

    default:
      return state;

  }
}
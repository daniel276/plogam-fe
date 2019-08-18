import { GET_SUPPLIERS } from "../actions/types";

const initialState = {
  supplier: {},
  suppliers: []
};

export default function(state = initialState, action){
  switch (action.type) {
    case GET_SUPPLIERS:
      return {
        ...state,
        suppliers: action.payload
      };

    default:
      return state;

  }
}
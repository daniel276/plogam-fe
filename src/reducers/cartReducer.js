import {SEARCH_ITEMS, ADD_CART, REMOVE_ITEM, ADD_QUANTITY, SUB_QUANTITY, RESET_CART } from "../actions/types";

const initialState = {
  searchItems: [],
  cartItems: [],
  total: 0,
  isLoading: false
};

export default function(state = initialState, action){
  switch (action.type) {
    case SEARCH_ITEMS:
      return {
        ...state,
        searchItems: action.payload
      };

    case ADD_CART:
      const { content = [] } = state.searchItems;
      let cartItem = content.find(item => item.id === action.payload);
      //check if the action id exists in the addedItems
      let existedItems = state.cartItems.find(item => action.payload === item.id);
      if(existedItems){
        cartItem.quantity += 1;
        return {
          ...state
        }
      }else{
        cartItem.quantity = 1;
        return {
          ...state,
          cartItems: [...state.cartItems, cartItem]
        }
      }

    case REMOVE_ITEM:
      // let itemToRemove = state.cartItems.find(item => action.payload === item.id);
      let newItems = state.cartItems.filter(item => action.payload !== item.id);
      return {
        ...state,
        cartItems: newItems
      };

    case ADD_QUANTITY:
      const { content: contents = [] } = state.searchItems;
      // let addedItems1 = state.cartItems.find(item => action.payload === item.id);
      let cartItem1 = contents.find(item => item.id === action.payload);
      cartItem1.quantity += 1;
      return{
        ...state,
      };

    case SUB_QUANTITY:
      let addedItems2 = state.cartItems.find(item => item.id === action.payload);
      if(addedItems2.quantity === 1){
        let newItems = state.cartItems.filter(item => item.id !== action.payload);
        return {
          ...state,
          cartItems: newItems
        }
      }else{
        addedItems2.quantity -= 1;
        return {
          ...state
        }
      }

    case RESET_CART:
      return {
        ...state,
        cartItems: []
      };


    default:
      return state;
  }
}
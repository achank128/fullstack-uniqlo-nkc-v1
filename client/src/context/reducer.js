import { actionTypes } from "./actionTypes";

const reducer = (state, action) => {
  if (action.type === actionTypes.ADD_TO_WISH_LIST) {
    const isItemInWishList = state.cart.find(
      (item) => item._id === action.payload.item._id
    );
    if (isItemInWishList) {
      return state;
    }
    const newWishList = [...state.wishList, action.payload.item];
    localStorage.setItem("wishList", JSON.stringify(newWishList));
    return { ...state, wishList: newWishList };
  }

  if (action.type === actionTypes.REMOVE_FROM_WISH_LIST) {
    const newWishList = state.wishList.filter((item) => {
      return item._id !== action.payload;
    });
    localStorage.setItem("wishList", JSON.stringify(newWishList));
    return { ...state, wishList: newWishList };
  }

  if (action.type === actionTypes.ADD_TO_CART) {
    let newCart = [];
    const isItemInCart = state.cart.find(
      (item) => item._id === action.payload.item._id
    );

    if (isItemInCart) {
      if (
        isItemInCart.color === action.payload.color &&
        isItemInCart.size === action.payload.size
      ) {
        newCart = state.cart.map((item) =>
          item._id === action.payload.item._id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        newCart = [
          ...state.cart,
          {
            ...action.payload.item,
            itemId: action.payload.itemId,
            color: action.payload.color,
            size: action.payload.size,
            quantity: action.payload.quantity,
          },
        ];
      }
    } else {
      newCart = [
        ...state.cart,
        {
          ...action.payload.item,
          itemId: action.payload.itemId,
          color: action.payload.color,
          size: action.payload.size,
          quantity: action.payload.quantity,
        },
      ];
    }
    localStorage.setItem("cart", JSON.stringify(newCart));
    return { ...state, cart: newCart };
  }

  if (action.type === actionTypes.REMOVE_ITEM) {
    const newCart = state.cart.filter((item) => {
      return item.itemId !== action.payload;
    });
    localStorage.setItem("cart", JSON.stringify(newCart));
    return { ...state, cart: newCart };
  }

  if (action.type === actionTypes.INCREASE) {
    const newCart = state.cart.map((item) => {
      if (item.itemId === action.payload) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    localStorage.setItem("cart", JSON.stringify(newCart));
    return { ...state, cart: newCart };
  }

  if (action.type === actionTypes.SET_QUANTITY) {
    const newCart = state.cart.map((item) => {
      if (item.itemId === action.payload.id) {
        return { ...item, quantity: action.payload.quantity };
      }
      return item;
    });
    localStorage.setItem("cart", JSON.stringify(newCart));
    return { ...state, cart: newCart };
  }

  if (action.type === actionTypes.CHECKOUT) {
    localStorage.removeItem("cart");
    return { ...state, cart: [] };
  }

  if (action.type === actionTypes.SEARCH) {
    return { ...state, search: action.payload };
  }

  if (action.type === actionTypes.SET_CART) {
    return { ...state, cart: action.payload };
  }

  if (action.type === actionTypes.SET_WISH_LIST) {
    return { ...state, wishList: action.payload };
  }

  if (action.type === actionTypes.GET_TOTALS) {
    let { subtotal, amount } = state.cart.reduce(
      (cartTotal, item) => {
        const { quantity, priceLimited } = item;
        cartTotal.amount += quantity;
        cartTotal.subtotal += quantity * priceLimited;
        return cartTotal;
      },
      { subtotal: 0, amount: 0 }
    );
    return { ...state, subtotal, amount, total: subtotal + state.shippingFee };
  }

  throw new Error("no matching action type");
};

export default reducer;

export const objToString = (obj) => {
  return Object.values(obj);
};
// random number 5 digits not match
// create code "A55555"
export const codeProduct = () => {
  const number5dig = Math.floor(Math.random() * 90000) + 10000;
  return "A" + number5dig.toString();
};

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem("state");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
};

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("state", serializedState);
  } catch (e) {
    // Ignore write errors;
  }
};
// tính tổng sản phẩm trong giỏ hàng
export const totalProduct = (cartItems) => {
  let total = 0;
  for (let i = 0; i < cartItems.length; i++) {
    total += cartItems[i].cartQuantity;
  }
  return total;
};
// check field of obj isEmpty?
export const checkProperties = (obj) => {
  let listErrors = [];
  for (let key in obj) {
    if (obj[key] === false || obj[key] === "") {
      listErrors.push(key);
    }
  }
  return listErrors;
};
export const getTotalPrice = (cart) => {
  let totalPrice = 0;
  for (let i = 0; i < cart.length; i++) {
    totalPrice += cart[i].cartQuantity * (cart[i].price * 1);
  }
  return totalPrice;
};

export const priceAfterDiscount = (cart, coupon, element) => {
  let totalReturnedPrice = getTotalPrice(cart);
  switch (element) {
    case coupon[0]:
      let reducedPrice1 = (totalReturnedPrice * 5) / 100;
      totalReturnedPrice -= reducedPrice1;
      break;
    case coupon[1]:
      let reducedPrice2 = (totalReturnedPrice * 10) / 100;
      totalReturnedPrice -= reducedPrice2;
      break;
    case coupon[2]:
      let reducedPrice3 = (totalReturnedPrice * 20) / 100;
      totalReturnedPrice -= reducedPrice3;
      break;
    default:
      return false;
  }
  return totalReturnedPrice;
};
// so sanh 2 obj
export const shallowEqual = (object1, object2) => {
  let arr = [];
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);
  for (let key of keys1) {
    if (object1[key] === object2[key]) {
      arr.push(key);
    }
  }
  return arr;
};

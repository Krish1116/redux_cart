import { cartAction } from "./cartSlice";
import { uiAction } from "./uiSlice";

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiAction.setNotification({
        status: "pending",
        title: "Sending...",
        message: "Sending cart data!",
      })
    );

    const sendRequest = async () => {
      const res = await fetch(
        `https://expensetracker-d6e2d-default-rtdb.firebaseio.com/cart.json`,
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        }
      );

      if (!res.ok) {
        throw new Error("sending cart data failed.");
      }
    };
    try {
      await sendRequest();
      dispatch(
        uiAction.setNotification({
          status: "success",
          title: "Success",
          message: "Sent cart data successfully!",
        })
      );
    } catch (err) {
      dispatch(
        uiAction.setNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed!",
        })
      );
    }
  };
};

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchData = async () => {
      const res = await fetch(
        "https://expensetracker-d6e2d-default-rtdb.firebaseio.com/cart.json"
      );
      if (!res.ok) {
        throw new Error("Could not fetch cart data!");
      }
      const data = await res.json();
      return data;
    };
    try {
      const cartData = await fetchData();
      dispatch(
        cartAction.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
        })
      );
    } catch (err) {
      dispatch(
        uiAction.setNotification({
          status: "error",
          title: "Error!",
          message: "Fetching cart data failed!",
        })
      );
    }
  };
};

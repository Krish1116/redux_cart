import { useDispatch, useSelector } from "react-redux";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useEffect } from "react";
import { Fragment } from "react";
import Notification from "./components/UI/Notification";
import { fetchCartData, sendCartData } from "./components/Store/cart-action";

let isInitial = true;

function App() {
  const showCart = useSelector((state) => state.ui.isCartOpen);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.ui.notfication);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    // the async code with inside the component
    // const sendCartData = async () => {
    //   dispatch(
    //     uiAction.setNotification({
    //       status: "pending",
    //       title: "Sending...",
    //       message: "Sending cart data!",
    //     })
    //   );
    //   const res = await fetch(
    //     `https://expensetracker-d6e2d-default-rtdb.firebaseio.com/cart.json`,
    //     {
    //       method: "PUT",
    //       body: JSON.stringify(cart),
    //     }
    //   );
    //   if (!res.ok) {
    //     throw new Error("sending cart data failed.");
    //   }
    //   const resData = await res.json();
    //   dispatch(
    //     uiAction.setNotification({
    //       status: "success",
    //       title: "Success",
    //       message: "Sent cart data successfully!",
    //     })
    //   );
    // };
    // if (isInitial) {
    //   isInitial = false;
    //   return;
    // }
    // sendCartData().catch((err) => {
    //   dispatch(
    //     uiAction.setNotification({
    //       status: "error",
    //       title: "Error!",
    //       message: "Sending cart data failed!",
    //     })
    //   );
    // });

    if (isInitial) {
      isInitial = false;
      return;
    }

    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;

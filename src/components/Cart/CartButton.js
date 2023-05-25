import { useDispatch, useSelector } from "react-redux";
import classes from "./CartButton.module.css";
import { uiAction } from "../Store/uiSlice";

const CartButton = (props) => {
  const dispatch = useDispatch();
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);

  const toggaleCart = () => {
    // we execute the toggle as a method bcz these auto-generated actions which you get here are actually action creator methods which u have to execute they return action obj. so it's then this returned action obj which dispatch here
    dispatch(uiAction.toggle());
  };
  return (
    <button className={classes.button} onClick={toggaleCart}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartQuantity}</span>
    </button>
  );
};

export default CartButton;

import "./Header.css";
import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Link } from "react-router-dom";
import { getNumberOfProductInBasket } from "./../store/features/productSlice";
import { useSelector } from "react-redux";
import { getUser } from "../store/features/userSlice";
import { auth } from "../firebase";

function Header() {
  const selectUser = useSelector(getUser);
  const getItemsInTheBasket = useSelector(getNumberOfProductInBasket);
  const handelAuthentication = () => {
    if (selectUser) {
      auth.signOut();
    }
  };

  return (
    <div className="header">
      <Link to="/">
        <div className="header__logo">
          <img
            src="https://www.nicepng.com/png/full/16-167642_amazon-logo-amazon-logo-white-text.png"
            alt=""
          />
        </div>
      </Link>

      <div className="header__search">
        <input type="text" />
        <SearchIcon className="header__searchIcon" />
      </div>

      <div className="header__nav">
        <Link to={!selectUser ? "/login" : "/"}>
          <div className="header__option" onClick={handelAuthentication}>
            <span className="header__optionLineOne">
              Hello {selectUser ? selectUser.email : "Guest"}
            </span>
            <span className="header__optionLineTwo">
              {!selectUser ? "Sign In" : "Sign Out"}
            </span>
          </div>
        </Link>

        <Link to="/orders">
          <div className="header__option">
            <span className="header__optionLineOne">Returns</span>
            <span className="header__optionLineTwo">& Orders</span>
          </div>
        </Link>

        <div className="header__option">
          <span className="header__optionLineOne">Your</span>
          <span className="header__optionLineTwo">Prime</span>
        </div>

        <Link to="/ckeckout">
          <div className="header__optionBasket">
            <ShoppingBasketIcon />
            <span className="header__optionLineTwo header__basketCount">
              {getItemsInTheBasket ? getItemsInTheBasket : 0}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;

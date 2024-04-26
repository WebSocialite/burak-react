import React, { useEffect } from "react";
import Statistics from "./Statistics";
import PopularDishes from "./PopularDishes";
import NewDishes from "./NewDishes";
import Advertisement from "./Advertisement";
import ActiveUsers from "./ActiveUsers";
import Events from "./Events";
import { useDispatch,  } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setNewDishes, setPopularDishes, setTopUsers } from "./slice";
import { Product } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import { ProductCollection } from "../../../lib/enums/product.enum";
import MemberService from "../../services/MemberService";
import { Member } from "../../../lib/types/member";
import "../../../css/home.css";

//** REDUX SLICE & SELECTOR */
const actionDispatch = (dispatch: Dispatch) => ({ //SLICE
  setPopularDishes: (data: Product[]) => dispatch(setPopularDishes(data)),
  setNewDishes: (data: Product[]) => dispatch(setNewDishes(data)),
  setTopUsers: (data: Member[]) => dispatch(setTopUsers(data)),
  
});

export default function HomePage() {
  const { setPopularDishes, setNewDishes, setTopUsers } = actionDispatch(useDispatch());  // redux storagemizga yukalandigan function
      // Selector: Store => Data  
  console.log(process.env.REACT_APP_API_URL);
    useEffect(() => {
    // BackEnd server data fetch(request) => DATA
      const product = new ProductService();
      product        // product object ga getProduct methodini biriktirib unda pasdagilarni buyurayapmiz
      .getProducts({
        page: 1,
        limit: 4,
        order: "productViews",
        productCollection: ProductCollection.DISH
      })
      .then(data => {
        console.log("DATA PASSED HERE===>", data);
        setPopularDishes(data);
      })
      .catch((err) => console.log(err));

      product
      .getProducts({
        page: 1,
        limit: 4,
        order: "createdAt"
      })
      .then(data => {
        setNewDishes(data);
      })
      .catch((err) => console.log(err));

      const member = new MemberService();
      member
      .getTopUsers()
      .then(data => {
        setTopUsers(data);
      })
      .catch((err) => console.log(err));

    }, []);

  
      
      
      // Slice: Data => Store
    return (
      <div className={"homepage"}>
        <Statistics/>
        <PopularDishes/>
        <NewDishes/>
        <Advertisement/>
        <ActiveUsers/>
        <Events/>
      </div>
    );
  }
  
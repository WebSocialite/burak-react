    
               /**        TYPE   INTEGRATION      **/

import { Member } from "./member";
import { Order } from "./order";
import { Product } from "./product";


/** REACT APP STATE */
export interface AppRootState {
    homePage: HomePageState;
    productsPage: ProductsPageState;
    ordersPage: OrdersPageState;
}


/**  HOMEPAGE screen component related interfaces */
export interface HomePageState {
    popularDishes: Product[];
    newDishes: Product[];
    topUsers: Member[];
}


/**  PRODUCTS PAGE screen component related interfaces */
export interface ProductsPageState {
    restaurant: Member | null;
    chosenProduct: Product | null;
    products: Product[];
}


/**  ORDERS PAGE screen component related interfaces */

export interface OrdersPageState {
    pausedOrders: Order[];
    processOrders: Order[];
    finishedOrders: Order[];
}
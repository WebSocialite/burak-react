import { Box, Stack } from "@mui/material";
import React from "react";
import Button from "@mui/material/Button";
import TabPanel from "@mui/lab/TabPanel";
import moment from "moment";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import { retrieveProcessOrders } from "./selector";
import { serverApi } from "../../../lib/config";
import { Order, OrderItem } from "../../../lib/types/order";
import { Product } from "../../../lib/types/product";

const processOrdersRetriever = createSelector( // SELECTOR
  retrieveProcessOrders, 
  (processOrders) => ({ processOrders })
  );



export default function ProcessOrders() {
    const { processOrders } = useSelector(processOrdersRetriever);  
    return (
    <TabPanel value={"2"}>
         <Stack>
         {processOrders?.map((order: Order) => {     //order ni soni
                return (
                    <Box key={order._id} className={"order-main-box"}>
                        <Box className={"order-box-scroll"}>
                        {order?.orderItems?.map((item: OrderItem) => {  //order ichidagi productlar soni
                            const product: Product = order.productData.filter(
                                (ele: Product) => item.productId === ele._id)
                                [0];
                                const imagePath = `${serverApi}/${product.productImages[0]}`;
                                return (
                                    <Box key={item._id} className={"orders-name-price"}>
                                    <img 
                                    src={imagePath}
                                    className={"order-dish-img"}
                                    />
                                    <p className={"title-dish"}>{product.productName}</p>
                                    <Box className={"price-box"}>
                                        <p>${item.itemPrice}</p>
                                        <img src={"/icons/close.svg"} />
                                        <p>{item.itemQuantity}</p>
                                        <img src={"/icons/pause.svg"} />
                                        <p style={{ marginLeft: "15px"}}>
                                            ${item.itemQuantity * item.itemPrice}</p>
                                    </Box>
                                    </Box>
                                    );
                            })} 
                          
                          <Box className={"total-price-box"}>
                            <Box className={"box-total"}>
                                <p>${order.orderTotal - order.orderDelivery}</p>
                                <p>$22</p>
                                <img src="/icons/plus.svg"  style={{ marginLeft: "20px" }}/>
                                <p>Delivery cost</p>
                                <p>${order.orderDelivery}</p>
                                <img src="/icons/pause.svg"  style={{ marginLeft: "20px" }}/>
                                <p>Total</p>
                                <p>${order.orderTotal}</p>
                            </Box>
                            <p className="data-compl">
                                {moment().format("YY-MM-DD HH:mm")}
                            </p>
                            <Button variant="contained" className="verify-button">Verify to Fulfill</Button>
                          </Box>
                        </Box>
                    </Box>
                );
            })}

{!processOrders || (processOrders.length === 0 && (//agar bunga true bersak PAUSED ORDERSDA no-image-list PAYDO BOLADI
                <Box display={"flex"} flexDirection={"row"} justifyContent={"center"}>
                    <img 
                    src="/icons/noimage-list.svg"
                    style={{width: 300, height: 300 }}
                    />
                </Box>
            ))}
        </Stack>
    </TabPanel>
 );
}
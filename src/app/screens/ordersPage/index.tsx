import { useState, SyntheticEvent, useEffect } from "react";
import { Container, Stack, Box } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import PausedOrders from "./PausedOrders";
import ProcessOrders from "./ProcessOrders";
import FinishedOrders from "./FinishedOrders";
import { useDispatch,  } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setPausedOrders, setProcessOrders, setFinishedOrders } from "./slice";
import { Order, OrderInquiry } from "../../../lib/types/order";
import { OrderStatus } from "../../../lib/enums/order.enum";
import OrderService from "../../services/OrderService";
import { useGlobals } from "../../hooks/useGlobals";
import "../../../css/order.css";

const actionDispatch = (dispatch: Dispatch) => ({ //SLICE
  setPausedOrders: (data: Order[]) => dispatch(setPausedOrders(data)),
  setProcessOrders: (data: Order[]) => dispatch(setProcessOrders(data)),
  setFinishedOrders: (data: Order[]) => dispatch(setFinishedOrders(data)),
  
});


export default function OrdersPage() {

  const { setPausedOrders, setProcessOrders, setFinishedOrders } = 
  actionDispatch(useDispatch());
  const { orderBuilder } = useGlobals();
  const [value, setValue] = useState("1"); // boshlang'ich page ni qiymati
  const [ orderInquiry, setOrderInquiry] = useState<OrderInquiry>({
    page: 1,
    limit: 5,
    orderStatus: OrderStatus.PAUSE,
  });

  useEffect(() => {
    const order = new OrderService();

    order
    .getMyOrders({...orderInquiry, orderStatus: OrderStatus.PAUSE})
    .then(data => setPausedOrders(data))
    .catch(err => console.log(err));

    order
    .getMyOrders({...orderInquiry, orderStatus: OrderStatus.PROCESS})
    .then(data => setProcessOrders(data))
    .catch(err => console.log(err));

    order
    .getMyOrders({...orderInquiry, orderStatus: OrderStatus.FINISH})
    .then(data => setFinishedOrders(data))
    .catch(err => console.log(err));

  }, [orderInquiry, orderBuilder]
);
  /**     HANDLERS     **/


  const handleChange = (e: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className={"order-page"}>
      <Container className="order-container">
        <Stack className={"order-left"}>
          <TabContext value={value}>
             <Box className={"order-nav-frame"}>
              <Box sx={{ borderBottom: 1, borderColor: "divider "}}>
                <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                className={"table-list"}
                >
                  <Tab label="PAUSED ORDERS" value={"1"} />
                  <Tab label="PROCESS ORDERS" value={"2"} />
                  <Tab label="FINISHED ORDERS" value={"3"} />
                </Tabs>
              </Box>
             </Box>
             <Stack className={"order-main-context"}>
              <PausedOrders setValue={setValue}/>
              <ProcessOrders setValue={setValue}/>
              <FinishedOrders />
             </Stack>
          </TabContext>
        </Stack>


        <Stack className={"order-right"}>
          <Box className={"order-info-box"}>
            <Box className={"member-box"}>
              <div className={"order-user-img"}>
                <img alt='' src={"/img/justin.webp"} className={"order-user-avatar"} />
                <div className={"order-user-icon-box"}>
                  <img alt='' src={"/icons/user-badge.svg"} className={"order-user-prof-img"} />
                </div>
              </div>
              <span className={"order-user-name"}>Bob</span>
              <span className={"order-user-prof"}>User</span>
            </Box>
            <Box className={"liner"}></Box>
            <Box className={"order-user-address"}>
              <div style={{ display: "flex" }}>
              </div>
              <div className={"spec-address-txt"}>Yeosu, South Korea</div>
            </Box>
          </Box>
          <Box className={"order-info-box"} sx={{ mt: "15px" }}>
            <input
              type={"text"}
              name={"cardNumber"}
              placeholder={"Card number : **** 7777 7777 7777"}
              className={"card-input"}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <input type={"text"} name={"cardPeriod"} placeholder={"07 / 24"} className={"card-half-input"} />
              <input type={"text"} name={"cardCVV"} placeholder={"CVV : 010"} className={"card-half-input"} />
            </div>
            <input type={"text"} name={"cardCreator"} placeholder={"Justin Gaejhe"} className={"card-input"} />
            <div className={"cards-box"}>
              <img alt='' src={"/icons/western-card.svg"} />
              <img alt='' src={"/icons/master-card.svg"} />
              <img alt='' src={"/icons/paypal-card.svg"} />
              <img alt='' src={"/icons/visa-card.svg"} />
            </div>
          </Box>
        </Stack>
      </Container>
    </div>
  );
}
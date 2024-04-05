import { useState, SyntheticEvent } from "react";
import { Container, Stack, Box } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import LocationOnIcon from "@mui/icons-material/locationOn";
import PausedOrders from "./PausedOrders";
import ProcessOrders from "./PausedOrders";
import FinishedOrders from "./FinishedOrders";
import "../../../css/order.css";


export default function OrdersPage() {
  const [value, setValue] =useState("1"); // boshlang'ich page ni qiymati

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
              <PausedOrders />
              <ProcessOrders />
              <FinishedOrders />
             </Stack>
          </TabContext>
        </Stack>
        <Stack className={"order-right"}>
          <Box className={"order-info-box"}>
          <Box className={"member-box"}>
            <div className={"order-user-img"}>
              <img src="/icons/default-user.svg"
              className="order-user-avatar"/>
            
            <div className="order-user-icon-box">
              <img 
              src="/icons/user-badge.svg"
              className="order-user-prof-img"/>
            </div>
            </div>
            <span className="order-user-name"></span>
            <span className="order-user-prof"></span>
          </Box>
          <Box className="liner"></Box>


          </Box>
        </Stack>

      </Container>
    </div>
  );
  }
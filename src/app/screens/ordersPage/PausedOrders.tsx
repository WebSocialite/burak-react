import { Box, Stack } from "@mui/material";
import React from "react";
import Button from "@mui/material/Button";
import TabPanel from "@mui/lab/TabPanel";
import moment from "moment";




export default function PausedOrders() {
    return (
    <TabPanel value={"1"}>
         <Stack>
            {[1, 2].map((ele, index) => {     //order ni soni
                return (
                    <Box key={index} className={"order-main-box"}>
                        <Box className={"order-box-scroll"}>
                            {[1, 2, 3].map((ele2, index2) => {  //order ichidagi productlar soni
                                return (
                                    <Box key={index2} className={"orders-name-price"}>
                                    <img 
                                    src={"/img/lavash.webp"}
                                    className={"order-dish-img"}
                                    />
                                    <p className={"title-dish"}>Lavash</p>
                                    <Box className={"price-box"}>
                                        <p>$9</p>
                                        <img src={"/icons/close.svg"} />
                                        <p>2</p>
                                        <img src={"/icons/pause.svg"} />
                                        <p style={{ marginLeft: "15px"}}>$24</p>
                                    </Box>
                                    </Box>
                                    );
                            })} 
                          </Box>
                          <Box className={"total-price-box"}>
                            <Box className={"box-total"}>
                                <p>Products price</p>
                                <p>$22</p>
                                <img src="/icons/pause.svg"
                                style={{ marginLeft: "20px" }}/>
                                <p>Total</p>
                                <p>$24</p>
                            </Box>
                            <p className="data-compl">
                                {moment().format("YY-MM-DD HH:mm")}
                            </p>
                            <Button variant="contained" className="verify-button">Verify to Fullfill</Button>
                          </Box>
                          </Box>
                );
            })}

    {false && ( //agar bunga true bersak PAUSED ORDERSDA no-image-list PAYDO BOLADI
                <Box display={"flex"} flexDirection={"row"} justifyContent={"center"}>
                    <img 
                    src="/icons/noimage-list.svg"
                    style={{width: 300, height: 300 }}
                    />
                </Box>
            )}
        </Stack>
    </TabPanel>
 );
}
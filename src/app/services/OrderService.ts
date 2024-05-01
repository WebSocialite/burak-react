import axios from "axios";  
import { serverApi } from "../../lib/config";
import { CartItem } from "../../lib/types/search";
import { Order, OrderInquiry, OrderItemInput, OrderUpdateInput } from "../../lib/types/order";

class OrderService {
    private readonly path: string;

    constructor() {
        this.path = serverApi;

    }
    public async createOrder(input: CartItem[]): Promise<Order> {
        try {
            const orderItems: OrderItemInput[] = input.map((cartItem: CartItem) => {
                return {
                    itemQuantity: cartItem.quantity,
                    itemPrice: cartItem.price,
                    productId: cartItem._id,
                };
            });

            const url = `${this.path}/order/create`;
            const result = await axios.post(url, orderItems, {
                withCredentials: true,
            });
            console.log("createOrder:", result );

            return result.data;

        } catch(err) {
            console.log("Error. createOrder:", err );
            throw err;
        }
    }

    public async getMyOrders(input: OrderInquiry): Promise<Order[]> {     // !!! OrderInquir with [] or not
        try {
            axios.defaults.withCredentials = true;
            const url = `${this.path}/order/all`;
            const query = `?page=${input.page}&limit=${input.limit}&orderStatus=${input.orderStatus}`;

            const result = await axios.get(url + query, {});
            console.log('getMyOrder:', result);

            return result.data;
        } catch(err) {
            console.log("Error. createOrder:", err );
            throw err;
        }
    }

    public async updateOrder(input: OrderUpdateInput): Promise<Order[]> {     // !!! OrderInquir with [] or not
        try {
            const url = `${this.path}/order/update`;
            const result = await axios.post(url, input, { withCredentials: true});
            console.log("updateOrder:", result);

            return result.data;
        } catch(err) {
            console.log("Error. createOrder:", err );
            throw err;
        }
    }



}
export default OrderService;


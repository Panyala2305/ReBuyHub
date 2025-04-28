import authReducer from "./reducers/authReducer";
import cartReducer from "./reducers/cartReducer";

const rootReducer = {

    auth: authReducer,
    cart: cartReducer,
    
}
export default rootReducer;
import {useEffect,useReducer,createContext,useContext} from "react";
const CartContext = createContext();
const reducer = (state,action) => {
    switch(action.type){
        case "UPDATE_CART":
            const items = action.payload;
            const {total_items,subtotal} = items.reduce((prev,cur) => {
                let {price,userQty} = cur;
                prev.total_items += userQty;
                prev.subtotal += price * userQty;
                return prev;
            },{total_items:0,subtotal:0});
            return {...state,items,total_items,subtotal};
        default:
            return state;
    }
}
const getInitialState = () => {
    let obj = {items:[],total_items:0,subtotal:0,shipping_fee:100};
    try{
        const cart = localStorage.getItem("cart");
        return cart ? JSON.parse(cart) : obj;
    }catch(err){
        return obj;
    }
}
const initialState = getInitialState();
const CartProvider = ({children}) => {
    console.log("App > CartProvider");
    const [state,dispatch] = useReducer(reducer,initialState);
    useEffect(() => {
        localStorage.setItem("cart",JSON.stringify(state));
    },[state]);
    const plusMinusQty = ({type,productData}) => {
        const {id,stock,userQty,userClr} = productData;
        if(type === "INCBYQTY"){
            const itemExists = state.items.find(pro => pro.id === id && pro.userClr === userClr);
            if(itemExists){
                (itemExists.userQty + userQty) <= stock ? plusMinusQty({type:"INC",productData}) : plusMinusQty({type:"SET_MAX_QTY",productData});
            }else{
                dispatch({type:"UPDATE_CART",payload:[...state.items,productData]});
            }
        }else{
            let payload = [];
            if(type === "INC" || type === "DEC"){
                payload = state.items.map(pro => pro.id === id && pro.userClr === userClr ? ({...pro,userQty:pro.userQty+userQty}):pro);
                if(type === "DEC"){ payload = payload.filter(pro => pro.userQty !== 0) }
            }else if(type === "SET_MAX_QTY"){
                payload = state.items.map(pro => pro.id === id && pro.userClr === userClr ? ({...pro,userQty:pro.stock}):pro);
            }else{
                payload = state.items.filter(pro => !(pro.id === id && pro.userClr === userClr));
            }
            dispatch({type:"UPDATE_CART",payload});
        }
    }
    const validatedFromServer = (payload) => dispatch({type:"UPDATE_CART",payload});
    const clearCart = () => dispatch({type:"UPDATE_CART",payload:[]});
    return(
        <CartContext.Provider value={{...state,plusMinusQty,validatedFromServer,clearCart}}>
            {children}
        </CartContext.Provider>
    )
}
const useCartContext = () => {
    return useContext(CartContext);
}
export {CartProvider,useCartContext};
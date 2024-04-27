import styled from "styled-components";
import StyledSection from "./styles/StyledSection";
import ColorPicker from "./styles/ColorPicker";
import CartIncDec from "./partials/CartIncDec";
import { MdDelete } from "react-icons/md";
import {NavLink,useNavigate} from "react-router-dom";
import Button from "./styles/Button";
import {useState,useEffect} from "react";
import {useCartContext} from "./partials/CartProvider";
import {formatCurrency} from "./utils/methods";
const StyledCart = styled(StyledSection)`
    flex-direction: column;
    min-height: 100vh;
    .table{
        width:100%;
        color: ${({theme}) => theme.colors.bg};
        .tr{
            display:flex;
            justify-content:space-between;
            align-items:center;
        }
        .thead{
            padding: 10px;
            border-bottom: 2px solid black;
            text-transform: uppercase;
            letter-spacing: 1px;
            b{
                display:block;
            }
        }
        .tbody{
            padding: 10px 5px;
            flex-wrap: wrap;
            .img{
                display: flex;
                img{
                    width: 70px;
                    height: 50px;
                    object-fit: contain;
                }
                .name-clr{
                    p,a{
                        padding:2px 10px;
                        display:block;
                    }
                }
            }
            b{
                color:red;
                font-size:20px;
                cursor:pointer;
            }
        }
        .td-1{
            width:30%;
        }
        .td-2,.td-3,.td-4,.td-5{
            width:15%;
        }
        .td-2,.td-4,.td-5{
            text-align:center;
        }
        .tfoot{
            padding: 10px;
            border-top: 2px solid black;
            flex-wrap:wrap;
        }
    }
    .sub-total{
        display:flex;
        justify-content:flex-end;
        width:100%;
        .box{
            padding: 15px;
            background-color: whitesmoke;
            width:250px;
            p{
                padding: 10px 0px;
                display:flex;
                justify-content:space-between;
            }
            hr{
                width:100%;
                height:3px;
                background-color: ${({theme}) => theme.colors.text2};
            }
        }
    }
    @media (max-width: ${({theme}) => theme.media.tab}){
        .table{
            .thead{
                display:none;
            }
            .tbody{
                border-top: 2px solid black;
            }
            .td-1{
                width:max-content;
                max-width:300px;
                padding:5px;
            }
            .td-2,.td-3,.td-4,.td-5{
                width:max-content;
                max-width:200px;
                padding:5px;
            }
        }
        .sub-total{
            .box{
                width:100%;
            }
        }
    }
`;
const CartButton = styled(Button)`
    font-size:14px;
    letter-spacing:2px;
    background-color:${({$bg,theme}) => $bg ?? theme.colors.text2};
    border:2px solid ${({$bg,theme}) => $bg ?? theme.colors.text2};
`;
const Item = ({id,stock,name,price,image,userQty,userClr,plusMinusQty}) => {
    console.log("App > Cart > Item");
    const incDecQty = ({type}) => {
        const productData = {id,stock,name,price,image,userQty:type === "INC" ? 1 : -1,userClr};
        if(type === "INC"){
            userQty < stock ? plusMinusQty({type,productData}) : alert(`Max Allowed QTY Is ${stock}`);
        }else{
            plusMinusQty({type,productData});
        }
    }
    return(
        <div className="tr tbody">
            <div className="td-1 img">
                <img src={`/images/products/${image}`} alt={name} />
                <div className="name-clr">
                    <NavLink to={`/single_product/${id}`}>{name}</NavLink>
                    <p>Color: <ColorPicker title={userClr} $clr={userClr} /></p>
                </div>
            </div>
            <p className="td-2">{formatCurrency(price)}</p>
            <div className="td-3"><CartIncDec qty={userQty} incDecQty={incDecQty} /></div>
            <p className="td-4">{formatCurrency(price*userQty)}</p>
            <b className="td-5" onClick={() => plusMinusQty({type:"REMOVE",productData:{id,userClr}})}><MdDelete /></b>
        </div>
    )
}
const Cart = () => {
    console.log("App > Cart");
    const [isLoading,setLoading] = useState(false);
    const {items,subtotal,shipping_fee,plusMinusQty,validatedFromServer,clearCart} = useCartContext();
    const navigate = useNavigate();
    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            validatedFromServer(items);
            setLoading(false);
        },2000);
    },[]);
    return(
        <StyledCart>
            {isLoading && (<h1>Loading...</h1>) || (!items.length && <h1>Cart Is Empty</h1>) || 
            (<>
                <div className="table">
                    <div className="tr thead">
                        <b className="td-1">item</b>
                        <b className="td-2">price</b>
                        <b className="td-3">quantity</b>
                        <b className="td-4">subtotal</b>
                        <b className="td-5">remove</b>
                    </div>
                    {items.map(pro => <Item key={pro.id+pro.userClr} {...pro} plusMinusQty={plusMinusQty} />)}
                    <div className="tr tfoot">
                        <CartButton onClick={() => navigate("/products")} type="button">CONTINUE SHOPPING</CartButton>
                        <CartButton onClick={clearCart} $bg="red" type="button">CLEAR CART</CartButton>
                    </div>
                </div>
                <div className="sub-total">
                    <div className="box">
                        <p><b>Subtotal :</b> <b>{formatCurrency(subtotal)}</b></p>
                        <p><b>Shipping Fee :</b> <b>{formatCurrency(shipping_fee)}</b></p>
                        <hr/>
                        <p><b>Order Total :</b> <b>{formatCurrency(subtotal + shipping_fee)}</b></p>
                    </div>
                </div>
            </>)}
        </StyledCart>
    )
}
export default Cart;
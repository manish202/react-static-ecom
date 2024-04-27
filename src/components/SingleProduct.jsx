import {useState,useEffect} from "react";
import styled from "styled-components";
import {NavLink,useParams,useNavigate} from "react-router-dom";
import { FaStar, FaRegStarHalfStroke, FaRegStar } from "react-icons/fa6";
import StyledSection from "./styles/StyledSection";
import Button from "./styles/Button";
import products from "./data/products";
import {formatCurrency} from "./utils/methods";
import ColorPicker from "./styles/ColorPicker";
import CartIncDec from "./partials/CartIncDec";
import {useCartContext} from "./partials/CartProvider";

const BreadCrumb = styled.div`
    padding:20px;
    .home{
        color:${({theme}) => theme.colors.text2};
    }
    .disabled{
        color:${({theme}) => theme.colors.bg};
        cursor:default;
    }
`;
const StyledSingle = styled(StyledSection)`
    min-height:80vh;
    padding:20px 10px;
    .left img{
        max-width:400px;
        border-radius:10px;
        margin: 20px auto;
        display:block;
    }
    .right{
        h1{
            color:${({theme}) => theme.colors.text2};
            font-size:2em;
        }
        & > b,& > p{
            display:block;
            padding:10px 0px;
        }
        hr{
            background-color: ${({theme}) => theme.colors.text2};
            height: 3px;
            margin-bottom: 10px;
        }
    }
    .stars{
        color:gold;
        margin:10px 0;
        display:flex;
    }
    @media (max-width: ${({theme}) => theme.media.tab}){
        flex-direction: column;
        .left img{
            max-width:90%;
        }
    }
`;
const AddToCart = styled(Button)`
    font-size: 13px;
`;
const SingleProduct = () => {
    console.log("App > SingleProduct");
    const param = useParams();
    const navigate = useNavigate();
    const [singleProduct,updtProduct] = useState({loading:false,isError:false,data:{}});
    const [qtyClr,chQtyClr] = useState({qty:1,clr:""});
    const {plusMinusQty} = useCartContext();
    useEffect(() => {
        updtProduct(old => ({...old,loading:true}));
        setTimeout(() => {
            const result = products.find(pro => pro.id == param.id);
            if(result){
                chQtyClr(old => ({...old,clr:result.colors[0].toLowerCase()}));
                updtProduct(old => ({...old,loading:false,data:result}));
            }else{
                updtProduct(old => ({...old,loading:false,isError:"Product Not Found!"}));
            }
        },2000);
    },[]);
    const {id,stock,rating,name,company,price,colors,image,desc,category} = singleProduct.data;
    const stars = Array.from("12345",(v,i) => {
        let number = i + 0.5;
        return rating >= v ? (<FaStar key={i} />) : (rating >= number ? <FaRegStarHalfStroke key={i} /> : <FaRegStar key={i} />);
    });
    const incDecQty = ({type}) => {
        if(type === "INC"){
            qtyClr.qty < stock ? chQtyClr(old => ({...old,qty:old.qty+1})) : alert(`Max Allowed QTY Is ${stock}`);
        }else{
            qtyClr.qty > 1 ? chQtyClr(old => ({...old,qty:old.qty-1})) : alert(`Min Allowed QTY Is 1`);
        }
    }
    const productData = {id,stock,name,price,image,userQty:qtyClr.qty,userClr:qtyClr.clr};
    const addToCart = () => {
        plusMinusQty({type:"INCBYQTY",productData});
        navigate("/cart");
    }
    return(
        <>
            <BreadCrumb>
                <NavLink className="home" to="/">Home</NavLink> / <a className="disabled" href="#">{name}</a>
            </BreadCrumb>
            <StyledSingle>
                {singleProduct.loading && <h1>Loading...</h1> || (singleProduct.isError && <h1>{singleProduct.isError}</h1>) || 
                (<>
                <div className="left">
                    <img src={`/images/products/${image}`} alt={name} />
                </div>
                <div className="right">
                    <h1>{name}</h1>
                    <div className="stars">
                        {stars}
                    </div>
                    <b>MRP: {formatCurrency(price)}</b>
                    <b>ID: {id}</b>
                    <b>Brand: {company}</b>
                    <b>Category: {category}</b>
                    <p>{desc}</p>
                    <hr/>
                    <div className="colors">
                        Colors: {colors && colors.map((clr,i) => <ColorPicker title={clr} className={clr.toLowerCase() == qtyClr.clr ? 'active':''} onClick={() => chQtyClr(old => ({...old,clr:clr.toLowerCase()}))} key={i} $clr={clr} />)}
                    </div>
                    <CartIncDec qty={qtyClr.qty} incDecQty={incDecQty} />
                    {stock > 0 && <AddToCart onClick={addToCart} type="button">ADD TO CART</AddToCart> || <h3>Out Of Stock</h3>}
                </div>
                </>)}
            </StyledSingle>
        </>
    )
}
export default SingleProduct;
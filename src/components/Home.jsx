import Hero from "./partials/Hero";
import styled from "styled-components";
import {useState,useEffect} from "react";
import products from "./data/products";
import { FaTruck, FaShieldAlt } from "react-icons/fa";
import { GiReceiveMoney } from "react-icons/gi";
import { RiSecurePaymentLine } from "react-icons/ri";
import ProductCard from "./partials/ProductCard";
import StyledSection from "./styles/StyledSection";

const FeatureWrapper = styled.div`
    max-width: ${({theme}) => theme.maxWidth};
    margin:20px auto;
    b,h1,h2{
        color:${({theme}) => theme.colors.text2};
        padding:10px;
    }
    h1{
        font-size:2em;
    }
`;
const Services = styled(StyledSection)`
    .box{
        padding:40px 20px;
        border-radius: 5px;
        width: 305px;
        height: 305px;
        color: ${({theme}) => theme.colors.text};
        background-color: ${({theme}) => theme.colors.text2};
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        b{
            font-size: 26px;
        }
    }
    .center-box .box{
        margin: 10px;
        padding:45px 20px;
        height: max-content;
    }
    @media (max-width: ${({theme}) => theme.media.tab}){
        .center-box{
            display: flex;
            flex-wrap:wrap;
            justify-content: center;
            align-items: center;
        }
        .center-box .box{
            height: 270px;
        }
    }
`;
const Features = () => {
    console.log("App > Home > Features");
    const [state,updtState] = useState({isLoading:false,isError:false,data:[]});
    useEffect(() => {
        updtState(old => ({...old,isLoading:true}));
        setTimeout(() => {
            updtState(old => ({...old,isLoading:false,data:products.filter(pro => pro.featured)}));
        },2000);
    },[]);
    return(
        <FeatureWrapper>
            <b>CHECK NOW!</b>
            <h2>Our Feature Services</h2>
            <StyledSection>
                {state.isLoading && <h1>Loading...</h1>}
                {!state.isLoading && (state.data.length > 0 && state.data.map(pro => <ProductCard key={pro.id} {...pro} />) || <h1>No Products</h1>)}
            </StyledSection>
        </FeatureWrapper>
    )
}
const Home = () => {
    console.log("App > Home");
    return(
        <>
            <Hero title="MyEcom Store" />
            <Features />
            <Services>
                <div className="box">
                    <b><FaTruck /></b>
                    <h3>Super fast & free delivery</h3>
                </div>
                <div className="center-box">
                    <div className="box">
                        <b><FaShieldAlt /></b>
                        <h3>Non-Contact Shipping</h3>
                    </div>
                    <div className="box">
                        <b><GiReceiveMoney /></b>
                        <h3>money back guaranteed</h3>
                    </div>
                </div>
                <div className="box">
                    <b><RiSecurePaymentLine /></b>
                    <h3>Super secure payment system</h3>
                </div>
            </Services>
        </>
    )
}
export default Home;
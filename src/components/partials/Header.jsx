import styled from "styled-components";
import {NavLink} from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import {useState} from "react";
import ToggleBtn from "../styles/ToggleBtn";
import {useCartContext} from "./CartProvider";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "../styles/Button";
const StyledHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    .logo,.navbar{
        margin:0 20px;
    }
    .logo a{
        color: ${({theme}) => theme.colors.text2};
        span{
            color: ${({theme}) => theme.colors.bg};
        }
        &:hover{
            color: ${({theme}) => theme.colors.bg};
            span{
                color: ${({theme}) => theme.colors.text2};
            }
        }
    }
    .navbar ul{
        display: flex;
        justify-content: center;
        align-items: center;
        li a{
            color: ${({theme}) => theme.colors.text2};
            font-size: 20px;
            display: block;
            padding: 10px;
            &:hover,&.active{
                color: ${({theme}) => theme.colors.bg};
            }
        }
        .cart{
            position:relative;
            top: 4px;
            span{
                position: absolute;
                top: -4px;
                right: 0px;
                font-size: 12px;
                background: ${({theme}) => theme.colors.bg};
                color: ${({theme}) => theme.colors.text};
                padding: 4px;
                border-radius: 3px;
                display: block;
            }
        }
    }
    @media (max-width: ${({theme}) => theme.media.tab}){
        .navbar{
            margin:0;
            position:fixed;
            left:0;
            top:0;
            width:100%;
            min-height: 100vh;
            z-index:10;
            display: none;
            justify-content: center;
            align-items: center;
            background-color: rgba(255, 255, 255, 0.8);
        }
        .navbar.active{
            display: flex;
        }
        .navbar ul{
            flex-direction: column;
        }
    }
`;
const LogInOutBtn = styled(Button)`
    font-size:15px;
    letter-spacing:1px;
`;
const Header = () => {
    console.log("App > Header");
    const [show,chShow] = useState(false);
    const {total_items} = useCartContext();
    const { loginWithRedirect, logout, user, isAuthenticated, isLoading } = useAuth0();
    console.log({user, isAuthenticated, isLoading });
    const toggle = () => window.innerWidth < 770 && chShow(old => !old);
    return(
        <StyledHeader>
            <div className="logo">
                <NavLink to="/"><h1>My<span>Ecom</span></h1></NavLink>
            </div>
            <div className={`navbar ${show ? 'active':''}`} onClick={toggle}>
                <ul>
                    <li><NavLink to="/">Home</NavLink></li>
                    <li><NavLink to="/about">About</NavLink></li>
                    <li><NavLink to="/products">Products</NavLink></li>
                    <li><NavLink to="/contact">Contact</NavLink></li>
                    <li>{!isAuthenticated && <LogInOutBtn type="button" onClick={() => loginWithRedirect()}>Login</LogInOutBtn> || <LogInOutBtn type="button" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Logout</LogInOutBtn>}</li>
                    <li className="cart"><NavLink to="/cart"><FiShoppingCart /><span>{total_items}</span></NavLink></li>
                </ul>
            </div>
            <ToggleBtn onClick={toggle} type="button"><FaBars /></ToggleBtn>
        </StyledHeader>
    )
}
export default Header;
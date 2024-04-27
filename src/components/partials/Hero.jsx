import styled from "styled-components";
import {NavLink} from "react-router-dom";
import StyledSection from "../styles/StyledSection";
import Button from "../styles/Button";
const StyledHero = styled(StyledSection)`
    justify-content: space-between;
    flex-wrap: nowrap;
    min-height:80vh;
    padding: 10px;
    .left{
        color: ${({theme}) => theme.colors.text2};
        h1,p{
            padding:10px 0;
        }
        h1{
            font-size: 2.5em;
        }
    }
    .right{
        img{
            max-width:290px;
            border-radius: 5px;
        }
    }
    @media (max-width: ${({theme}) => theme.media.tab}){
        flex-wrap: wrap;
        .right{
            img{
                max-width:80%;
                margin: 10px auto;
                display: block;
            }
        }
    }
`;

const Hero = ({title}) => {
    console.log("App > ... > Hero");
    return(
        <StyledHero>
            <div className="left">
                <b>Welcome To</b>
                <h1>{title}</h1>
                <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laboriosam necessitatibus fugiat molestias quidem vero in quia cumque perferendis libero corporis doloremque voluptatibus temporibus sit, at ad tempore expedita optio aspernatur.
                </p>
                <Button as={NavLink} to="/products">Shop Now</Button>
            </div>
            <div className="right">
                <img src="/images/hero.jpg" alt="shop now"/>
            </div>
        </StyledHero>
    )
}
export default Hero;
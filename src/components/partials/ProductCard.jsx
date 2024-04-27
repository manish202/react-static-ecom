import {NavLink} from "react-router-dom";
import styled from "styled-components";
import {formatCurrency} from "../utils/methods";
import Button from "../styles/Button";
import {memo} from "react";
const GridCard = styled.div`
    width:280px;
    margin:15px;
    border-radius: 5px;
    overflow:hidden;
    .data{
        display:flex;
        justify-content:space-between;
        padding:10px;
        h3,p{
            color:${({theme}) => theme.colors.text2};
        }
    }
`;
const Figure = styled.figure`
    position:relative;
    width:280px;
    height:200px;
    overflow:hidden;
    img{
        width:100%;
        height:100%;
        object-fit:cover;
        border-radius: 5px;
        transition:all 0.4s;
        &:hover{
            transform:scale(1.3);
        }
    }
    figcaption{
        position:absolute;
        top:10px;
        right:10px;
        color:${({theme}) => theme.colors.text2};
        background-color:${({theme}) => theme.colors.text};
        padding:10px;
        border-radius:10px;
        &:hover{
            color:${({theme}) => theme.colors.text};
            background-color:${({theme}) => theme.colors.text2};
        }
    }
`;
const ListCard = styled.div`
    display: flex;
    align-items: center;
    border-bottom: 2px solid black;
    width: 90%;
    padding: 15px 5px;
    color: ${({theme}) => theme.colors.bg};
    .data{
        padding:20px;
        padding-left:50px;
    }
    h2{
        color: ${({theme}) => theme.colors.text2};
    }
    p{
        padding: 7px 0;
    }
    @media (max-width: ${({theme}) => theme.media.tab}){
        flex-direction:column;
        .data{
            padding-left:20px;
        }
    }
`;
const ReadMore = styled(Button)`
    font-size: 16px;
`;
const ProductCard = ({id,name,price,image,desc,category,isListView}) => {
    console.log("App > ... > ProductCard");
    return(
        <>
            {!isListView ? (<NavLink to={`/single_product/${id}`}>
                <GridCard>
                    <Figure>
                        <img src={`/images/products/${image}`} alt={name}/>
                        <figcaption>{category}</figcaption>
                    </Figure>
                    <div className="data">
                        <h3>{name}</h3>
                        <p>{formatCurrency(price)}</p>
                    </div>
                </GridCard>
            </NavLink>) : (<ListCard>
            <NavLink to={`/single_product/${id}`}>
                <Figure>
                    <img src={`/images/products/${image}`} alt={name}/>
                    <figcaption>{category}</figcaption>
                </Figure>
            </NavLink>
            <div className="data">
                <NavLink to={`/single_product/${id}`}><h2>{name}</h2></NavLink>
                <p>{formatCurrency(price)}</p>
                <p>{desc}</p>
                <ReadMore as={NavLink} to={`/single_product/${id}`}>Read More</ReadMore>
            </div>
            </ListCard>)}
        </>
    )
}
export default memo(ProductCard);
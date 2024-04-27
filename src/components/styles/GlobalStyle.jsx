import {createGlobalStyle} from "styled-components";
const GlobalStyle = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: "Roboto", sans-serif;
        font-weight: 400;
        font-style: normal;
    }
    ul{
        list-style-type: none;
    }
    a{
        text-decoration: none;
    }
    h1,h2,h3,h4,h5,h6{
        font-weight: 900;
    }
`;
const theme = {
    colors:{
        text:"#fff",
        text2:"#4834d4",
        bg:"#34495e"
    },
    maxWidth:"1000px",
    media:{ tab:"770px", mobile:"430px" }
}
export {GlobalStyle,theme};
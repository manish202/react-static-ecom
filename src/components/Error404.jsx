import styled from "styled-components";
import Button from "./styles/Button";
import {NavLink} from "react-router-dom";
const Section = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 90vh;
    text-align: center;
    background-color: cornflowerblue;
    color: ${({theme}) => theme.colors.text};
    letter-spacing: 1px;
    padding: 20px;
`;
const Error404 = () => {
    console.log("App > Error404");
    return(
        <Section>
            <div className="box">
                <h1>Oops! Error 404 Page Not Found!</h1>
                <Button as={NavLink} to="/">Go Home</Button>
            </div>
        </Section>
    )
}
export default Error404;
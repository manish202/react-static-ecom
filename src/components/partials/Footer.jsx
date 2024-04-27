import styled from "styled-components";
const MyFooter = styled.footer`
    text-align:center;
    color: ${({theme}) => theme.colors.text2};
    padding: 20px;
`;
const Footer = () => {
    console.log("App > Footer");
    return(
        <MyFooter>
            <h3>Design & Developed By Manish Prajapati</h3>
        </MyFooter>
    )
}
export default Footer;
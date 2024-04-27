import styled from "styled-components";
import Button from "./styles/Button";
const Section = styled.section`
    h1{
        text-align:center;
        padding: 20px;
        color: ${({theme}) => theme.colors.text2};
    }
    form{
        max-width: 400px;
        margin: 20px auto;
    }
    input,textarea{
        width:90%;
        color: ${({theme}) => theme.colors.text2};
        display: block;
        outline: none;
        border: 2px solid ${({theme}) => theme.colors.text2};
        padding: 10px;
        margin: 20px 5px;
        border-radius: 7px;
        font-size: 20px;
    }
`;
const Contact = () => {
    console.log("App > Contact");
    return(
        <Section>
            <h1>Feel Free To Contact Us</h1>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14710.873598716635!2d73.33358464997275!3d22.812896069137363!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e23b9d02a90a9%3A0x55c1505631eaf903!2sSevaliya%2C%20Gujarat%20388245!5e0!3m2!1sen!2sin!4v1713703432688!5m2!1sen!2sin"
            width="100%" height="400" style={{border:0}} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            <form action="#">
                <input type="text" name="uname" placeholder="Username" />
                <input type="email" name="email" placeholder="Email" />
                <textarea name="message" cols="30" rows="4" placeholder="Your Message"></textarea>
                <Button type="submit">Submit</Button>
            </form>
        </Section>
    )
}
export default Contact;
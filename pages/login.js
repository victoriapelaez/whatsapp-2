
import Head from "next/head";
import styled from "styled-components";
import { AccountBox } from "../components/accountBox";


function Login() {
    
    return (
        <Container>
            <AccountBox>
            </AccountBox>  
        </Container>

    )

}

export default Login

const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 100vh;
background-color: whitesmoke;
`;


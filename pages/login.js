import { Button } from "@material-ui/core";
import Head from "next/head";
import styled from "styled-components";
import { AccountBox } from "../components/accountBox";
import { auth, provider } from "../firebase";

function Login() {

    return (
        <Container>
            <AccountBox>

            </AccountBox>
        </Container>

    )


    /* const signIn = () => {
        auth.signInWithPopup(provider).catch(alert)
    };

    return (
        <Container>
            <Head>
                <title>Login</title>
            </Head>

            <LoginContainer>
                
                <Button onClick={signIn} variant="outlined">Sign in with Google</Button>
            </LoginContainer>
        </Container>
    ) */
}

export default Login

const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
height: 100vh;
background-color: whitesmoke;
`; 


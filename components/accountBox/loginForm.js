import React, { useContext } from "react";
import { BoldLink, BoxContainer, FormContainer, Input, MutedLink, SubmitButton } from "./common";
import Marginer from "../marginer/index";
import { AccountContext } from "./accountContext";
import { auth, provider } from "../../firebase";
import styled from "styled-components";

export function LoginForm() {

    const signIn = () => {
        auth.signInWithPopup(provider).catch(alert)
    };

    const { switchToSignup } = useContext(AccountContext);

    return (
        <BoxContainer>
            <FormContainer>
                <Input type="email" placeholder="Email" />
                <Input type="password" placeholder="Password" />
            </FormContainer>

            <Marginer direction="vertical" margin={10} />
            <MutedLink href="#">Forget you password?</MutedLink>
            <Marginer direction="vertical" margin="1.4em" />
            <SubmitButton type="submit">Sign In</SubmitButton>
            <Marginer direction="vertical" margin="1em" />
            <GoogleButton onClick={signIn} variant="outlined">Google</GoogleButton>
            <Marginer direction="vertical" margin="1em" />
            <MutedLink href="#">Dont have an account?{" "}
                <BoldLink href="#" onClick={switchToSignup}>Sign up</BoldLink>
            </MutedLink>

        </BoxContainer>
    );
}

const GoogleButton = styled.button`
margin-top: 10px;
margin-bottom: 10px;
width: 100%;
padding: 11px 40%;
color: #fff;
font-size: 11px;
font-weight: 600;
border: none;
border-radius: 100px 100px 100px 100px;
cursor: pointer;
transition: all, 240ms ease-in-out;
background: rgb(143,216,223);
background: (linear-gradient(58deg, rgba(143,216,223,1) 20%, rgba(2,81,135,1) 100%));

&:hover{
    filter: brightness(1.03);
}
`;
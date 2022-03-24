import React, { useContext } from "react";
import { BoldLink, BoxContainer, FormContainer, Input, MutedLink, SubmitButton } from "./common";
import Marginer from "../marginer/index";
import { AccountContext } from "./accountContext";
import { auth } from "../../firebase";

const signUp = () => {
    /* auth.signInWithPopup(provider).catch(alert) */
};

export function SignupForm() {
    const { switchToSignin } = useContext(AccountContext);
    return (
        <BoxContainer>
            <FormContainer>
                <Input type="text" placeholder="Full Name" />
                <Input type="email" placeholder="Email" />
                <Input type="password" placeholder="Password" />
                <Input type="password" placeholder="Confirm Password" />
            </FormContainer>
            <Marginer direction="vertical" margin="1.4em" />
            <SubmitButton type="submit" onClick={signUp}>Sign Up</SubmitButton>
            <Marginer direction="vertical" margin="1em" />
            <MutedLink href="#">Already have an account?
                <BoldLink href="#" onClick={switchToSignin}>Sign in</BoldLink>
            </MutedLink>
        </BoxContainer>
    );
}
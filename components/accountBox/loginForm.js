import React, { useContext } from "react";
import { BoldLink, BoxContainer, FormContainer, Input, MutedLink, SubmitButton } from "./common";
import Marginer from "../marginer/index";
import { AccountContext } from "./accountContext";

export function LoginForm() {

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
            <MutedLink href="#">Dont have an account?{" "}
                <BoldLink href="#" onClick={switchToSignup}>Sign up</BoldLink>
            </MutedLink>

        </BoxContainer>
    );
}
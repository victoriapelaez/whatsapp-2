import React from "react";
import { BoxContainer, FormContainer, Input, MutedLink, SubmitButton } from "./common";
import Marginer from "../marginer/index"

export function LoginForm() {
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
        </BoxContainer>
    );
}
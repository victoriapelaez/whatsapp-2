import React, { useContext, useState } from "react";
import { BoldLink, BoxContainer, FormContainer, Input, MutedLink, SubmitButton } from "./common";
import Marginer from "../marginer/index";
import { AccountContext } from "./accountContext";
import "firebase/auth"
import { auth } from '../../firebase'



export function SignupForm() {

    /* const register = async ({ fullname, email, password }) => {
        const resp = await firebase.auth()
            .createUserWithEmailAndPassword(fullname, email, password);
        return resp.user;
    }; */


    const [fullname, setFullname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const changeFullname = (e) => setFullname(e.target.value)
    const changeEmail = (e) => setEmail(e.target.value)
    const changePassword = (e) => setPassword(e.target.value)

    const sendData = (e) => e.preventDefault()


    /* const handleSubmit = async (e) => {
        e.preventDefault();
        await register(form);

    } */

    const { switchToSignin } = useContext(AccountContext);
    return (
        <BoxContainer>
            <FormContainer onSubmit={sendData}>

                <Input type="text" placeholder="Full Name" value={fullname}
                    onChange={changeFullname} />
                <Input type="email" placeholder="Email" value={email}
                    onChange={changeEmail} />
                <Input type="password" placeholder="Password" value={password}
                    onChange={changePassword} />
                {/* <Input type="password" placeholder="Confirm Password" /> */}

                <Marginer direction="vertical" margin="1.4em" />
                <SubmitButton type="submit">Sign Up</SubmitButton>
            </FormContainer>

            <Marginer direction="vertical" margin="1em" />
            <MutedLink href="#">Already have an account?
                <BoldLink href="#" onClick={switchToSignin}>Sign in</BoldLink>
            </MutedLink>
        </BoxContainer>
    );
}

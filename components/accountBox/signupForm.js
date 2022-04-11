import React, { useContext, useState } from "react";
import { BoldLink, BoxContainer, FormContainer, Input, MutedLink, SubmitButton } from "./common";
import Marginer from "../marginer/index";
import { AccountContext } from "./accountContext";
import "firebase/auth"
import { auth } from '../../firebase'



export function SignupForm() {

    /* const [form, setForm] = useState({
        fullname: "",
        email: "",
        password: ""
    })

    const sendData = (e) => {
        e.preventDefault()
        console.log(form);
    }

    const { switchToSignin } = useContext(AccountContext); */
    return (
        {/* <BoxContainer>
            <FormContainer onSubmit={sendData}>

                <Input type="text" placeholder="Full Name" value={form.fullname}
                    onChange={(e) =>
                        setForm({ ...form, fullname: e.target.value })} />
                <Input type="email" placeholder="Email" value={form.email}
                    onChange={(e) =>
                        setForm({ ...form, email: e.target.value })} />
                <Input type="password" placeholder="Password" value={form.password}
                    onChange={(e) =>
                        setForm({ ...form, password: e.target.value })} />
                {/* <Input type="password" placeholder="Confirm Password" /> 

                <Marginer direction="vertical" margin="1.4em" />
                <SubmitButton type="submit">Sign Up</SubmitButton>
            </FormContainer>

            <Marginer direction="vertical" margin="1em" />
            <MutedLink href="#">Already have an account?
                <BoldLink href="#" onClick={switchToSignin}>Sign in</BoldLink>
            </MutedLink>
        </BoxContainer> */}
    );
}

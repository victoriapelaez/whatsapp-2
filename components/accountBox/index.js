import React from "react";
import styled from "styled-components";
import { LoginForm } from "./loginForm";



export function AccountBox(props) {
    return <BoxContainer>
        <TopContainer>
            <BackDrop />
            <HeaderContainer>
                <HeaderText>Welcome</HeaderText>
                <HeaderText>to Whatsapp</HeaderText>
                <SmallText>Please sign-in to continue</SmallText>
            </HeaderContainer>
        </TopContainer>
        <InnerContainer>
            <LoginForm />
        </InnerContainer>
    </BoxContainer>

}

const BoxContainer = styled.div`
width: 280px;
min-height: 550px;
display: flex;
flex-direction: column;
border-radius: 19px;
background-color: #fff;
box-shadow: 0 0 2px rgba(15, 15, 15, 0.28);
position: relative ;
overflow: hidden;
`;

const BackDrop = styled.div`
width: 160%;
height: 550px;
position: absolute;
display: flex;
flex-direction: column;
border-radius: 50%;
transform: rotate(60deg);
top: -290px;
left: -70px;
background: rgb(108,190,26);
background: (linear-gradient(58deg, rgba(108,190,26,1) 20%, rgba(2,135,15,1) 100%));
`;

const TopContainer = styled.div`
width: 100%;
height: 250px;
display: flex;
flex-direction: column;
justify-content: flex-end;
padding: 0 1.8em;
padding-bottom: 5em;
`;

const HeaderContainer = styled.div`
width: 100%;
display: flex;
flex-direction: column;
`;

const HeaderText = styled.h2`
font-size: 30px;
font-weight: 600;
line-height: 1.24;
color: #fff;
z-index: 10;
margin: 0;
`

const SmallText = styled.h5`
color: #fff;
font-weight: 500;
font-size: 13px;
z-index: 10;
margin: 0;
margin-top: 7px;
`

const InnerContainer = styled.div`
width: 100%;
display: flex;
flex-direction: column;
padding: 0 1.8em;
`

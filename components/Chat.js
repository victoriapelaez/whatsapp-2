import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth, db } from "../firebase";
import getRecipientEmail from "../utils/getRecipientEmail";
import { Avatar, IconButton } from "@material-ui/core";
import { useCollection } from "react-firebase-hooks/firestore";
import { useRouter } from "next/router";
import CloseIcon from '@mui/icons-material/Close';
import { doc, Firestore } from "firebase/firestore";
import { Redirect } from "next";
import { useEffect } from "react";

function Chat({ id, users }) {
    const router = useRouter();
    const [user] = useAuthState(auth);
    const [recipientSnapshot] = useCollection(
        db.collection('users').where('email', '==', getRecipientEmail(users, user))
    );

    const enterChat = () => {
        router.push(`/chat/${id}`)
    }

    const handleDel = () => {
        db.collection("chats")?.doc("doc.id")?.delete()
            .then(() => {
                console.log("Chat Borrado")
            });
        {/* <Redirect to="/chats" /> */}
    }

    

     useEffect(() => {
        db.collection('chats')
            .get()
            .then(querySnapshot => {
                querySnapshot.forEach(doc => {
                    const chatId = doc.id;
                    console.log(chatId)
                });
            });
    }, []); 

    const recipient = recipientSnapshot?.docs?.[0]?.data()
    const recipientEmail = getRecipientEmail(users, user)

    return (
        <Container onClick={enterChat}>
            {recipient ? (
                <UserAvatar src={recipient?.photoURL} />
            ) : (
                <UserAvatar>{recipientEmail[0]}</UserAvatar>
            )}
            {recipient ? (
                <p style={{marginRight:'auto'}}>{recipient?.name}</p>
            ) : (
                <p style={{marginRight:'auto'}}>{recipientEmail}</p>
            )}
            {/* <IconButton onClick={() => handleDel(id)}
                id={id}
            > */}

            <IconButton onClick={handleDel}
            >
                <CloseIcon style={{ fontSize: 10 }} />
            </IconButton>
            
        </Container>
    )
}

export default Chat;

const Container = styled.div`
display: flex;
align-items: center;
justify-content:space-between;
cursor: pointer;
padding: 15px;
word-break: break-word;

:hover{
    background-color: #e9eaeb;
}
`;

const UserAvatar = styled(Avatar)`
margin: 5px;
margin-right: 15px;
`


import styled from "styled-components"
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { Avatar, IconButton } from "@material-ui/core";
import { useCollection } from "react-firebase-hooks/firestore";
import Message from "./Message";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import { useEffect, useRef, useState } from "react";
import firebase from "firebase/compat/app";
import getRecipientEmail from "../utils/getRecipientEmail";
import TimeAgo from "timeago-react";
import dynamic from "next/dynamic";
const Picker = dynamic(() => import('emoji-picker-react'), { ssr: false });
import FormUploadDoc from "./FormsCreateChats/FormUploadDoc";
import FormUploadImage from "./FormsCreateChats/FormUploadImage";
import GroupsIcon from '@mui/icons-material/Groups';

function ChatScreen({ chat, messages }) {
    const [user] = useAuthState(auth);
    const [input, setInput] = useState("");
    const endOfMessagesRef = useRef(null)

    const [showPicker, setShowPicker] = useState(false)
    const router = useRouter();
    const [messagesSnapshot] = useCollection(
        db
            .collection('chats')
            .doc(router.query.id)
            .collection('messages')
            .orderBy('timestamp', 'asc')
    );

    const [recipientSnapshot] = useCollection(
        db
            .collection('users')
            .where('email', '==', getRecipientEmail(chat.users, user))
    );

    const showMessages = () => {
        if (messagesSnapshot) {
            return messagesSnapshot.docs.map(message => (
                <Message
                    key={message.id}
                    user={message.data().user}
                    message={{
                        ...message.data(),
                        timestamp: message.data().timestamp?.toDate().getTime(),
                    }}
                    endOfMessagesRef
                />

            ));
        } else {
            return JSON.parse(messages).map(message => (
                <Message
                    key={message.id}
                    user={message.user}
                    message={message}
                    endOfMessagesRef
                />
            ))
        }
    }

    useEffect(() => {
        scrollToBottom();
    });

    const scrollToBottom = () => {
        endOfMessagesRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        })
    }

    const sendMessage = (e) => {
        e.preventDefault();

        //update the last seen
        db.collection('users').doc(user.uid).set({
            lastSeen: firebase.firestore.FieldValue.serverTimestamp()
        }), { merge: true }

        db.collection('chats').doc(router.query.id).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: {
                messageText: input,
                type: 'text',
            },
            user: user.email,
            photoUrl: user.photoURL,
            userName: user.displayName
        })

        setInput("");
    }

    const onEmojiClick = (event, emojiObject) => {
        setInput(prevInput => prevInput + emojiObject.emoji)
        setShowPicker(false);
    };


    const recipient = recipientSnapshot?.docs?.[0]?.data();
    const recipientEmail = getRecipientEmail(chat.users, user)

    return (
        <Container>
            <Header>
                {chat.type === "groupChat"
                    ?
                    (<Avatar><GroupsIcon /></Avatar>)
                    : recipient
                        ?
                        (
                            <Avatar src={recipient?.photoURL} />
                        ) :
                        (
                            <Avatar>{recipientEmail[0]}</Avatar>
                        )}
                <HeaderInformation>
                    {chat.type === "groupChat"
                        ?
                        (<h3>{chat.nameGroup}</h3>)
                        : recipient
                            ?
                            (
                                <h3>{recipient?.name}</h3>
                            ) :
                            (
                                <h3>{recipientEmail}</h3>
                            )}
                    {chat.type === "groupChat"
                        ?
                        (<UsersContainer key={user}>
                            {chat.users.map((user) => {
                                return (user + ", ")
                            })}
                        </UsersContainer>)
                        :
                        ("")}
                    {recipientSnapshot ? (
                        <p>Last active: {" "}
                            {recipient?.lastSeen?.toDate() ? (
                                <TimeAgo datetime={recipient?.lastSeen?.toDate()} />
                            ) : "Unavailable"}
                        </p>
                    ) : (
                        <p>Loanding last active...</p>
                    )}
                </HeaderInformation>
            </Header>
            <MessageContainer>
                {showMessages()}
                <EndOfMessage ref={endOfMessagesRef} />
            </MessageContainer>
            <InputContainer>
                <IconButton>
                    <InsertEmoticonIcon onClick={() => setShowPicker(val => !val)} />
                </IconButton>
                <Input value={input} onChange={e => setInput(e.target.value)} />
                <button hidden disabled={!input} type="submit" onClick={sendMessage}>Send Message</button>
                <HeaderIcons>
                    <FormUploadImage />
                    <FormUploadDoc />
                </HeaderIcons>
            </InputContainer>
            {showPicker && <Picker onEmojiClick={onEmojiClick} pickerStyle={{ width: '100%' }} />}
        </Container>
    )
}

export default ChatScreen

const Container = styled.div`
`;

const Header = styled.div`
position: sticky;
background-color: #DBF4EA;
z-index: 100;
top: 0;
display: flex;
padding-left: 10px;
height: fit-content;
align-items: center;
`;

const HeaderInformation = styled.div`
margin-left: 15px;
flex: 1;

> h3 {
    margin-top: 10px;
    margin-bottom: 5px;
    color: #234839 ;
}

> p {
    font-size: 12px;
    color: #234839 ;
}
`;

const UsersContainer = styled.div`
display: flex;
font-size: 12px;
word-break: break-word;
`;

const HeaderIcons = styled.div`
display: flex;
`;

const MessageContainer = styled.div`
padding: 30px;
/* background-color: #e5ded8; */
background-image: url('https://i.pinimg.com/originals/02/ad/c5/02adc54365008df9b103f238605e3ace.jpg');
background-position: center;
background-size: cover;
background-repeat: no-repeat;
min-height: 90vh;
`;

const EndOfMessage = styled.div`
margin-bottom: 100px;
`;

const InputContainer = styled.form`
display: flex;
align-items: center;
padding: 10px;
position: sticky;
bottom: 0;
background-color: #DBF4EA;
z-index: 100;
`;

const Input = styled.input`
flex: 1;
outline: 0;
border: none;
border-radius: 10px;
padding: 20px;
margin-left: 15px;
margin-right: 15px;
background-color: whitesmoke;
`;
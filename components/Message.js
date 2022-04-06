import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components"
import { auth } from "../firebase";
import moment from "moment";
import { useEffect} from "react";

function Message({ user, message, endOfMessagesRef }) {
    const [userLoggedIn] = useAuthState(auth);

    const TypeOfMessage = user === userLoggedIn.email ? Sender : Reciever;

    useEffect(() => {
        scrollToBottom();
    });

    const scrollToBottom = () => {
        endOfMessagesRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        })
    }

    return (
        <Container>
            <TypeOfMessage>
                {message.message.type === "file" ? (
                    <img src={message.message.messageText} style={{ maxWidth: '200px' }} /> 
                ) : (
                    message.message.messageText
                )}
                <Timestamp>
                    {message.timestamp ? moment(message.timestamp).format('LT') : '...'}
                </Timestamp>
            </TypeOfMessage>
        </Container >
    )
}

export default Message

const Container = styled.div`

`;

const MessageElement = styled.p`
width: fit-content;
padding: 10px;
border-radius: 8px;
margin: 10px;
min-width: 60px;
padding-bottom: 26px;
position: relative;
text-align: right;
max-width: 500px;
word-break: break-word;
`;


const Sender = styled(MessageElement)`
margin-left: auto;
background-color: #dcf8c6;
`;

const Reciever = styled(MessageElement)`
text-align: left;
background-color: whitesmoke;
`;

const Timestamp = styled.span`
color: grey;
padding: 10px;
font-size: 9px;
position: absolute;
bottom: 0;
text-align: right;
right: 0;
`;
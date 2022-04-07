import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components"
import { auth } from "../firebase";
import moment from "moment";
import { useEffect } from "react";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { IconButton } from "@mui/material";
import { Circle } from "better-react-spinkit"
import { ArchiveOutlined } from "@mui/icons-material";

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
                {message.message.type === "file"
                    ?
                    ((message.timestamp != undefined)
                        ? <img src={message.message.messageText} style={{ maxWidth: '300px', maxHeight: '300px' }} />
                        : <Circle />)
                    : message.message.type === "pdf"
                        ?
                        (<a href={message.message.messageText} rel='noreferrer' target='_blank' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                            <PictureAsPdfIcon style={{ fontSize: '55px', color: 'red' }} />
                            <p style={{ fontSize: '13px' }}>OPEN {message.message.name}</p>

                        </a>
                        )
                        : (
                            message.message.messageText
                        )}
                <Timestamp>
                    {message.timestamp ? moment(message.timestamp).format('LT') : '...'}
                </Timestamp>
            </TypeOfMessage>
        </Container>
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
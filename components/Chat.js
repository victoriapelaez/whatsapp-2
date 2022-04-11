import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth, db } from "../firebase";
import getRecipientEmail from "../utils/getRecipientEmail";
import { Avatar, IconButton } from "@material-ui/core";
import { useCollection } from "react-firebase-hooks/firestore";
import { useRouter } from "next/router";
import CloseIcon from '@mui/icons-material/Close';
import GroupsIcon from '@mui/icons-material/Groups';

function Chat({ id, users, type, nameGroup }) {
    const router = useRouter();
    const [user] = useAuthState(auth);

    const [recipientSnapshot] = useCollection(
        db.collection('users').where('email', '==', getRecipientEmail(users, user))
    );

    const enterChat = () => {
        router.push(`/chat/${id}`)
    }

    const handleDel = () => {
        db.collection("chats").doc(id).delete()
            .then(() => {
                console.log("Chat Borrado", id)
            });
        router.push('/')
    }

    const recipient = recipientSnapshot?.docs?.[0]?.data()
    const recipientEmail = getRecipientEmail(users, user)

    return (
        <Container >
            <InfoContainer onClick={enterChat}>
                {type === "groupChat"
                    ?
                    (<UserAvatar><GroupsIcon /></UserAvatar>)
                    : recipient
                        ?
                        (
                            <UserAvatar src={recipient?.photoURL} />
                        ) :
                        (
                            <UserAvatar>{recipientEmail[0]}</UserAvatar>
                        )}

                {type === "groupChat"
                    ?
                    (<p style={{ marginRight: 'auto' }}>{nameGroup}</p>)
                    : recipient
                        ?
                        (
                            <p style={{ marginRight: 'auto' }}>{recipient?.name}</p>
                        ) :
                        (
                            <p style={{ marginRight: 'auto' }}>{recipientEmail}</p>
                        )}

            </InfoContainer>
            <CloseContainer>
                <IconButton onClick={handleDel}>
                    <CloseIcon style={{ fontSize: 10 }} />
                </IconButton>
            </CloseContainer>
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
background-color: white;

:hover{
    background-color: #DBF4EA ;
}
`;

const UserAvatar = styled(Avatar)`
margin: 5px;
margin-right: 15px;
`

const CloseContainer = styled.div`

`

const InfoContainer = styled.div`
display: flex;
`
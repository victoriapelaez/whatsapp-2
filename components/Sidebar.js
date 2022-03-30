import { Avatar, Button, IconButton } from "@material-ui/core";
import styled from "styled-components"
import ChatIcon from '@mui/icons-material/Chat';
import SearchIcon from '@mui/icons-material/Search';
import * as EmailValidator from "email-validator";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore"
import { auth, db } from "../firebase";
import Chat from "../components/Chat";
import UserMenu from '../components/UserMenu'

function Sidebar() {
    const [user] = useAuthState(auth);
    const userChatRef = db.collection('chats').where('users', 'array-contains', user.email)
    const [chatsSnapshot] = useCollection(userChatRef)

    const createChat = () => {
        const input = prompt(
            'Please enter an email address for the user you wish to chat with'
        );
        if (!input) return null;

        if (EmailValidator.validate(input) && !chatAlreadyExists(input) && input !== user.email) {
            //We add the chat into de DB 'chats' collection if it doesnt already exists and is valid
            db.collection('chats').add({
                users: [user.email, input],
            })
        }
    };

    const chatAlreadyExists = (recipientEmail) =>
        !!chatsSnapshot?.docs.find(
            (chat) =>
                chat.data().users.find((user) => user === recipientEmail)?.length > 0
        );


    return (
        <Container>
            <Header>
                <UserAvatar src={user.photoURL} onClick={() => auth.signOut()} />

                <IconsContainer>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>

                    <UserMenu />

                </IconsContainer>

            </Header>
            <Search>
                <SearchIcon />
                <SearchInput placeholder="Search in chats" />
            </Search>

            <SidebarButton onClick={createChat}>Start a new chat</SidebarButton>

            {/* List of Chats */}
            {chatsSnapshot?.docs.map((chat) => (
                <Chat key={chat.id} id={chat.id} users={chat.data().users} />
            ))}
        </Container>
    );
}

export default Sidebar;

const Container = styled.div`
flex: 0.45;
height: 100vh;
min-width: 400px;
max-width: 350px;
overflow-y: scroll;
background-color: white;
border-left: 40px solid #DBF4EA;
::-webkit-scrollbar{
    display: none;
}
-ms-overflow-style: none;
scrollbar-width: none;

`;

const Search = styled.div`
display: flex;
align-items: center;
padding: 20px;
border-radius: 2px;
`;

const SidebarButton = styled(Button)`
width: 100%;

&&& {
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
    color: #234839;
}
`;

const SearchInput = styled.input`
outline-width: 0;
border: none;
border-radius: 10px;
flex: 1;
background-color: white;
`;

const Header = styled.div`
display: flex;
position: sticky;
top: 0;
z-index: 1;
justify-content: space-between;
align-items: center;
padding: 15px;
height: 80px;
background-color: white;

`;

const UserAvatar = styled(Avatar)`
cursor:pointer;

:hover{
opacity: 0.8;
}
`;
const IconsContainer = styled.div`
display: flex;
`;
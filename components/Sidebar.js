import styled from "styled-components"
import SearchIcon from '@mui/icons-material/Search';
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore"
import { auth, db } from "../firebase";
import Chat from "../components/Chat";
import FormChat from '../components/FormsCreateChats/FormChat'
import HeaderBox from "./HeaderBox";

function Sidebar() {
    const [user] = useAuthState(auth);
    const userChatRef = db.collection('chats').where('users', 'array-contains', user.email)
    const [chatsSnapshot] = useCollection(userChatRef)

    return (
        <Container>
            <HeaderBox />
            <Search>
                <SearchIcon />
                <SearchInput placeholder="Search in chats" />
            </Search>
            <FormChat></FormChat>
            {/* List of Chats */}
            {chatsSnapshot?.docs.map((chat) => (
                <Chat key={chat.id} id={chat.id} users={chat.data().users} type={chat.data().type} nameGroup={chat.data().nameGroup} />
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

const SearchInput = styled.input`
outline-width: 0;
border: none;
border-radius: 10px;
flex: 1;
background-color: white;
`;

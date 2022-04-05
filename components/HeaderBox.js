import styled from "styled-components";
import FormChatGroup from '../components/FormsCreateChats/FormChatGroup'
import UserMenu from '../components/Menu/UserMenu'
import { Avatar } from "@material-ui/core";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function HeaderBox() {
    const [user] = useAuthState(auth);
    
    return (
              <Header>
                <UserAvatar src={user.photoURL} onClick={() => auth.signOut()} />
                <IconsContainer>
                    <FormChatGroup />
                    <UserMenu />
                </IconsContainer>
            </Header>
    )

}

export default HeaderBox

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

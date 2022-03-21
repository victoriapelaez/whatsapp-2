import { Avatar, IconButton } from "@material-ui/core";
import styled from "styled-components"
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';


function Sidebar() {
    return (
        <Container>
            <Header>
                <UserAvatar />

                <IconsContainer>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </IconsContainer>

            </Header>
        </Container>
    )
}

export default Sidebar;

const Container = styled.div``;

const Header = styled.div`
display: flex;
`;

const UserAvatar = styled(Avatar)``;

const IconsContainer = styled.div``;
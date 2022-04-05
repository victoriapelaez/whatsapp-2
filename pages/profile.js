import styled from "styled-components";
import { Avatar } from "@material-ui/core";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import UserMenu from '../components/Menu/UserMenu'


function Profile() {
    const [user] = useAuthState(auth);
    console.log(user)
    return (
        <Container>
            <IconsContainer>
                <UserAvatar src={user.photoURL} onClick={() => auth.signOut()} />
                <UserMenu />
            </IconsContainer>
            <Title>USER PROFILE</Title>
            <ProfileContainer>
                <DataUserContainer>
                <h3>Nombre y apellido del usuario: </h3>
                <p>{user.displayName}</p>
                <h3> Email del usuario: </h3>
                <p>{user.email}</p>
                </DataUserContainer>
                <PhotoUserContainer>
                <UserAvatarBig src={user.photoURL} style={{width:'300px', height:'300px'}} />
                </PhotoUserContainer>
            </ProfileContainer>

        </Container>

    )

}

export default Profile

const Container = styled.div`
display: flex;
flex-direction: column;
width: 100vw;
height: 100vh;
background-color: white;
margin: 0;
`;

const ProfileContainer = styled.div`
display: flex;
width: 100vw;
height: 100vh;
background-color: teal;
padding: 20px;
border-top: 30px solid #DBF4EA;
`;

const UserAvatar = styled(Avatar)`
:hover{
opacity: 0.8;
}
`;

const UserAvatarBig = styled(Avatar)`
margin-top: 150px;
margin-left: 150px;
`;

const IconsContainer = styled.div`
display: flex;
margin: 20px;
`;

const DataUserContainer = styled.div`
color: white;
width: 50%;
margin-left: 120px;
margin-top: 100px;
font-size: 20px;
padding: 50px;
`;

const PhotoUserContainer = styled.div`
width: 50%;
`;

const Title = styled.h1`
color: teal;
text-align: center;
margin: 30px;
font-size: 30px;
font-weight: 600;
line-height: 1.24;
z-index: 10;
`
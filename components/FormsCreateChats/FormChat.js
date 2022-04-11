import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import styled from "styled-components"
import * as EmailValidator from "email-validator";
import { Container } from '@mui/material';
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from 'react-firebase-hooks/firestore';

export default function FormDialog() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [user] = useAuthState(auth);
  const userChatRef = db.collection('chats').where('users', 'array-contains', user.email)
  const [chatsSnapshot] = useCollection(userChatRef)
  const [input, setInput] = React.useState("")


  const createChat = () => {
    if (!input) return null;
    if (EmailValidator.validate(input) && !chatAlreadyExists(input) && input !== user.email) {
      //We add the chat into de DB 'chats' collection if it doesnt already exists and is valid
      db.collection('chats').add({
        users: [user.email, input],
        type: "singleChat"
      })
    }
    handleClose();
  };

  const chatAlreadyExists = (recipientEmail) =>
    !!chatsSnapshot?.docs.find(
      (chat) =>
        chat.data().users.find((user) => user === recipientEmail)?.length > 0
    );

  return (
    <Container>
      <SidebarButton onClick={handleClickOpen}>
        Start a new chat
      </SidebarButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <DialogContentText style={{ color: 'teal' }}>
            Please enter an email address for the user you wish to chat with.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
            value={input}
            onChange={e => setInput(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{ color: 'teal', borderColor: 'teal' }} variant="outlined">Cancel</Button>
          <Button onClick={createChat} style={{ color: 'white', backgroundColor: 'teal' }} variant="contained">Start</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}


const SidebarButton = styled(Button)`
width: 100%;

&&& {
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
    color: #234839;
}
`;

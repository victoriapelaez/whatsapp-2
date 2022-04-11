import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import * as EmailValidator from "email-validator";
import { Container } from '@mui/material';
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from 'react-firebase-hooks/firestore';
import ChatIcon from '@mui/icons-material/Chat';
import { IconButton } from '@material-ui/core';

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
  const [input2, setInput2] = React.useState("")
  const [nameGroup, setNameGroup] = React.useState("")

  const createChatGroup = () => {
    console.log("createChat", input, input2);

    if (!input || !input2) return null;
    if (EmailValidator.validate(input) && EmailValidator.validate(input2) ) {
      db.collection('chats').add({
        users: [user.email, input, input2],
        type: "groupChat",
        nameGroup: nameGroup
      })
    }
    handleClose();
  };

  return (
    <Container>
      <IconButton onClick={handleClickOpen}>
        <ChatIcon >
          Start a new chat
        </ChatIcon>
      </IconButton>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <DialogContentText style={{ color: 'teal' }}>
            Please enter the emails address for the users you wish to chat with.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Email Address 1"
            type="email"
            fullWidth
            variant="standard"
            value={input}
            onChange={e => setInput(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Email Address 2"
            type="email"
            fullWidth
            variant="standard"
            value={input2}
            onChange={e => setInput2(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Name Group"
            type="text"
            fullWidth
            variant="standard"
            value={nameGroup}
            onChange={e => setNameGroup(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{ color: 'teal', borderColor: 'teal' }} variant="outlined">Cancel</Button>
          <Button onClick={createChatGroup} style={{ color: 'white', backgroundColor: 'teal' }} variant="contained">Start</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}


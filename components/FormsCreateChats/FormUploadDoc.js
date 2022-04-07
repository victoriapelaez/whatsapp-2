import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { Container, IconButton } from '@mui/material';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { auth, db } from '../../firebase'
import firebase from "firebase/compat/app";
import { useRouter } from "next/router";
import { useAuthState } from 'react-firebase-hooks/auth';
import AttachFileIcon from "@mui/icons-material/AttachFile";

export default function FormUploadDoc() {
    const [user] = useAuthState(auth);
    const [open, setOpen] = React.useState(false);
    const [caption, setCaption] = React.useState('')
    const router = useRouter();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const sendDoc = (docUrl) => {
        db.collection('users').doc(user.uid).set({
            lastSeen: firebase.firestore.FieldValue.serverTimestamp()
        }), { merge: true }

        db.collection('chats').doc(router.query.id).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: {
                messageText: docUrl,
                type: 'pdf',
            },
            user: user.email,
        })
    }

    const docHandler = async (e) => {
        const metadata = {
            contentType: 'application/pdf'
        };
        const archivo = e.target.files[0];
        const storageRef = getStorage();
        const archivoPath = ref(storageRef, 'documents/' + archivo.name)
        const uploadTask = uploadBytesResumable(archivoPath, archivo, metadata)

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                )
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                }
            },
            (error) => {

                switch (error.code) {
                    case 'storage/unauthorized':
                        break;
                    case 'storage/canceled':
                        break;
                    case 'storage/unknown':
                        break;
                }
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    sendDoc(downloadURL)
                });
            })
        handleClose()
    };

    return (
        <Container>
            <IconButton>
                <AttachFileIcon onClick={handleClickOpen} />
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                    <DialogContentText style={{ color: 'teal' }}>
                        Choose a document to upload
                    </DialogContentText>
                    <form>
                        <br></br>
                        <input type="text" placeholder="Enter a caption..." hidden onChange={e => setCaption(e.target.value)} value={caption} />
                        <input type="file" onChange={docHandler} />
                        <br></br>
                        <Button onClick={handleClose} style={{ color: 'teal', borderColor: 'teal', marginTop: '10px' }} variant="outlined">Cancel</Button>
                        {/*  <Button onSubmit={archivoHandler} style={{ color: 'white', backgroundColor: 'teal' }} type="submit" variant="contained">Upload</Button> */}

                    </form>
                </DialogContent>
            </Dialog>
        </Container>
    );
}

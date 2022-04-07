import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { Container, IconButton } from '@mui/material';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { auth, db } from '../../firebase'
import firebase from "firebase/compat/app";
import { useRouter } from "next/router";
import { useAuthState } from 'react-firebase-hooks/auth';
import CloseIcon from '@mui/icons-material/Close';
import CameraIcon from '@mui/icons-material/CameraAltOutlined';

export default function FormUploadImage() {
    const [user] = useAuthState(auth);
    const [open, setOpen] = React.useState(false);
    const [caption, setCaption] = React.useState('')
    const [progress, setProgress] = React.useState(0)
    const router = useRouter();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const sendImage = (ImageUrl) => {
        db.collection('users').doc(user.uid).set({
            lastSeen: firebase.firestore.FieldValue.serverTimestamp()
        }), { merge: true }

        db.collection('chats').doc(router.query.id).collection('messages').add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: {
                messageText: ImageUrl,
                type: 'file',
            },
            user: user.email,
        })
    }

    const archivoHandler = async (e) => {
        const metadata = {
            contentType: 'image/jpeg'
        };
        const archivo = e.target.files[0];
        const storageRef = getStorage();
        const archivoPath = ref(storageRef, 'images/' + archivo.name)
        const uploadTask = uploadBytesResumable(archivoPath, archivo, metadata)

        uploadTask.on('state_changed',
            (snapshot) => {
                setProgress(Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
                ))

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
                    sendImage(downloadURL)
                    handleClose()
                });
            })
    };

    return (
        <Container>
            <IconButton>
                <CameraIcon onClick={handleClickOpen} />
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                    <IconButton onClick={handleClose} style={{  marginLeft:'350px' }}>
                        <CloseIcon style={{width: "15px", height: "15px"}} />
                    </IconButton>
                    <DialogContentText style={{ color: 'teal', textAlign: 'center', fontWeight: 'bold' }}>
                        CHOOSE AN IMAGE TO SEND
                    </DialogContentText>
                    <form style={{margin:'20px'}}>
                        <br />
                        <progress value={progress} onChange={e => setProgress(e.target.value)} max='100' style={{ width: '300px'}}></progress> {progress + '%'}
                        <br />
                        <input type="text" placeholder="Enter a caption..." hidden onChange={e => setCaption(e.target.value)} value={caption} />
                        <input type="file" onChange={archivoHandler} />
                        <br />
                    </form>
                </DialogContent>
            </Dialog>
        </Container>
    );
}





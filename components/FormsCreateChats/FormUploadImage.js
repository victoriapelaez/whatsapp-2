import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { Container, IconButton } from '@mui/material';
import { getBlob, getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { auth, db } from '../../firebase'
import firebase from "firebase/compat/app";
import { useRouter } from "next/router";
import { useAuthState } from 'react-firebase-hooks/auth';
import Progress from "../Progress"

export default function FormUploadImage() {
    const [user] = useAuthState(auth);
    const [open, setOpen] = React.useState(false);
    const [image, setImage] = React.useState(null)
    const [progress, setProgress] = React.useState(0)
    const [caption, setCaption] = React.useState('')
    const router = useRouter();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }

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

    const getBase64FromUrl = async (url) => {
        const data = await fetch(url);
        const blob = await data.blob();
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
                const base64data = reader.result;
                resolve(base64data);
            }
        });
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
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                )
                setProgress(progress)
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
                    console.log('File available at', downloadURL);
                    sendImage(downloadURL)
                });
            })
        handleClose()
    };

    return (
        <Container>
            <IconButton onClick={handleClickOpen} style={{ fontSize: '15px' }}>
                Desde Galería
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                    <DialogContentText style={{ color: 'teal' }}>
                        Choose an image to upload
                    </DialogContentText>
                    <form>
                        <Progress />
                        <br></br>
                        <input type="text" placeholder="Enter a caption..." hidden onChange={e => setCaption(e.target.value)} value={caption} />
                        <input type="file" onChange={archivoHandler} />
                        {/*  <Button onClick={handleClose} style={{ color: 'teal', borderColor: 'teal' }} variant="outlined">Cancel</Button>
                    <Button onSubmit={archivoHandler} style={{ color: 'white', backgroundColor: 'teal' }} type="submit" variant="contained">Upload</Button>
                 */}
                    </form>
                </DialogContent>
            </Dialog>
        </Container>
    );
}





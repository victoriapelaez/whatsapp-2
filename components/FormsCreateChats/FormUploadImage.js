import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import { Container, IconButton } from '@mui/material';
import { db } from "../../firebase";
import storage from "../../firebase"

export default function FormUploadImage() {
    const [open, setOpen] = React.useState(false);
    const [image, setImage] = React.useState(null)
    const [progress, setProgress] = React.useState(0)
    const [caption, setCaption] = React.useState('')


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

    const handleUpload = () => {
        const uploadTask = storage(`images/${image.name}`).put(image)
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                )
                setProgress(progress)
            },
            (error) => {
                console.log(error);
                alert(error.message)
            },
            () => {
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        db.collection('images').add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption,
                            ImageUrl: url,
                        })

                        setProgress(0);
                        setCaption("");
                        setImage(null)
                    })
            }
        )

    }

    return (
        <Container>
            <IconButton onClick={handleClickOpen}>
                <AddPhotoAlternateIcon />
            </IconButton>
            <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                    <DialogContentText style={{ color: 'teal' }}>
                        Choose an image to upload
                    </DialogContentText>
                    <form>
                        {/* <progress value={progress} max="100" /> */}
                        <input type="text" placeholder="Enter a caption..." hidden onChange={e => setCaption(e.target.value)} value={caption}
                            
                        ></input>
                        <input type="file" onChange={handleChange} />
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} style={{ color: 'teal', borderColor: 'teal' }} variant="outlined">Cancel</Button>
                    <Button onClick={handleUpload} style={{ color: 'white', backgroundColor: 'teal' }} type="submit" variant="contained">Upload</Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}





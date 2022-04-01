import * as React from 'react';
import { auth, db } from "../../firebase";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { IconButton } from "@material-ui/core";
import FormUploadImage from '../FormsCreateChats/FormUploadImage';
import PostAddIcon from '@mui/icons-material/PostAdd';
import CloseIcon from '@mui/icons-material/Close';

function FadeMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton
                id="fade-button"
                aria-controls={open ? 'fade-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <AttachFileIcon />
            </IconButton>
            <Menu
                id="fade-menu"
                MenuListProps={{
                    'aria-labelledby': 'fade-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
                style={{textAlign:'center'}}
            >
                <FormUploadImage />
                <div>
                <IconButton>
                    <PostAddIcon />
                </IconButton>
                </div>
                <IconButton>
                    <CloseIcon onClick={handleClose} style={{width:"10px", height:"10px"}}/>
                </IconButton>
            </Menu>
        </div>
    );
}



export default FadeMenu;
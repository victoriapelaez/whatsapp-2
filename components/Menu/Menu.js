import * as React from 'react'; 
import Menu from '@mui/material/Menu';
import Fade from '@mui/material/Fade';
import { IconButton } from "@material-ui/core";
import FormUploadImage from '../FormsCreateChats/FormUploadImage';
import CloseIcon from '@mui/icons-material/Close';
import CameraIcon from '@mui/icons-material/CameraAltOutlined';
import styled from "styled-components"

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
        <MenuContainer >
            <IconButton
                id="fade-button"
                aria-controls={open ? 'fade-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <CameraIcon />
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
                <IconButton style={{fontSize:'15px'}}>
                    Desde cámara
                </IconButton>
                </div>
                <IconButton>
                    <CloseIcon onClick={handleClose} style={{width:"10px", height:"10px"}}/>
                </IconButton>
            </Menu>
        </MenuContainer>
    );
}

export default FadeMenu;
const MenuContainer = styled.div`
width: 100px;
`
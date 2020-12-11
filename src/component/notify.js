import React, { useState, useEffect, useContext } from 'react';
import storeContext from 'reducer/context';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { withStyles } from '@material-ui/core/styles';
import { t } from 'locales';
import play from 'library/sound';

const StyledAlert = withStyles(theme => ({
    action: {
        marginRight: '-8px',
        marginLeft: 'auto',
        paddingLeft: '16px',
        paddingRight: '0',
    },
    icon: {
        marginLeft: '-8px',
        marginRight: '12px',
    },
    message: {
        fontSize: '.7rem'
    }
}))(MuiAlert);

const StyledSnackbar = withStyles(theme => ({

}))(Snackbar);

export default function Notify(props) {
    const { app: { game } } = useContext(storeContext);

    const [open, setOpen] = useState(false);
    const [type, setType] = useState('success');
    const [msg, setMsg] = useState('hi');

    useEffect(() => {
        game.add('notify', notify);
    }, []);

    const notify = (msg) => {
        for (let type in msg) {
            play(type == 'success' ? 'win' : 'lose')
            setType(type);
            let tmp = Array.isArray(msg[type]) ? msg[type].map(e => t(e)).join('') : t(msg[type])
            setMsg(tmp);
        }
        setOpen(true);
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    }

    return (
        <StyledSnackbar open={open} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} onClose={handleClose}>
            <StyledAlert elevation={6} variant="filled" onClose={handleClose} severity={type} >
                {msg}
            </StyledAlert>
        </StyledSnackbar>

    )
};
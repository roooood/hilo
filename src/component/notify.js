import React, { useState } from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { withStyles } from '@material-ui/core/styles';

const StyledAlert = withStyles(theme => ({
    action: {
        marginRight: 'auto',
        marginLeft: '-8px',
        paddingRight: '16px',
        paddingLeft: '0',
    },
    icon: {
        marginRight: '-8px',
        marginLeft: '12px',
    },
    message: {
        fontSize: '.7rem'
    }
}))(MuiAlert);

const StyledSnackbar = withStyles(theme => ({

}))(Snackbar);

export default function Notify(props) {
    const [open, setOpen] = useState(false);
    const [type, setType] = useState('success');
    const [msg, setMsg] = useState('hi');

    useEffect(() => {
        game.add('notify', notify);
    }, []);

    const notify = (msg) => {
        for (let type in msg) {
            setType(type);
            setMsg(msg[type]);
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
        <Snackbar open={open} autoHideDuration={6000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} onClose={handleClose}>
            <StyledAlert elevation={6} variant="filled" onClose={handleClose} severity={type} >
                {msg.split('.').map((item, i) => {
                    return <div key={i}>{item}</div>;
                })}
            </StyledAlert>
        </Snackbar>

    )
};
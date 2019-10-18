import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

const DeleteDialog = props =>
    <Dialog
        open={props.open}
        onClose={props.onClose}>
        <DialogTitle>{'Вы действительно хотите удалить?'}</DialogTitle>
        <DialogActions>
            <Button onClick={props.onCancel} color='primary' autoFocus>
                Отмена
            </Button>
            <Button onClick={props.onConfirm} color='secondary'>
                Удалить
            </Button>
        </DialogActions>
    </Dialog>
    ;

export default DeleteDialog;

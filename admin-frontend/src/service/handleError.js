import {toast} from 'react-toastify';

export default function handleError(error) {
    console.log('handleError');

    if (error.hasOwnProperty('error')) {
        toast.error(error.error);
        return;
    }

    if (error.hasOwnProperty('message')) {
        toast.error(error.message);
        return;
    }
    
    if (Array.isArray(Object.values(error)[0])) {
        toast.error(Object.values(error)[0][0]);
        return;
    }


    console.log(error);

}

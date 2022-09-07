import { signInWithGoogle, signInWithFacebook, signOut } from '../../apis/firebase/firebase';
import { actionStartLoading, actionUpdateUserData, actionUpdateUserError } from './UserConstants';

function startLoading() {
    return {
        type: actionStartLoading,
    }
}
function updateUserData(payload) {
    return {
        type: actionUpdateUserData,
        payload
    }
}
function updateUserError(payload) {
    return {
        type: actionUpdateUserError,
        payload
    }
}

export function loginUser() {
    return (dispatch) => {
        dispatch(startLoading());

        signInWithGoogle().then(userData => {
            dispatch(updateUserData(userData.user));
        }).catch(error => {
            dispatch(updateUserError(error));
        });
    }
}

export function loginUserF() {
    return (dispatch) => {
        dispatch(startLoading());

        signInWithFacebook().then(userData => {
            dispatch(updateUserData(userData.user));
        }).catch(error => {
            dispatch(updateUserError(error));
        });
    }
}

export function logoutUser() {
    return dispatch => {
        dispatch(startLoading());

        signOut().then(() => {
            dispatch(updateUserData(null));
        }).catch((error) => {
            dispatch(updateUserError(error));
        });
    }
}
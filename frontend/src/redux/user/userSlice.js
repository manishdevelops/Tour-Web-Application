import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: null,
    deactivateAccount: false,
    logoutAccount: false,
    deleteTour: false,
    deleteUser: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
        },
        updateUserSuccess: (state, action) => {
            state.currentUser = action.payload;
        },
        deleteUserSuccess: (state) => {
            state.currentUser = null;
        },
        logOutUserSuccess: (state) => {
            state.currentUser = null;
        },
        setActiveAccount: (state, action) => {
            state.deactivateAccount = action.payload;
        },
        setLogoutAccount: (state, action) => {
            state.logoutAccount = action.payload;
        },
        setDeleteTour: (state, action) => {
            state.deleteTour = action.payload
        },
        setDeleteUser: (state, action) => {
            state.deleteUser = action.payload
        }
    }
});

export const { signInSuccess, updateUserSuccess, deleteUserSuccess, logOutUserSuccess, setActiveAccount, setLogoutAccount, setDeleteTour, setDeleteUser } = userSlice.actions;

export default userSlice.reducer;
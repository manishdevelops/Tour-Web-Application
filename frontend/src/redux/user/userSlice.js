import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: null,
    deactivateAccount: false,
    logoutAccount: false
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
        }
    }
});

export const { signInSuccess, updateUserSuccess, deleteUserSuccess, logOutUserSuccess, setActiveAccount, setLogoutAccount } = userSlice.actions;

export default userSlice.reducer;
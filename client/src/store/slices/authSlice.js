import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        isAuthenticated: false,
        role: null, // STUDENT, INSTITUTION, ADMIN
    },
    reducers: {
        setCredentials: (state, action) => {
            const { user } = action.payload;
            state.user = user;
            state.isAuthenticated = true;
            state.role = user.role;
        },
        logout: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.role = null;
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUserRole = (state) => state.auth.role;

import { createSlice } from "@reduxjs/toolkit";
import { request } from "@/utils";
import { getLocalToken, setLocalToken } from "@/utils/token";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        token: getLocalToken() || ''
    },
    reducers: {
        setToken(state, action) {
            state.token = action.payload
            setLocalToken(action.payload)
        }
    }
})

const { setToken } = userSlice.actions

const fetchLogin = (loginForm) => {
    return async (dispatch) => {
        const res = await request.post('/login', loginForm)
        dispatch(setToken(res.token))
    }
}



export { fetchLogin }

export default userSlice.reducer
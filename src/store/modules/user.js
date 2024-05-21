import { createSlice } from "@reduxjs/toolkit";
import { request } from "@/utils";
import { getLocalToken, setLocalToken } from "@/utils/token";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        token: getLocalToken() || '',
        userInfo: {}
    },
    reducers: {
        setToken(state, action) {
            state.token = action.payload
            setLocalToken(action.payload)
        },
        setUserInfo(state, action){
            state.userInfo = action.payload
        }
    }
})

const { setToken, setUserInfo } = userSlice.actions

const fetchLogin = (loginForm) => {
    return async (dispatch) => {
        const res = await request.post('/login', loginForm)
        dispatch(setToken(res.token))
    }
}





export { fetchLogin, setUserInfo}

export default userSlice.reducer
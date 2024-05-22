import { createSlice } from "@reduxjs/toolkit";
import { request } from "@/utils";
import { getLocalToken, setLocalToken, clearLocalToken } from "@/utils/token";
import { loginAPI } from "@/apis/user";

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
        },
        clearUserInfo(state){
            state.token = ''
            state.userInfo = {}
            clearLocalToken()
        }
    }
})

const { setToken, setUserInfo, clearUserInfo } = userSlice.actions

const fetchLogin = (loginForm) => {
    return async (dispatch) => {
        const res = await loginAPI(loginForm)
        dispatch(setToken(res.token))
    }
}





export { fetchLogin, setUserInfo, clearUserInfo}

export default userSlice.reducer
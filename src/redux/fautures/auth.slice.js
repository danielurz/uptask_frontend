import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    userData: {},
    chargingUserData: true
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        updateCharging: (state,{payload:boolean}) => {
            state.chargingUserData = boolean
        },
        updateUserData: (state,{payload:userData}) => {
            state.userData = userData
        },
        resetUserData: (state) => {
            state.userData = {}
        }
    }
})


export const {updateCharging,updateUserData,resetUserData} = authSlice.actions
export default authSlice.reducer
import { configureStore, createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { StringDecoder } from "string_decoder";
import { setJwtFromApi } from "../pages/api/setJwtTest";
import signup from "../pages/api/signup";
import cookie from 'cookie'


/* 
export const signupToApi = createAsyncThunk(
    'signup/user',
    async (data, thunkApi) => {
        console.log("hej", data);
        const response = await fetch(`http://localhost:3333/auth/local/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })


        let resData = await response.json()
        if (response.status === 200) {
    console.log("response ok");
    
    return { ...resData, firstname: resData.firstname }
          } else {
            console.log("response NOT ok");
            return thunkApi.rejectWithValue(data)
          }
     }) */
   export const signupToApi = createAsyncThunk(
        "users/signupUser",
        async (data:any, thunkAPI) => {

        
            const response = await fetch(
              "http://localhost:3333/auth/local/signup",
              {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
              }
            )
            let resData = await response.json()
            console.log("data", data)
        
          /*   setJwtFromApi(resData, res) */
        /*     return resData */

        console.log(response.status);
        
            if (response.status === 201) {
           console.log("no error", resData);
          /*  dispatch(signupUser({firstname: "henrikke", lastname: 'lol', email:'chips'})) */
              return resData
            } else {
                console.log(" error", resData);
              return thunkAPI.rejectWithValue(resData.message)
            }
      
        }
      )


      export const loginToApi = createAsyncThunk(
        "users/loginUser",
        async (data:any, thunkAPI) => {

            console.log("login slice",data);
            
        
            const response = await fetch(
              "http://localhost:3333/auth/local/signin",
              {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
              }
            )
            let resData = await response.json()

           
            
          /*   setJwtFromApi(resData, res) */
        /*     return resData */

        console.log(response.status);
        
            if (response.status === 200) {
           console.log("no error", resData);

           console.log("HALLO")
           console.log("HALLO")
           console.log("set this", resData.access_token)
           
           
           console.log("HALLO")
           console.log("HALLO")
           console.log("HALLO")
           cookie.serialize('Set-Cookie', cookie.serialize('name', String("askldasd"), {
            httpOnly: false,

            maxAge: 60 * 60 * 24 * 7, // 1 week
         
           }))

      
           cookie.serialize("AT", String(resData.access_token), {
            httpOnly: false,

            maxAge: 60 * 60 * 24 * 7, // 1 week
         
          }),
          cookie.serialize("RT", String(resData.refresh_token), {
            httpOnly: true,

            maxAge: 60 * 60 * 24 * 7, // 1 week
            sameSite: 'strict',
            path: '/'
          })
          /*  dispatch(signupUser({firstname: "henrikke", lastname: 'lol', email:'chips'})) */
              return resData
            } else {
                console.log(" error", resData);
              return thunkAPI.rejectWithValue(resData.message)
            }
      
        }
      )
interface User {
    firstname: any
    lastname: String
    email: string

}

interface userSliceState {
    user: User
    pending: boolean,
    done: boolean, 
    tokens: any,
    data: any
}

const initialState: userSliceState = {
    user: {
        firstname: 'sad',
        lastname: '',
        email: '',

    },
    pending: false,
    done: false, 
    tokens: 'hhej',
    data:[]


}

export const userSlice = createSlice({
    name: 'user',
    initialState:initialState,
    reducers: {
        signupUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload 
        },
        loginUser: (state, action: PayloadAction<User>) => {

        },
        logoutUser: (state) => {

        }
    },
    extraReducers: (builder) => {
        builder.addCase(signupToApi.fulfilled, (state, action) => {
            state.pending = false
            state.user.firstname = action.payload.access_token
            
    /*         state.user = {firstname:action.payload.user.firstname, lastname:action.payload.user.lastname, email:action.payload.user.email} */
            state.tokens = action.payload.access_token
          }),
        builder.addCase(signupToApi.pending, (state, action) => {
          state.pending = true
        }),
        builder.addCase(signupToApi.rejected, (state, action) => {
            state.pending = false
            state.user.firstname = action.payload
    
          }),
          builder.addCase(loginToApi.fulfilled, (state, action) => {
            state.pending = false
            state.user.firstname = action.payload.access_token
            
    /*         state.user = {firstname:action.payload.user.firstname, lastname:action.payload.user.lastname, email:action.payload.user.email} */
            state.tokens = action.payload.access_token
          }),
        builder.addCase(loginToApi.pending, (state, action) => {
          state.pending = true
        }),
        builder.addCase(loginToApi.rejected, (state, action) => {
            state.pending = false
            state.user.firstname = action.payload
    
          })
   
      
    
    }
})

export const {signupUser, loginUser, logoutUser} = userSlice.actions





export const selectUser = (state:any) => state.user.user
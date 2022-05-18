import { configureStore, createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { StringDecoder } from "string_decoder";
import { setJwtFromApi } from "../pages/api/setJwtTest";
import signup from "../pages/api/signup";


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
        async (data, thunkAPI) => {
        
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
           
              return resData
            } else {
                console.log(" error", resData);
              return thunkAPI.rejectWithValue('noob')
            }
      
        }
      )

interface User {
    firstname: string
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

            state.user.firstname = "KANONDÅRLIGT"
    
          })
   
      
    
    }
})

export const {signupUser, loginUser, logoutUser} = userSlice.actions





export const selectUser = (state:any) => state.user.user
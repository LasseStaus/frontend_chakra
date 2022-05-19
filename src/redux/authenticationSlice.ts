import { configureStore, createSlice, PayloadAction, createAsyncThunk, SerializedError } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { StringDecoder } from "string_decoder";
import cookie from 'cookie'
export const loginToApi = createAsyncThunk(
    "users/loginss",
    async (data:any, thunkAPI) => {
        const response = await fetch(
          "http://localhost:3000/api/setJwtTest/",
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
    
        if (response.status === 200) {
       console.log("no error", resData);
      /*  dispatch(signupUser({firstname: "henrikke", lastname: 'lol', email:'chips'})) */
          return resData
        } else {
            console.log(" error", resData);
          return thunkAPI.rejectWithValue(resData.message)
        }
  
    }
  )

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
            console.log(" error", resData.message);
          return thunkAPI.rejectWithValue(resData.message)
        }
  
    }
  )

export const logoutApi = createAsyncThunk(
  "users/logout",
  async ( thunkAPI) => {
    console.log("lougt createasync")
      const response = await fetch(
        "http://localhost:3000/api/logout",
        {
          method: "POST",
          headers: {
    /*         Accept: "application/json", */
            "Content-Type": "application/json",
          },
        
        }
      )
      let resData = await response.json()
      console.log("logout resData", resData)
  
    /*   setJwtFromApi(resData, res) */
  /*     return resData */

  console.log("respose status logout", response.status);
  
      if (response.status === 200) {
      console.log("no error", resData);
    /*  dispatch(signupUser({firstname: "henrikke", lastname: 'lol', email:'chips'})) */
        return resData
      } else {
      
        console.log(" error", resData);
        //todo reject withvalue doesnt work
      //   return thunkAPI.rejectWithValue('faiil')

      }

  }
)
export const authenticateOnLoad = createAsyncThunk(
  "users/authenticateOnLoad",
  async (data,thunkAPI) => {

  console.log("begin auto authentication");
  


      const response = await fetch(
        "http://localhost:3000/api/authenticateOnLoad",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        
        }
      )
      let resData = await response.json()
      console.log("auto authentication resData", resData)

  console.log(" auto authentication respose status", response.status);
  
      if (response.status === 200) {
      console.log("no error", resData);
    /*  dispatch(signupUser({firstname: "henrikke", lastname: 'lol', email:'chips'})) */
        return resData
      } else {
      
        console.log(" error", resData);
        //todo reject withvalue doesnt work
        return thunkAPI.rejectWithValue(resData)

      }

  }
)


    /*   export const loginToApi = createAsyncThunk(
        "users/loginUser",
        async (data:any, thunkAPI) => {

            console.log("login slice",data);
            
        
            const response = await fetch(
              "http://localhost:3000/api/setJwtTest",
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

        console.log("resData login thunk", resData);
        
            if (response.status === 200) {
           console.log("no error", resData);

              return resData
            } else {
                console.log(" error", resData);
              return thunkAPI.rejectWithValue(resData.message)
            }
      
        }
      ) */
interface User {
    firstname: any
    lastname: String
    email: string
}

interface authenticationSliceState {
    user: User | undefined
    pending: boolean,
    tokens: any,
    authenticated: boolean,
    authenticationLoad: boolean,
    loginMessageForUser: string | undefined | SerializedError | unknown
    signupMessageForUser: string | undefined | SerializedError | unknown
    messageForUserState: 'error' | 'success' | undefined
}

const initialState: authenticationSliceState = {
    user: {
        firstname: 'sad',
        lastname: '',
        email: '',
    },
    pending: true,
    tokens: null,
    authenticated: false,
    signupMessageForUser: undefined,
    loginMessageForUser: undefined,
    messageForUserState: undefined,
    authenticationLoad: true


}

export const authenticationSlice = createSlice({
    name: 'user',
    initialState:initialState,
    reducers: {
        updateUser: (state, action: PayloadAction<User>) => {
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
            state.signupMessageForUser= 'Your user has been created! Please go to login'
            state.tokens = action.payload.access_token
          }),
        builder.addCase(signupToApi.pending, (state, action) => {
          state.pending = true
          state.authenticated = false
        }),
        builder.addCase(signupToApi.rejected, (state, action) => {
            state.pending = false
            state.authenticated = false
            state.loginMessageForUser = action.payload
          }),
        builder.addCase(loginToApi.fulfilled, (state, action) => {
          state.pending = false
          state.authenticated = true
          state.user= undefined
          state.loginMessageForUser = "You've successfully logged in!"
  /*         state.user = {firstname:action.payload.user.firstname, lastname:action.payload.user.lastname, email:action.payload.user.email} */
          state.tokens = {AT: action.payload.access_token}
        }),
        builder.addCase(loginToApi.pending, (state, action) => {
          state.pending = true
          state.authenticated = false
        }),
        builder.addCase(loginToApi.rejected, (state, action) => {
            state.pending = false
            state.user = undefined
            state.authenticated = false
            state.loginMessageForUser = action.payload
    
          }),
        builder.addCase(logoutApi.fulfilled, (state, action) => {
          state.pending = false
          state.authenticated = false
          state.user = undefined
  /*         state.user = {firstname:action.payload.user.firstname, lastname:action.payload.user.lastname, email:action.payload.user.email} */
          state.tokens = undefined
          state.loginMessageForUser = action.payload.message
        }),
        builder.addCase(logoutApi.pending, (state, action) => {
          state.pending = true
          state.authenticated = false
        }),
        builder.addCase(logoutApi.rejected, (state, action) => {
            state.pending = false
            state.user = undefined
            state.authenticated = false
          }),
        builder.addCase(authenticateOnLoad.fulfilled, (state, action) => {
          state.pending = false
          state.authenticated = true
          state.user = undefined
  /*         state.user = {firstname:action.payload.user.firstname, lastname:action.payload.user.lastname, email:action.payload.user.email} */
          state.tokens = undefined
          state.pending = false
          state.authenticationLoad = false
         
        }),
        builder.addCase(authenticateOnLoad.pending, (state, action) => {
          state.pending = true
          state.authenticated = false
          state.authenticationLoad = true
        }),
        builder.addCase(authenticateOnLoad.rejected, (state, action) => {
            state.pending = false
            state.user = undefined
            state.authenticated = false
            state.loginMessageForUser = "It's been a while! Please login again "
            state.authenticationLoad = false
          })
    }
})

export const {updateUser, loginUser, logoutUser} = authenticationSlice.actions





export const selectUser = (state:any) => state.user.user
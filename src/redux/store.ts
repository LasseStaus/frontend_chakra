import { configureStore } from '@reduxjs/toolkit'
import { authenticationSlice } from './authenticationSlice'
import { userSlice } from './userSlice'
export const store = configureStore({
  reducer: {
    authentication: authenticationSlice.reducer,
    user: userSlice.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {
          otherValue: 42
        }
      }
    })
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

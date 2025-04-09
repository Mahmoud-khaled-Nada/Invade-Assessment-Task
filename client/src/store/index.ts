import { configureStore } from "@reduxjs/toolkit";

// import sidebarToggleSlice from "./sidebarToggleSlice";
import userSlice from "./userSlice";
import taskSlice from "./taskSlice";

export const store = configureStore({
  reducer: {
    // sidebarToggle: sidebarToggleSlice,
    user: userSlice,
    tasks: taskSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
  devTools: true,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Defaults to localStorage
import organizationReducer from "./slices/organizationSlice";
import departmentReducer from "./slices/departmentSlice";
import userReducer from "./slices/userSlice";
import positionReducer from "./slices/positionSlice";
import teamReducer from "./slices/teamSlice";
import roleReducer from "./slices/roleSlice";
import { combineReducers } from "redux";

// Combine reducers
const rootReducer = combineReducers({
  organizations: organizationReducer,
  departments: departmentReducer,
  positions: positionReducer,
  users: userReducer,
  teams: teamReducer,
  roles: roleReducer,
});

// Configure persist settings
const persistConfig = {
  key: "root",
  storage,
  whitelist: [
    "organizations",
    "departments",
    "positions",
    "users",
    "teams",
    "roles",
  ], // Only persist these reducers
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store with persisted reducer
const store = configureStore({
  reducer: persistedReducer,
});

// Create the persistor
const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { store, persistor };

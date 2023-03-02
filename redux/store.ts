import createSagaMiddleware from "@redux-saga/core";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import AsyncStorage from "@react-native-community/async-storage";

import drivers from "./driverList/driverListSlice";
import rootSaga from "./rootSaga";

const saga = createSagaMiddleware();

const reducers = combineReducers({
  drivers
})

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['drivers']
}

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [saga]
})

export const persistor = persistStore(store);

saga.run(rootSaga);

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
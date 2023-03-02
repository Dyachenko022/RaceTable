import { all } from "@redux-saga/core/effects";
import driversSaga from "./driverList/driverListSaga";

function* rootSaga() {
  yield all([
    driversSaga()    
  ])
}

export default rootSaga;

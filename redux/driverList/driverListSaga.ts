import { put, takeEvery, call, all } from "@redux-saga/core/effects";
import api from "../../api";
import { fetchFailed, setCurrentPage, setDrivers } from "./driverListSlice";

interface ResponseInterface{
  config?:any,
  data?:any,
  headers?:any,
  request?:any,
  status?:number,
  statusText?:string
}

function* fetchDriversWorker(action: any) {
  try {
    const response: ResponseInterface = yield call(api.getDrivers, action.payload);

    yield all([
      put(setDrivers(response.data.MRData.DriverTable.Drivers)),
      put(setCurrentPage(action.payload + 1))
    ])
  } catch (e) {
    put(fetchFailed())
  }
}

function* driversSaga() {
  yield takeEvery('drivers/fetchDrivers', fetchDriversWorker);
}

export default driversSaga;

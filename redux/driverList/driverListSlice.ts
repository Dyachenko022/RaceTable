import { createSlice } from "@reduxjs/toolkit";

interface initialStateInterface {
  drivers: Array<any>,
  loading: boolean,
  errorMessage: string | null,
  currentPage: number
}

const initialState: initialStateInterface = {
  drivers: [],
  loading: false,
  errorMessage: null,
  currentPage: 0
}

const drivers = createSlice({
  name: 'drivers',
  initialState,
  reducers: {
    fetchDrivers: (state, action) => {
      return {
        ...state,
        currentPage: action.payload,
        loading: true
      }
    },
    setDrivers: (state, action) => {
      return {
        ...state,
        errorMessage: null,
        drivers: state.currentPage === 0 ? action.payload : [...state.drivers, ...action.payload],
        loading: false,
      }
    },
    fetchFailed: (state) => {
      return {
        ...state,
        loading: false,
        errorMessage: 'Ошибка загрузки, повторите попытку'
      }
    },
    setLoading: (state, action) => {
      return {
        ...state,
        loading: action.payload
      }
    },
    setCurrentPage: (state, action) => {
      return {
        ...state,
        currentPage: action.payload
      }
    }
  }
})

export const { fetchDrivers, setLoading, setDrivers, fetchFailed, setCurrentPage } = drivers.actions;

export default drivers.reducer;

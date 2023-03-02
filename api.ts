import axios from "axios";

import { DRIVER_LIST_PAGE_LIMIT } from "./constants";

const apiWrapper = axios.create({
  baseURL: 'https://ergast.com/api/f1',
  params: {
    limit: DRIVER_LIST_PAGE_LIMIT
  }
})

const api = {
  getDrivers: async (page: number) => {
    const response = await apiWrapper.get('drivers.json', {
      params: {
        offset: DRIVER_LIST_PAGE_LIMIT*page
      }
    })

    return response;
  },
  getDriverRaces: async (driverId: string, page: number) => {
    const response = await apiWrapper.get(`drivers/${driverId}/races.json`, {
      params: {
        offset: DRIVER_LIST_PAGE_LIMIT*page
      }
    })

    return response;
  }
}

export default api;

import { Constant } from "../constants/constants"

export const defineBaseUrl = (serviceId) => {
  const BASE_URL = serviceId === Constant.EXPRESS_ID ? import.meta.env.VITE_BASE_URL_EXPRESS : import.meta.env.VITE_BASE_URL_NEST;

  return BASE_URL;
}
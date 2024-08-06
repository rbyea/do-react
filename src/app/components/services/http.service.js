import axios from "axios";
import configFire from "../config/config.json";
import { toast } from "react-toastify";

const createHttpClient = (baseURL) => {
  const client = axios.create({ baseURL });

  client.interceptors.request.use(
    async function (config) {
      const headers = {
        "Content-Type": "application/json",
        Accept: "*/*",
        ...config.headers,
      };

      config.headers = headers;
      return config;
    },
    function (error) {
      return Promise.reject(error);
    },
  );

  client.interceptors.response.use(
    (res) => res,
    function (error) {
      console.log(error);
      toast.error(error.response.data.message, {
        autoClose: 3000,
      });

      const expectedErrors =
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500;
      if (!expectedErrors) {
        console.log(error);
      }
      return Promise.reject(error);
    },
  );

  return client;
};

const http = createHttpClient(configFire.apiEndPoint);

const httpService = {
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete,
  patch: http.patch,
};

export default httpService;

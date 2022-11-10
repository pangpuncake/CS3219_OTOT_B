import axios from "axios";

const animalSvcAxiosClient = axios.create({
  baseURL: process.env.REACT_APP_ANIMAL_SVC_URL,
});

const requests = (api: any) => {
  return {
    get: (url: string) => {
      return api.get(url);
    },
    post: (url: string, data: object, token?: string) => {
      if (token) {
        return api.post(url, data, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
      }
      return api.post(url, data);
    },
    put: (url: string, data: object, token?: string) => {
      if (token) {
        return api.put(url, data, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
      }
      return api.put(url, data);
    },
    delete: (url: string, data: object, token?: string) => {
      if (token) {
        return api.delete(url, { "data": data }, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
      }
      return api.delete(url, { "data": data });
    },
  };
};

const animalSvcClient = requests(animalSvcAxiosClient);
export { animalSvcClient };

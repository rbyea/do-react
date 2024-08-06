import httpService from "./http.service";

const countryService = {
  getCountries: async () => {
    const { data } = await httpService.get("/all");
    return data;
  },
  getCountryItem: async (payload) => {
    const { data } = await httpService.get(`/name/${payload}`);
    return data;
  },
};

export default countryService;

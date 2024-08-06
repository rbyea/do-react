import { createSlice } from "@reduxjs/toolkit";
import countryService from "../services/country.service";

const initialState = {
  entities: {
    countries: [],
  },
  isLoading: false,
  error: null,
};

const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    countriesRequested: (state) => {
      state.isLoading = true;
    },
    countriesReceived: (state, action) => {
      state.entities.countries = action.payload;
      state.isLoading = false;
    },
    profileRequestFailed: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { actions, reducer: countriesReducer } = countriesSlice;
const { countriesRequested, countriesReceived, profileRequestFailed } = actions;

const createAsyncCountriesAction = (serviceMethod, key) => async (dispatch) => {
  dispatch(countriesRequested());
  try {
    console.log("key", key);

    const data = await serviceMethod();

    dispatch(countriesReceived(data));
  } catch (error) {
    console.log(error);
    
    dispatch(profileRequestFailed(error.message));
  }
};

export const getCountriesAll = () =>
  createAsyncCountriesAction(countryService.getCountries, "all");
export const countryItem = (payload) =>
  createAsyncCountriesAction(() => countryService.getCountryItem(payload));

export const getCountriesList = () => (state) =>
  state.countries.entities.countries;
export const getLoadingCounties = () => (state) => state.countries.isLoading;
export const getErrorCountries = () => (state) => state.countries.error;

export default countriesReducer;

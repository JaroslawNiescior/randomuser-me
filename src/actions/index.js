import fetchApi from '../apis/fetchApi';
import { FETCH_API } from './types.js';

export const getFetchApi = () => async (dispatch) => {
  const response = await fetchApi.get('/api?results=100');

  dispatch({ type: FETCH_API, payload: response.data });
};

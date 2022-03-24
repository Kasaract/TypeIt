import axios from 'axios';

import { ACTIONS } from '../actions';

export function getNewExcerpt(language) {
  return async function getNewExcerptThunk(dispatch, getState) {
    const response = await axios.get('/api/textExcerpt/' + language);
    dispatch({ type: ACTIONS.NEWEXCERPT, payload: response.data.join('') });
    dispatch({ type: ACTIONS.RESET });
  };
}

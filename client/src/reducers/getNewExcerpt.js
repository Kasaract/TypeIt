import axios from 'axios';

import { ACTIONS } from '../actions';

export function getNewExcerpt(language) {
  return async function getNewExcerptThunk(dispatch, getState) {
    const res = await axios.get('/api/textExcerpt/' + language);
    dispatch({
      type: ACTIONS.NEWEXCERPT,
      payload: { id: res.data.id, words: res.data.words.join('') },
    });
    dispatch({ type: ACTIONS.RESET });
  };
}

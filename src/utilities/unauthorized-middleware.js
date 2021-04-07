import { useHistory } from 'react-router-dom';

const unAuthorizedMiddleware = () => (dispatch) => (action) => {
  const nextAction = { ...action };
  const history = useHistory();
  if (action.type.match(/_REJECTED$/) && action?.payload?.redirect) {
    setTimeout(() => {
      history.push(action.payload.redirect.pathname, {
        from: history.location
      });
    });
    return;
  }

  return dispatch(nextAction);
};

export default unAuthorizedMiddleware;

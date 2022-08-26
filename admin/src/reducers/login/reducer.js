import{ LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS,
  CHANGE_EMAIL_REQUEST, CHANGE_EMAIL_SUCCESS, CHANGE_EMAIL_FAILURE,
  CHANGE_PASSWORD_REQUEST, CHANGE_PASSWORD_SUCCESS, CHANGE_PASSWORD_FAILURE } from './action'

const initialState = {
  loadingLogin: true,
  loadingLogout: false,
  loadingChangeEmail: false,
  loadingChangePwd: false,
}

export function reducerLogin(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST : {
      return Object.assign({}, state,{
        loadingLogin: true
      });
    }
    case LOGIN_SUCCESS : {
      return Object.assign({}, state,{
        loadingLogin: false
      });
    }
    case LOGIN_FAILURE : {
      return Object.assign({}, state,{
        loadingLogin: true
      });
    }
    case LOGOUT_SUCCESS : {
      return Object.assign({}, state,{
        loadingLogout: true
      });
    }
    case CHANGE_EMAIL_REQUEST : {
      return Object.assign({}, state,{
        loadingChangeEmail: true
      });
    }
    case CHANGE_EMAIL_SUCCESS : {
      return Object.assign({}, state,{
        loadingChangeEmail: false
      });
    }
    case CHANGE_EMAIL_FAILURE : {
      return Object.assign({}, state,{
        loadingChangeEmail: true
      });
    }
    case CHANGE_PASSWORD_REQUEST : {
      return Object.assign({}, state,{
        loadingChangePwd: true
      });
    }
    case CHANGE_PASSWORD_SUCCESS : {
      return Object.assign({}, state,{
        loadingChangePwd: false
      });
    }
    case CHANGE_PASSWORD_FAILURE : {
      return Object.assign({}, state,{
        loadingChangePwd: true
      });
    }
    default: 
      return state;
  }
}


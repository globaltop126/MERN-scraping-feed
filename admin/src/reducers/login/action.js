import { apiClient } from '../../apiClient'
import useCookies from '@react-smart/react-cookie-service';
import { notification } from 'antd';

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
function loginRequest() {
  return {
    type: LOGIN_REQUEST,
  }
}

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
function loginSuccess() {
  return {
    type: LOGIN_SUCCESS,
  }
}

export const LOGIN_FAILURE = 'LOGIN_FAILURE'
function loginFailure() {
  return {
    type: LOGIN_FAILURE,
  }
}

export function ActionLogin(email, password) {
  const { setCookie, getCookie } = useCookies();
  return function (dispatch) {
    dispatch(loginRequest())
    apiClient
      .login(email, password)
      .then((res) => {
        var response = res.data
        if(response.result){
          setCookie('token', response.data['access-token']);
          setCookie('userId', response.data.user._id);
          setCookie('userEmail', response.data.user.email);
          setCookie('auth', true);
          dispatch(loginSuccess())
          return notification.success({
            message: `成功`,
            placement: 'bottomRight',
          });
        } else {
          dispatch(loginFailure())
          return notification.warning({
            message: `警告`,
            description: response.errors.msg,
            placement: 'bottomRight',
          });
        }
      })
      .catch((err) => {
        dispatch(loginFailure())
        return notification.error({
          message: `エラー`,
          description:
            'サーバーエラー！',
          placement: 'bottomRight',
        });
      })
  }
}

export const CHANGE_EMAIL_REQUEST = 'CHANGE_EMAIL_REQUEST'
function changeEmailRequest() {
  return {
    type: CHANGE_EMAIL_REQUEST,
  }
}

export const CHANGE_EMAIL_SUCCESS = 'CHANGE_EMAIL_SUCCESS'
function changeEmailSuccess() {
  return {
    type: CHANGE_EMAIL_SUCCESS,
  }
}

export const CHANGE_EMAIL_FAILURE = 'CHANGE_EMAIL_FAILURE'
function changeEmailFailure() {
  return {
    type: CHANGE_EMAIL_FAILURE,
  }
}

export function ActionChangeEamil(newEmail) {
  const { setCookie, getCookie } = useCookies();
  var userId = getCookie('userId')
  return function (dispatch) {
    dispatch(changeEmailRequest())
    apiClient
      .ChangeEmail(userId, newEmail)
      .then((res) => {
        var response = res.data
        if(response.result){
          setCookie('userEmail', newEmail);
          dispatch(changeEmailSuccess())
          return notification.success({
            message: `成功`,
            placement: 'bottomRight',
          });
        } else {
          dispatch(changeEmailFailure())
          return notification.warning({
            message: `警告`,
            description: response.errors.msg,
            placement: 'bottomRight',
          });
        }
      })
      .catch((err) => {
        dispatch(changeEmailFailure())
        return notification.error({
          message: `エラー`,
          description:
            'サーバーエラー！',
          placement: 'bottomRight',
        });
      })
  }
}

export const CHANGE_PASSWORD_REQUEST = 'CHANGE_PASSWORD_REQUEST'
function changePwdRequest() {
  return {
    type: CHANGE_PASSWORD_REQUEST,
  }
}

export const CHANGE_PASSWORD_SUCCESS = 'CHANGE_PASSWORD_SUCCESS'
function changePwdSuccess() {
  return {
    type: CHANGE_PASSWORD_SUCCESS,
  }
}

export const CHANGE_PASSWORD_FAILURE = 'CHANGE_PASSWORD_FAILURE'
function changePwdFailure() {
  return {
    type: CHANGE_PASSWORD_FAILURE,
  }
}

export function ActionChangePassword(oldPwd, newPwd) {
  const { getCookie } = useCookies();
  var userId = getCookie('userId')
  return function (dispatch) {
    dispatch(changePwdRequest())
    apiClient
      .ChangePassword(userId, oldPwd, newPwd)
      .then((res) => {
        var response = res.data
        if(response.result){
          console.log(response.data)
          dispatch(changePwdSuccess())
          return notification.success({
            message: `成功`,
            placement: 'bottomRight',
          });
        } else {
          dispatch(changePwdFailure())
          return notification.warning({
            message: `警告`,
            description: response.errors.msg,
            placement: 'bottomRight',
          });
        }
      })
      .catch((err) => {
        dispatch(changePwdFailure())
        return notification.error({
          message: `エラー`,
          description:
            'サーバーエラー！',
          placement: 'bottomRight',
        });
      })
  }
}

export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
function logoutSuccess() {
  return {
    type: LOGOUT_SUCCESS,
  }
}

export function ActionLogout() {
  const { setCookie } = useCookies();
  return function (dispatch) {
    setCookie('token', '');
    setCookie('user', '');
    setCookie('auth', false);
    dispatch(logoutSuccess())
  }
}
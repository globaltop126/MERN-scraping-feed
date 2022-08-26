import React, { useState, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CRow,
  CCol,
  CForm,
  CFormInput,
  CAccordion,
  CAccordionItem,
  CAccordionHeader,
  CAccordionBody
} from '@coreui/react'
import { notification } from 'antd';
import { connect } from 'react-redux'
import useCookies from '@react-smart/react-cookie-service';
import { ActionChangePassword, ActionChangeEamil } from 'src/reducers/login/action'
import PropTypes from 'prop-types';

const Setting = (props) =>  {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState({
    old: '',
    new: '',
    confirm: ''
  });

  const onChangeEmail = (e) => {
    let value = e.target.value
    setEmail(value)
  }

  const onChangePassword = (e) => {
    let value = e.target.value
    let key = e.target.name
    setPassword(previousState => {
      return { ...previousState, [key]: value }
    });
  }

  const validationEmail = (newEmail) => {
    if(newEmail === '') return false
    return true
  }

  const onClickEmail = () => {
    if(!validationEmail(email))
      return notification.error({
        message: `エラー`,
        description:
          '入力エラー！',
        placement: 'bottomRight',
      });

    const { dispatch } = props
    dispatch(ActionChangeEamil(email))
    setEmail('')
  }

  const validationPwd = (oldPwd, newPwd, confrimPwd) => {
    if(oldPwd === '' || oldPwd.length < 5) return false
    if(newPwd === '' || newPwd.length < 5) return false
    if(newPwd !== confrimPwd) return false
    return true
  }

  const onClickPassword = () => {
    if(!validationPwd(password.old, password.new, password.confirm)) 
      return notification.error({
        message: `エラー`,
        description:
          '入力エラー！',
        placement: 'bottomRight',
      });

    const { dispatch } = props
    dispatch(ActionChangePassword(password.old, password.new))
    setPassword({
      old: '',
      new: '',
      confirm: ''
    })
  }

  const { getCookie } = useCookies();
  let auth = getCookie('auth');
  if(auth === 'false'){
    return <Navigate to='/login' />
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>設定</strong>
          </CCardHeader>
          <CCardBody>
          <CAccordion flush>
            <CAccordionItem itemKey={1}>
              <CAccordionHeader>メールを変更</CAccordionHeader>
              <CAccordionBody>
                <CForm className="row g-3">
                  <CCol xs={4} />
                  <CCol xs={4}>
                    <CFormInput type="email" value={email} onChange={onChangeEmail} id="inputEmail5" placeholder='newname@gmail.com' />
                  </CCol>
                  <CCol xs={4}>
                    <CButton type="button" onClick={onClickEmail}>変更</CButton>
                  </CCol>
                </CForm>
              </CAccordionBody>
            </CAccordionItem>
            <CAccordionItem itemKey={2}>
              <CAccordionHeader>パスワードの変更</CAccordionHeader>
              <CAccordionBody>
              <CForm className="row g-3">
                <CCol md={4}></CCol>
                <CCol md={4}>
                  <CFormInput type="password" id="inputEmail6" name="old" value={password.old} onChange={onChangePassword} label="古いパスワード" placeholder='パスワードの長さは5より大きい必要があります。' />
                </CCol>
                <CCol md={4}></CCol>
                <CCol md={4}></CCol>
                <CCol xs={4}>
                  <CFormInput type="password" id="inputEmail7" name="new" value={password.new} onChange={onChangePassword} label="新しいパスワード" placeholder='パスワードの長さは5より大きい必要があります。' />
                </CCol>
                <CCol md={4}></CCol>
                <CCol md={4}></CCol>
                <CCol xs={4}>
                  <CFormInput type="password" id="inputEmail8" name="confirm" value={password.confirm} onChange={onChangePassword} label="パスワードの確認" placeholder='パスワードの長さは5より大きい必要があります。' />
                </CCol>
                <CCol md={4}></CCol>
                <CCol md={4}></CCol>
                <CCol xs={4} className="text-center">
                  <CButton type="button" onClick={onClickPassword}>変更</CButton>
                </CCol>
                <CCol md={4}></CCol>
              </CForm>
              </CAccordionBody>
            </CAccordionItem>
          </CAccordion>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

Setting.propTypes = {
  loadingGenre: PropTypes.bool,
  genres: PropTypes.array,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    loadingGenre: state.reducerGenre.loadingGenre,
    genres: state.reducerGenre.genres,
  }
}

export default connect(mapStateToProps)(Setting)

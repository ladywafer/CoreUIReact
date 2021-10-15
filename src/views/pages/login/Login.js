import React, {useContext, useState} from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import UsersApi from "../../../API/UsersApi";
import {AuthContext} from "../../../context";
import Instance from "../../../API/Instance";

const Login = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const {_, setIsAuth} = useContext(AuthContext)

  const login = async () => {
    const response  = await UsersApi.getMe(username, password)
    if (response) {
      localStorage.setItem('credentials', response)
      console.log(Instance.defaults.headers)
      Instance.defaults.headers['Authorization'] = 'Basic ' + response
      setIsAuth(true)
    } else {
      setErrorMessage('Неверный логин или пароль')
    }
  }

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="4">
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Вход</h1>
                    <p className="text-muted">Войдите в свой аккаунт</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="text"
                        placeholder="Имя пользователя"
                        autoComplete="username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="password"
                        placeholder="Пароль"
                        autoComplete="current-password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="12">
                        <CButton
                          color="primary"
                          className="w-100"
                          onClick={login}
                        >
                          Войти
                        </CButton>
                      </CCol>
                    </CRow>
                    <CRow className="justify-content-center mt-3">
                      {errorMessage}
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login

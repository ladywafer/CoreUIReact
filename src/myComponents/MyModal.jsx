import React from 'react';
import {
  CButton,
  CCol,
  CContainer,
  CForm,
  CFormGroup,
  CInput,
  CLabel, CModal,
  CModalBody, CModalHeader,
  CRow
} from "@coreui/react";

const MyModal = ({visible, setVisible, userData, setUserData, updateUsers, isPasswordRequired=false}) => {

  const handleSubmit = () => {
    updateUsers(userData)
  }

  return (
    <div>
      <CModal
        show={visible}
        className="row g-3 needs-validation"
        noValidate
        onSubmit={handleSubmit}
      >
        <CModalHeader>Пользователь</CModalHeader>
        <CModalBody>
          <CContainer fluid>
            <CRow>
              <CCol sm="12">
                <CForm className="was-validated">
                  <CFormGroup  className="has-validation">
                    <CLabel>Имя</CLabel>
                    <CInput
                      type="text"
                      required
                      placeholder="Введите имя.."
                      value={userData.firstName}
                      onChange={e => setUserData({...userData, firstName: e.target.value})}
                    />
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel>Фамилия</CLabel>
                    <CInput
                      type="text"
                      placeholder="Введите фамилию.."
                      value={userData.lastName}
                      onChange={e => setUserData({...userData, lastName: e.target.value})}
                      required
                    />
                  </CFormGroup>

                  <CFormGroup>
                    <CLabel htmlFor="nf-email">Email</CLabel>
                    <CInput
                      id="nf-email"
                      type="email"
                      placeholder="Введите Email.."
                      autoComplete="email"
                      value={userData.email}
                      onChange={e => {
                        setUserData({...userData, email: e.target.value});
                      }}
                      required
                    />
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel>Пароль</CLabel>
                    <CInput
                      type="text"
                      placeholder="Введите пароль.."
                      value={userData.password}
                      onChange={e => setUserData({...userData, password: e.target.value})}
                      required={isPasswordRequired}
                    />
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel>Никнейм</CLabel>
                    <CInput
                      type="text"
                      placeholder="Введите никнейм"
                      value={userData.username}
                      onChange={e => setUserData({...userData, username: e.target.value})}
                      required
                    />
                  </CFormGroup>

                  <div className="float-right mt-3 mb-1">
                    <CButton
                      type="submit"
                      color="primary"
                      disabled={false}
                      className="mr-3"
                    >
                      Сохранить
                    </CButton>
                    <CButton
                      color="secondary"
                      onClick={() => setVisible(false)}
                    >Отмена</CButton>
                  </div>

                </CForm>
              </CCol>
            </CRow>
          </CContainer>
        </CModalBody>
      </CModal>
    </div>
  );
};

export default MyModal;

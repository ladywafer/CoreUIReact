import React, {useEffect, useState} from 'react';
import {
  CButton,
  CCol,
  CContainer,
  CForm,
  CFormGroup,
  CFormText,
  CInput,
  CLabel, CModal,
  CModalBody, CModalFooter,
  CModalHeader,
  CRow
} from "@coreui/react";

const MyModal = ({visible, setVisible, userData, setUserData, updateUsers}) => {
  return (
    <div>
      <CModal
        show={visible}
      >
        <CModalHeader>Новый пользователь</CModalHeader>
        <CModalBody>
          <CContainer fluid>
            <CRow>
              <CCol sm="12">
                <CForm action="" method="post">
                  <CFormGroup>
                    <CLabel>Имя</CLabel>
                    <CInput
                      type="text"
                      placeholder="Введите имя"
                      value={userData.firstName}
                      onChange={e => setUserData({...userData, firstName: e.target.value})}
                    />
                    <CFormText className="help-block">Введите имя</CFormText>
                  </CFormGroup>

                  <CFormGroup>
                    <CLabel>Фамилия</CLabel>
                    <CInput
                      type="text"
                      placeholder="Введите фамилию.."
                      value={userData.lastName}
                      onChange={e => setUserData({...userData, lastName: e.target.value})}
                    />
                    <CFormText className="help-block">Введите фамилию</CFormText>
                  </CFormGroup>

                  <CFormGroup>
                    <CLabel htmlFor="nf-email">Email</CLabel>
                    <CInput
                      type="email"
                      id="nf-email"
                      name="nf-email"
                      placeholder="Введите Email.."
                      autoComplete="email"
                      value={userData.email}
                      onChange={e => setUserData({...userData, email: e.target.value})}
                    />
                    <CFormText className="help-block">Введите email</CFormText>
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel>Пароль</CLabel>
                    <CInput
                      type="text"
                      placeholder="Введите пароль.."
                      value={userData.password}
                      onChange={e => setUserData({...userData, password: e.target.value})}
                    />
                    <CFormText className="help-block">Введите имя пользователя</CFormText>
                  </CFormGroup>
                  <CFormGroup>
                    <CLabel>Имя пользователя</CLabel>
                    <CInput
                      type="text"
                      placeholder="Введите имя пользователя.."
                      value={userData.username}
                      onChange={e => setUserData({...userData, username: e.target.value})}
                    />
                    <CFormText className="help-block">Введите имя пользователя</CFormText>
                  </CFormGroup>

                </CForm>
              </CCol>
            </CRow>
          </CContainer>
        </CModalBody>
        <CModalFooter>
          <CButton color="primary"
                   onClick={() => updateUsers(userData)}
          >Сохранить</CButton>{' '}
          <CButton
            color="secondary"
            onClick={() => setVisible(false)}
          >Отмена</CButton>
        </CModalFooter>
      </CModal>
    </div>
  );
};

export default MyModal;

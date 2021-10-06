import React, {useEffect, useState} from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CDataTable,
  CCollapse,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CForm,
  CContainer,
  CRow,
  CCol,
  CInput,
  CLabel,
  CFormGroup,
  CFormText
} from '@coreui/react'
import UsersApi from "../../API/UsersApi";
import * as details from "core-js";

const Dashboard = () => {
  const [allUsers, setUsers] = useState([]);

  useEffect(() => {
    fetchingUsers()
  }, []);

  async function fetchingUsers() {
    const users = await UsersApi.getAllUsers()
    setUsers(users)
  }


  const fields = [
    {key: "firstName", label: "Имя", _style: {width: '20%'}},
    {key: "lastName", label: "Фамилия", _style: {width: '20%'}},
    {key: "email", label: "Почта", _style: {width: '25%'}},
    {key: "username", label: "Имя пользователя", _style: {width: '15%'}},
    {key: "password", label: "Пароль", _style: {width: '15%'}},
    {key: 'show_details', label: "", _style: {width: '5%'}, filter: false, sorter: false},

  ]
  const [details, setDetails] = useState([])
  const toggleDetails = (index) => {
    const position = details.indexOf(index)
    let newDetails = details.slice()
    if (position !== -1) {
      newDetails.splice(position, 1)
    } else {
      newDetails = [...details, index]
    }
    setDetails(newDetails)
  }

  const [modalAddNewUser, setModalAddNewUser] = useState(false);
  const toggleAddNewUser = () => {
    setModalAddNewUser(!modalAddNewUser);
  }
  const [modalEditUser, setModalEditUser] = useState(false);
  const toggleEditUser = (item) => {
    setModalEditUser(!modalEditUser);
    setEdit(...item)
  }

  const [newUser, setNewUser] = useState({firstName: '', lastName: '', email: '', password: '', username: ''});
  const addNewUser = async () => {
    toggleAddNewUser()
    await UsersApi.addNewUser(newUser)
    fetchingUsers();
  }

  const [edit, setEdit] = useState({firstName: '', lastName: '', email: '', password: '', username: ''});
  const editUser = async (id) =>{
    await UsersApi.editUser(setEdit, id)
  }
  const [deleteUser, setDeleteUser] = useState({id: ''})
  const delUser = async (id) => {
    await UsersApi.deleteUser(id)

  }
  return (
    <div>
      <>
        <CButton
          color="primary"
          onClick={toggleAddNewUser}
          className="mb-2"
        >Добавить нового пользователя
        </CButton>
        <CModal
          show={modalAddNewUser}
          onClose={toggleAddNewUser}
        >
          <CModalHeader closeButton>Новый пользователь</CModalHeader>
          <CModalBody>
            {/*форма*/}
            <CContainer fluid>
              <CRow>
                <CCol sm="12">
                  <CForm action="" method="post">
                    <CFormGroup>
                      <CLabel>Имя</CLabel>
                      <CInput
                        type="text"
                        placeholder="Введите имя"
                        value={newUser.firstName}
                        onChange={e => setNewUser({...newUser, firstName: e.target.value})}
                      />
                      <CFormText className="help-block">Введите имя</CFormText>
                    </CFormGroup>

                    <CFormGroup>
                      <CLabel>Фамилия</CLabel>
                      <CInput
                        type="text"
                        placeholder="Введите фамилию.."
                        value={newUser.lastName}
                        onChange={e => setNewUser({...newUser, lastName: e.target.value})}
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
                        value={newUser.email}
                        onChange={e => setNewUser({...newUser, email: e.target.value})}
                      />
                      <CFormText className="help-block">Введите email</CFormText>
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel>Пароль</CLabel>
                      <CInput
                        type="text"
                        placeholder="Введите пароль.."
                        value={newUser.password}
                        onChange={e => setNewUser({...newUser, password: e.target.value})}
                      />
                      <CFormText className="help-block">Введите имя пользователя</CFormText>
                    </CFormGroup>
                    <CFormGroup>
                      <CLabel>Имя пользователя</CLabel>
                      <CInput
                        type="text"
                        placeholder="Введите имя пользователя.."
                        value={newUser.username}
                        onChange={e => setNewUser({...newUser, username: e.target.value})}
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
                     onClick={addNewUser}
            >Добавить</CButton>{' '}
            <CButton
              color="secondary"
              onClick={toggleAddNewUser}
            >Отмена</CButton>
          </CModalFooter>
        </CModal>
      </>
      <CCard>
        <CDataTable
          items={allUsers}
          fields={fields}
          itemsPerPage={10}
          pagination={
            {align: "center"}
          }
          sorter
          filter
          columnFilter
          tableFilter
          striped
          scopedSlots={{
            'show_details':
              (item, index) => {
                return (
                  <td className="py-2">
                    <CButton
                      color="primary"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        toggleDetails(index)
                      }}
                    >
                      Действия
                    </CButton>
                  </td>
                )
              },
            'details':
              (item, index) => {
                return (
                  <CCollapse show={details.includes(index)}>
                    <CCardBody>
                      <h4>
                        {item.firstName} {item.lastName}
                      </h4>
                      <>
                        <CButton
                          size="sm"
                          color="info"
                          onClick={() => toggleEditUser(item)}
                        >
                          Редактировать
                        </CButton>
                        <CModal
                          show={modalEditUser}
                          onClose={toggleEditUser}
                        >
                          <CModalHeader closeButton>Пользователь</CModalHeader>
                          <CModalBody>
                            {/*форма*/}
                            <CContainer fluid>
                              <CRow>
                                <CCol sm="12">
                                  <CForm action="" method="post">
                                    <CFormGroup>
                                      <CLabel>Имя</CLabel>
                                      <CInput
                                        type="text"
                                        placeholder="Введите имя"
                                        value={edit.firstName}
                                        onChange={e => setEdit({...edit, firstName: e.target.value})}
                                      />
                                      <CFormText className="help-block">Введите имя</CFormText>
                                    </CFormGroup>

                                    <CFormGroup>
                                      <CLabel>Фамилия</CLabel>
                                      <CInput
                                        type="text"
                                        placeholder="Введите фамилию.."
                                        value={edit.lastName}
                                        onChange={e => setEdit({...edit, lastName: e.target.value})}
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
                                        value={edit.email}
                                        onChange={e => setEdit({...edit, email: e.target.value})}
                                      />
                                      <CFormText className="help-block">Введите email</CFormText>
                                    </CFormGroup>
                                    <CFormGroup>
                                      <CLabel>Пароль</CLabel>
                                      <CInput
                                        type="text"
                                        placeholder="Введите пароль.."
                                        value={edit.password}
                                        onChange={e => setEdit({...edit, password: e.target.value})}
                                      />
                                      <CFormText className="help-block">Введите имя пользователя</CFormText>
                                    </CFormGroup>
                                    <CFormGroup>
                                      <CLabel>Имя пользователя</CLabel>
                                      <CInput
                                        type="text"
                                        placeholder="Введите имя пользователя.."
                                        value={edit.username}
                                        onChange={e => setEdit({...edit, username: e.target.value})}
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

                            >Сохранить</CButton>{' '}
                            <CButton
                              color="secondary"
                              onClick={toggleEditUser}
                            >Отмена</CButton>
                          </CModalFooter>
                        </CModal>
                      </>
                      <CButton
                        size="sm"
                        color="danger"
                        className="ml-1"
                        onClick={() => delUser(item.id)}
                      >
                        Удалить
                      </CButton>
                    </CCardBody>
                  </CCollapse>
                )
              }
          }}
        >
        </CDataTable>
      </CCard>
    </div>
  )
}

export default Dashboard

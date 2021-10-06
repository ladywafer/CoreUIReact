import React, {useEffect, useState} from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CDataTable,
  CCollapse,
} from '@coreui/react'
import UsersApi from "../../API/UsersApi";
import MyModal from "../../myComponents/MyModal";

const Dashboard = () => {
  const userState = {firstName: '', lastName: '', email: '', password: undefined, username: ''}

  const [allUsers, setUsers] = useState([]);
  const [details, setDetails] = useState([]);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [userData, setUserData] = useState(userState)


  const fields = [
    {key: "firstName", label: "Имя", _style: {width: '20%'}},
    {key: "lastName", label: "Фамилия", _style: {width: '20%'}},
    {key: "email", label: "Почта", _style: {width: '25%'}},
    {key: "username", label: "Имя пользователя", _style: {width: '15%'}},
    {key: "password", label: "Пароль", _style: {width: '15%'}},
    {key: 'show_details', label: "", _style: {width: '5%'}, filter: false, sorter: false},
  ]

  useEffect(() => {
    fetchingUsers()
  }, []);


  const fetchingUsers = async () => {
    const users = await UsersApi.getAllUsers()
    setUsers(users)
  }

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

  const createNewUser = async (user) => {
    await UsersApi.addNewUser(user)
    setModalVisibility(!modalVisibility)
    await fetchingUsers()
  }

  const editUser = async (user) => {
    await UsersApi.editUser(user, user.id)
    setModalVisibility(!modalVisibility)
    await fetchingUsers()
  }

  const toggleModalNewUser = () => {
    setUserData(userState)
    setModalVisibility(!modalVisibility)
  }

  const toggleModalEditUser = (user) => {
    setUserData(user)
    setModalVisibility(!modalVisibility)
  }

  const delUser = async (id) => {
    await UsersApi.deleteUser(id)
    await fetchingUsers()
  }

  return (
    <div>
      <CButton
        color="primary"
        onClick={toggleModalNewUser}
        className="mb-2"
      >Добавить нового пользователя
      </CButton>
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
                          onClick={() => toggleModalEditUser(item)}
                        >
                          Редактировать
                        </CButton>
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

      <MyModal
        visible={modalVisibility}
        setVisible={setModalVisibility}
        userData={userData}
        setUserData={setUserData}
        updateUsers={createNewUser}
      />

      <MyModal
        visible={modalVisibility}
        setVisible={setModalVisibility}
        userData={userData}
        setUserData={setUserData}
        updateUsers={editUser}
      />
    </div>
  )
}

export default Dashboard

import React, {useEffect, useRef, useState} from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CDataTable,
  CCollapse,
} from '@coreui/react'
import UsersApi from "../../API/UsersApi";
import MyModal from "../../myComponents/MyModal";
import MyWarning from "../../myComponents/MyWarning";
import MyToast from "../../myComponents/MyToast";

const Dashboard = () => {
  const userState = {firstName: '', lastName: '', email: '', password: '', username: ''}

  const [allUsers, setUsers] = useState([]);
  const [details, setDetails] = useState([]);
  const [modalNewUserVisibility, setModalNewUserVisibility] = useState(false);
  const [modalEditUserVisibility, setModalVEditUserVisibility] = useState(false);
  const [warningVisibility, setWarningVisibility] = useState(false)

  const [userData, setUserData] = useState(userState);

  const [clearFilters, setClearFilters] = useState({});

  const [toasts, setToasts]  = useState([]);

  const [itemIndex,setItemIndex]= useState(null)

  const fields = [
    {key: "firstName", label: "Имя", _style: {width: '25%'}},
    {key: "lastName", label: "Фамилия", _style: {width: '25%'}},
    {key: "email", label: "Почта", _style: {width: '25%'}},
    {key: "username", label: "Никнейм", _style: {width: '20%'}},
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
    setModalNewUserVisibility(!modalNewUserVisibility)
    await fetchingUsers()
    showSuccessMessage('Запись добавлена')
  }

  const editUser = async (user) => {
    await UsersApi.editUser(user, user.id)
    setModalVEditUserVisibility(!modalEditUserVisibility)
    await fetchingUsers()
    showSuccessMessage('Запись изменена')
  }

  const deleteUser = async (user) => {
    await UsersApi.deleteUser(user.id)
    await fetchingUsers()
    setWarningVisibility(!warningVisibility)
    showSuccessMessage('Запись удалена')
    setDetails(details.splice(details.indexOf(itemIndex), 1))
    setDetails(details.map((elem) => {
      return elem > itemIndex ? elem - 1 : elem
    }))
  }

  const toggleModalNewUser = () => {
    setUserData(userState)
    setModalNewUserVisibility(!modalNewUserVisibility)
  }

  const toggleModalEditUser = (user) => {
    setUserData(user)
    setModalVEditUserVisibility(!modalEditUserVisibility)
  }

  const toggleWarning = (user, index) => {
    setUserData(user)
    setWarningVisibility(!warningVisibility)
    setItemIndex(index)
  }

  const showSuccessMessage = (toastText) => {
    setToasts([...toasts, {message: toastText}])
  }

  return (
    <div>
      <CButton
        color="primary"
        onClick={toggleModalNewUser}
        className="mb-2"
      >Добавить нового пользователя
      </CButton>
      <CButton
        color="secondary"
        onClick={() => setClearFilters({})}
        className="mb-2 float-right"

      >
        Очистить фильтры
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
          columnFilter
          columnFilterValue={clearFilters}
          onColumnFilterChange={setClearFilters}
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
                          color="primary"
                          onClick={() => toggleModalEditUser(item)}
                        >
                          Редактировать
                        </CButton>
                      </>
                      <CButton
                        size="sm"
                        color="danger"
                        className="ml-1"
                        onClick={() => toggleWarning(item, index)}
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
        visible={modalNewUserVisibility}
        setVisible={setModalNewUserVisibility}
        userData={userData}
        setUserData={setUserData}
        updateUsers={createNewUser}
        isPasswordRequired={true}
      />

      <MyModal
        visible={modalEditUserVisibility}
        setVisible={setModalVEditUserVisibility}
        userData={userData}
        setUserData={setUserData}
        updateUsers={editUser}
      />

      <MyWarning
        visible={warningVisibility}
        setVisible={setWarningVisibility}
        userData={userData}
        deleteUser={deleteUser}
      />

      <MyToast
        toasters={toasts}
      />

    </div>
  )
}

export default Dashboard

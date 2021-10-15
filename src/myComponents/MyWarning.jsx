import React from 'react';
import {
  CButton,
  CModal,
  CModalBody,
} from "@coreui/react";

const MyWarning = ({visible, setVisible, userData, deleteUser}) => {
  return (
    <div>
      <CModal
        show={visible}
        centered
      >

        <CModalBody>
          <h5>
           Вы уверенны, что хотите удалить запись {userData.firstName} {userData.lastName}?
          </h5>
          <div className="float-right mt-3 mb-1">
           <CButton
              color="danger"
              onClick={() => deleteUser(userData)}
              className="mr-3"
              >
              Удалить
            </CButton>
            <CButton
              color="secondary"
              onClick={() => setVisible(false)}
            >Отмена</CButton>
          </div>
        </CModalBody>
      </CModal>
    </div>
  );
};

export default MyWarning;

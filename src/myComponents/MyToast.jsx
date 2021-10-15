import React from 'react';
import {CToast, CToastBody, CToaster,CToastHeader} from "@coreui/react";

const MyToast = ({toasters}) => {
  return (
    <div>
        <CToaster
          position="bottom-right"
        >
          {
            toasters.map((toast, key)=>{
              return(
                <CToast
                  key={'toast' + key}
                  show={true}
                  autohide={3000}
                  fade={true}
                  style={{borderColor: '#2eb85c'}}
                >
                  <CToastHeader>
                    Успешно!
                  </CToastHeader>
                  <CToastBody>
                    {toast.message}
                  </CToastBody>
                </CToast>
              )
            })
          }
        </CToaster>
    </div>
  )
};

export default MyToast;

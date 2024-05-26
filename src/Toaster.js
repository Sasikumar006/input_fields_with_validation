import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const optionsObj = {
  position: 'top-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: 0.2
};

const toasterMsg = (
  msgType: String,
  title: String,
  iconClassName: String,
  message: String
) => {
  const iconClass = `fa fa-${iconClassName}`;
  toast[msgType](
    <div>
      <b><i className={iconClass}></i> {title}</b>
      <br />
      <span>{message}</span>
    </div>
  );
};

const warningToaster = (alertMessage: String) => {
  const returnValue = toast.warning(alertMessage, {
    optionsObj
  });
  return returnValue;
};

const successToaster = (alertMessage: String) => {
  const returnValue = toast(alertMessage, {
    optionsObj
  });
  return returnValue;
};

const errorToaster = (alertMessage: String) => {
  const returnValue = toast.error(alertMessage, {
    optionsObj
  });
  return returnValue;
};

export { warningToaster, successToaster, errorToaster, toasterMsg };
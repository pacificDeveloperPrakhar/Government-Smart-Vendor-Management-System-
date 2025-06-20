import React from 'react';
import { useSelector } from 'react-redux';

import { ToastContainer, toast,Bounce } from 'react-toastify';

export default function ToastManager() {
    const userMessage = useSelector((state) => state.user.message);
    const companyMessage = useSelector((state) => state.company.message);
    const userLoading = useSelector((state) => state.user.isLoading);
    const companyLoading = useSelector((state) => state.company.isLoading);
    const jobLoading = useSelector((state) => state.job.isLoading);
    const jobMessage = useSelector((state) => state.job.message);
    if (userMessage && !userLoading) {
      displayToast(userMessage);
    }

    if (companyMessage && !companyLoading) {
      displayToast(companyMessage);
    }
    if(jobMessage && !jobLoading){
    displayToast(jobMessage);
    }
  return (
<ToastContainer
position="bottom-left"
autoClose={2000}
hideProgressBar={false}
newestOnTop={true}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
transition={Bounce}
/>
  )
}
function displayToast({ mssg, type }) {
    switch (type) {
      case "error":
        toast.error(mssg);
        break;
      case "success":
        toast.success(mssg);
        break;
      case "info":
        toast.info(mssg);
        break;
      case "warning":
        toast.warning(mssg);
        break;
      default:
        toast(mssg);
    }
  }
  
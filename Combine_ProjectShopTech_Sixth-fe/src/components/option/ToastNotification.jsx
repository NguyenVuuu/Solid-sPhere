// src/components/ToastNotification.js
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { useTranslation } from 'react-i18next';
import "react-toastify/dist/ReactToastify.css";

const ToastNotification = () => {
  const { t } = useTranslation();

  // Hàm để hiển thị thông báo thành công
  const successNotify = (message) =>
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  // Hàm để hiển thị thông báo lỗi
  const errorNotify = (message) =>
    toast.error(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  // Hàm để hiển thị thông báo thông tin
  const infoNotify = (message) =>
    toast.info(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  // Hàm để hiển thị thông báo cảnh báo
  const warningNotify = (message) =>
    toast.warning(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  return (
    <>
      {/* ToastContainer để chứa các toast */}
      <ToastContainer />
    </>
  );
};

export default ToastNotification;

// Updated: 2025-10-12T16:06:34.260Z

// Updated: 2025-10-12T16:08:51.443Z

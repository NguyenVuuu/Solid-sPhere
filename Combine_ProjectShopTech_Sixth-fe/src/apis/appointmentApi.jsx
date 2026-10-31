import axiosInstance from "../custom/axios";

const BASE_URL = "/appointments";

/**
 * Lấy tất cả appointments
 */
export const fetchAppointments = () =>
  axiosInstance.get(BASE_URL).then(r => r.data);

/**
 * Tạo appointment mới
 */
export const createAppointment = (appointmentData) =>
  axiosInstance.post(BASE_URL, appointmentData).then(r => r.data);

/**
 * Cập nhật appointment
 */
export const updateAppointment = (id, appointmentData) =>
  axiosInstance.put(`${BASE_URL}/${id}`, appointmentData).then(r => r.data);

/**
 * Xóa appointment
 */
export const deleteAppointment = (id) =>
  axiosInstance.delete(`${BASE_URL}/${id}`).then(r => r.data);

/**
 * Cập nhật trạng thái appointment
 */
export const updateAppointmentStatus = (id, status) =>
  axiosInstance.put(`${BASE_URL}/${id}`, { status }).then(r => r.data);


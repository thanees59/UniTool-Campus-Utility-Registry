import api from "./client";

export const createBooking = (payload) => api.post("/bookings", payload);
export const fetchBookings = () => api.get("/bookings");
export const updateBookingStatus = (id, status) => api.put(`/bookings/${id}`, { status });

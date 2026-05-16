import api from "./client";

export const fetchEquipment = () => api.get("/equipment");
export const addEquipment = (payload) => api.post("/equipment", payload);
export const updateEquipment = (id, payload) => api.put(`/equipment/${id}`, payload);
export const deleteEquipment = (id) => api.delete(`/equipment/${id}`);

import { useCallback, useEffect, useMemo, useState } from "react";
import { addEquipment, deleteEquipment, updateEquipment } from "../api/equipment";
import { fetchBookings, updateBookingStatus } from "../api/bookings";
import { getErrorMessage } from "../api/client";
import BookingCard from "../components/BookingCard";
import EmptyState from "../components/EmptyState";
import Loader from "../components/Loader";
import Modal from "../components/Modal";
import Sidebar from "../components/Sidebar";
import { useToast } from "../context/ToastContext";
import useEquipment from "../hooks/useEquipment";
import { formatCurrency } from "../utils/formatters";

const emptyEquipment = {
  name: "",
  category: "",
  quantity: 1,
  rentPrice: 0,
  image: "",
  availability: true,
};

export default function AdminDashboard() {
  const [active, setActive] = useState("equipment");
  const [bookings, setBookings] = useState([]);
  const [bookingsLoading, setBookingsLoading] = useState(true);
  const [bookingError, setBookingError] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyEquipment);
  const [saving, setSaving] = useState(false);
  const { equipment, loading, error, reload } = useEquipment();
  const { showToast } = useToast();

  const loadBookings = useCallback(async () => {
    setBookingsLoading(true);
    try {
      const { data } = await fetchBookings();
      setBookings(data);
    } catch (err) {
      setBookingError(getErrorMessage(err, "Unable to load bookings"));
    } finally {
      setBookingsLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(loadBookings, 0);
    return () => window.clearTimeout(timer);
  }, [loadBookings]);

  const counts = useMemo(
    () => ({
      equipment: equipment.length,
      available: equipment.filter((item) => item.availability).length,
      pending: bookings.filter((item) => item.status === "Pending").length,
      approved: bookings.filter((item) => item.status === "Approved").length,
    }),
    [bookings, equipment]
  );

  const openCreate = () => {
    setEditing(null);
    setForm(emptyEquipment);
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    setForm({
      name: item.name,
      category: item.category,
      quantity: item.quantity,
      rentPrice: item.rentPrice,
      image: item.image || "",
      availability: item.availability,
    });
    setModalOpen(true);
  };

  const updateForm = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  const handleSave = async (event) => {
    event.preventDefault();
    setSaving(true);
    const payload = {
      ...form,
      quantity: Number(form.quantity),
      rentPrice: Number(form.rentPrice),
    };
    try {
      if (editing) {
        await updateEquipment(editing._id, payload);
        showToast("Equipment updated");
      } else {
        await addEquipment(payload);
        showToast("Equipment added");
      }
      setModalOpen(false);
      reload();
    } catch (err) {
      showToast(getErrorMessage(err, "Unable to save equipment"), "error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this equipment item?")) return;
    try {
      await deleteEquipment(id);
      showToast("Equipment deleted");
      reload();
    } catch (err) {
      showToast(getErrorMessage(err, "Unable to delete equipment"), "error");
    }
  };

  const setBookingStatus = async (id, status) => {
    try {
      await updateBookingStatus(id, status);
      showToast(`Booking ${status.toLowerCase()}`);
      loadBookings();
    } catch (err) {
      showToast(getErrorMessage(err, "Unable to update booking"), "error");
    }
  };

  return (
    <div className="dashboard-shell">
      <Sidebar
        active={active}
        onSelect={setActive}
        items={[
          { id: "equipment", label: "Inventory", icon: "I" },
          { id: "bookings", label: "Bookings", icon: "B" },
        ]}
      />
      <section className="dashboard-content">
        <div className="dashboard-header">
          <div>
            <p className="eyebrow">Admin dashboard</p>
            <h1>Manage UniTool operations</h1>
          </div>
          {active === "equipment" && <button className="button button-primary" type="button" onClick={openCreate}>Add equipment</button>}
        </div>

        <div className="stats-grid">
          <div className="stat-card"><strong>{counts.equipment}</strong><span>Total items</span></div>
          <div className="stat-card"><strong>{counts.available}</strong><span>Available</span></div>
          <div className="stat-card"><strong>{counts.pending}</strong><span>Pending bookings</span></div>
          <div className="stat-card"><strong>{counts.approved}</strong><span>Approved bookings</span></div>
        </div>

        {active === "equipment" && (
          <section className="admin-panel glass-card">
            {loading && <Loader label="Loading inventory" />}
            {error && <div className="alert error">{error}</div>}
            {!loading && !equipment.length && <EmptyState title="No inventory yet" message="Add equipment to begin taking bookings." />}
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {equipment.map((item) => (
                    <tr key={item._id}>
                      <td>{item.name}</td>
                      <td>{item.category}</td>
                      <td>{item.quantity}</td>
                      <td>{formatCurrency(item.rentPrice)}</td>
                      <td>{item.availability ? "Available" : "Unavailable"}</td>
                      <td className="table-actions">
                        <button className="button button-small" type="button" onClick={() => openEdit(item)}>Edit</button>
                        <button className="button button-small button-danger" type="button" onClick={() => handleDelete(item._id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {active === "bookings" && (
          <section className="booking-list">
            {bookingsLoading && <Loader label="Loading booking requests" />}
            {bookingError && <div className="alert error">{bookingError}</div>}
            {!bookingsLoading && !bookings.length && <EmptyState title="No booking requests" message="Requests will appear here after students submit them." />}
            {bookings.map((booking) => (
              <BookingCard
                key={booking._id}
                booking={booking}
                admin
                onApprove={(id) => setBookingStatus(id, "Approved")}
                onReject={(id) => setBookingStatus(id, "Rejected")}
              />
            ))}
          </section>
        )}
      </section>

      {modalOpen && (
        <Modal title={editing ? "Edit equipment" : "Add equipment"} onClose={() => setModalOpen(false)}>
          <form className="equipment-form" onSubmit={handleSave}>
            <label className="form-field"><span>Name</span><input value={form.name} onChange={(event) => updateForm("name", event.target.value)} required /></label>
            <label className="form-field"><span>Category</span><input value={form.category} onChange={(event) => updateForm("category", event.target.value)} required /></label>
            <div className="form-row">
              <label className="form-field"><span>Quantity</span><input type="number" min="0" value={form.quantity} onChange={(event) => updateForm("quantity", event.target.value)} required /></label>
              <label className="form-field"><span>Rent price</span><input type="number" min="0" value={form.rentPrice} onChange={(event) => updateForm("rentPrice", event.target.value)} required /></label>
            </div>
            <label className="form-field"><span>Image URL</span><input value={form.image} onChange={(event) => updateForm("image", event.target.value)} /></label>
            <label className="checkbox-field"><input type="checkbox" checked={form.availability} onChange={(event) => updateForm("availability", event.target.checked)} /> Available for booking</label>
            <button className="button button-primary full" type="submit" disabled={saving}>{saving ? "Saving..." : "Save equipment"}</button>
          </form>
        </Modal>
      )}
    </div>
  );
}

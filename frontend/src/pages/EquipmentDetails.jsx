import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { createBooking } from "../api/bookings";
import { getErrorMessage } from "../api/client";
import Loader from "../components/Loader";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import useEquipment from "../hooks/useEquipment";
import { daysBetween, formatCurrency, getImageForEquipment } from "../utils/formatters";
import { validateBookingDates } from "../utils/validators";

export default function EquipmentDetails() {
  const { id } = useParams();
  const { equipment, loading, error } = useEquipment();
  const item = equipment.find((entry) => entry._id === id);
  const [form, setForm] = useState({ startDate: "", endDate: "" });
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const { isAuthenticated, user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const total = useMemo(() => {
    if (!item || !form.startDate || !form.endDate) return item?.rentPrice || 0;
    return daysBetween(form.startDate, form.endDate) * item.rentPrice;
  }, [form.endDate, form.startDate, item]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isAuthenticated) {
      navigate("/login", { state: { from: { pathname: `/equipment/${id}` } } });
      return;
    }
    if (user?.role === "admin") {
      setFormError("Admins manage bookings from the admin dashboard.");
      return;
    }
    const validationError = validateBookingDates(form);
    if (validationError) {
      setFormError(validationError);
      return;
    }
    setSubmitting(true);
    setFormError("");
    try {
      await createBooking({ equipment: id, ...form });
      showToast("Booking request submitted");
      navigate("/dashboard");
    } catch (err) {
      setFormError(getErrorMessage(err, "Unable to submit booking"));
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loader label="Loading equipment details" />;
  if (error) return <div className="page"><div className="alert error">{error}</div></div>;
  if (!item) {
    return (
      <div className="page page-header">
        <h1>Equipment not found</h1>
        <Link className="button button-primary" to="/equipment">Back to equipment</Link>
      </div>
    );
  }

  const available = item.availability && item.quantity > 0;

  return (
    <div className="page details-layout">
      <section className="details-media">
        <img src={getImageForEquipment(item)} alt={item.name} />
      </section>
      <section className="details-panel glass-card">
        <p className="eyebrow">{item.category}</p>
        <h1>{item.name}</h1>
        <div className="details-facts">
          <span className={`badge ${available ? "badge-success" : "badge-muted"}`}>{available ? "Available" : "Unavailable"}</span>
          <span>{item.quantity} units</span>
          <span>{formatCurrency(item.rentPrice)} / day</span>
        </div>
        <form className="booking-form" onSubmit={handleSubmit}>
          <h2>Request booking</h2>
          {formError && <div className="alert error">{formError}</div>}
          <label className="form-field">
            <span>Start date</span>
            <input type="date" value={form.startDate} onChange={(event) => setForm((current) => ({ ...current, startDate: event.target.value }))} />
          </label>
          <label className="form-field">
            <span>End date</span>
            <input type="date" value={form.endDate} onChange={(event) => setForm((current) => ({ ...current, endDate: event.target.value }))} />
          </label>
          <div className="price-row">
            <span>Estimated total</span>
            <strong>{formatCurrency(total)}</strong>
          </div>
          <button className="button button-primary full" type="submit" disabled={!available || submitting}>
            {submitting ? "Submitting..." : available ? "Submit request" : "Unavailable"}
          </button>
        </form>
      </section>
    </div>
  );
}

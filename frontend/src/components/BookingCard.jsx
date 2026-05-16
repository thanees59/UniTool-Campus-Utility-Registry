import { formatDate } from "../utils/formatters";

export default function BookingCard({ booking, admin = false, onApprove, onReject }) {
  return (
    <article className="booking-card">
      <div>
        <p className="eyebrow">{booking.equipment?.category || "Equipment"}</p>
        <h3>{booking.equipment?.name || "Removed equipment"}</h3>
        {admin && <p>{booking.student?.name} · {booking.student?.email}</p>}
      </div>
      <div className="booking-dates">
        <span>{formatDate(booking.startDate)}</span>
        <span>{formatDate(booking.endDate)}</span>
      </div>
      <span className={`status status-${booking.status?.toLowerCase()}`}>{booking.status}</span>
      {admin && booking.status === "Pending" && (
        <div className="row-actions">
          <button className="button button-primary" type="button" onClick={() => onApprove(booking._id)}>Approve</button>
          <button className="button button-danger" type="button" onClick={() => onReject(booking._id)}>Reject</button>
        </div>
      )}
    </article>
  );
}

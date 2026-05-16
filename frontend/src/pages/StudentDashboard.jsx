import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { fetchBookings } from "../api/bookings";
import { getErrorMessage } from "../api/client";
import BookingCard from "../components/BookingCard";
import EmptyState from "../components/EmptyState";
import Loader from "../components/Loader";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";

export default function StudentDashboard() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [view, setView] = useState("bookings");
  const { user } = useAuth();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const { data } = await fetchBookings();
        setBookings(data);
      } catch (err) {
        setError(getErrorMessage(err, "Unable to load bookings"));
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const myBookings = useMemo(
    () => bookings.filter((booking) => booking.student?._id === user?._id || booking.student === user?._id),
    [bookings, user?._id]
  );

  const counts = {
    Pending: myBookings.filter((item) => item.status === "Pending").length,
    Approved: myBookings.filter((item) => item.status === "Approved").length,
    Rejected: myBookings.filter((item) => item.status === "Rejected").length,
  };

  return (
    <div className="dashboard-shell">
      <Sidebar
        active={view}
        onSelect={setView}
        items={[
          { id: "bookings", label: "My bookings", icon: "B" },
          { id: "status", label: "Status", icon: "S" },
        ]}
      />
      <section className="dashboard-content">
        <div className="dashboard-header">
          <div>
            <p className="eyebrow">Student dashboard</p>
            <h1>Hello, {user?.name}</h1>
          </div>
          <Link className="button button-primary" to="/equipment">New booking</Link>
        </div>

        <div className="stats-grid">
          <div className="stat-card"><strong>{myBookings.length}</strong><span>Total bookings</span></div>
          <div className="stat-card"><strong>{counts.Pending}</strong><span>Pending</span></div>
          <div className="stat-card"><strong>{counts.Approved}</strong><span>Approved</span></div>
          <div className="stat-card"><strong>{counts.Rejected}</strong><span>Rejected</span></div>
        </div>

        {loading && <Loader label="Loading booking history" />}
        {error && <div className="alert error">{error}</div>}
        {!loading && !myBookings.length && (
          <EmptyState
            title="No bookings yet"
            message="Browse the inventory and submit your first equipment request."
            action={<Link className="button button-primary" to="/equipment">Browse equipment</Link>}
          />
        )}
        <div className="booking-list">
          {myBookings.map((booking) => <BookingCard key={booking._id} booking={booking} />)}
        </div>
      </section>
    </div>
  );
}

import { Link } from "react-router-dom";
import EquipmentCard from "../components/EquipmentCard";
import Loader from "../components/Loader";
import useEquipment from "../hooks/useEquipment";

const categories = ["Media", "Audio", "Projection", "Engineering", "Power"];

export default function Home() {
  const { equipment, loading } = useEquipment();
  const featured = equipment.slice(0, 3);
  const availableCount = equipment.filter((item) => item.availability).length;

  return (
    <div className="page">
      <section className="hero-section">
        <div className="hero-copy">
          <p className="eyebrow">Campus Utility Register System</p>
          <h1>Reserve university equipment without the outside-rental stress.</h1>
          <p>
            UniTool helps students find cameras, tools, projectors, audio gear, and event essentials owned by the university, then submit booking requests for admin approval.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/equipment">Browse equipment</Link>
            <Link className="button button-ghost light" to="/register">Create account</Link>
          </div>
        </div>
        <div className="hero-panel glass-card">
          <div className="hero-device">
            <span>LIVE INVENTORY</span>
            <strong>{equipment.length || "..."}</strong>
            <p>equipment records synced with the backend API</p>
          </div>
          <div className="hero-stack">
            <div>Booking approval</div>
            <div>Availability badges</div>
            <div>Student history</div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="eyebrow">Featured</p>
          <h2>Ready for the next campus program</h2>
        </div>
        {loading ? (
          <Loader label="Loading featured equipment" />
        ) : (
          <div className="card-grid">
            {featured.map((item) => <EquipmentCard key={item._id} item={item} />)}
          </div>
        )}
      </section>

      <section className="section split-section">
        <div>
          <p className="eyebrow">Categories</p>
          <h2>Built around real university work</h2>
        </div>
        <div className="category-grid">
          {categories.map((category) => <span key={category}>{category}</span>)}
        </div>
      </section>

      <section className="stats-band">
        <div><strong>{equipment.length}</strong><span>Total items</span></div>
        <div><strong>{availableCount}</strong><span>Available now</span></div>
        <div><strong>7d</strong><span>JWT session</span></div>
        <div><strong>3</strong><span>Booking states</span></div>
      </section>

      <section className="cta-section">
        <h2>Plan your next event with campus-owned equipment.</h2>
        <Link className="button button-primary" to="/equipment">Start a booking</Link>
      </section>
    </div>
  );
}

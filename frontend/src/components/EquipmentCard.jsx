import { Link } from "react-router-dom";
import { formatCurrency, getImageForEquipment } from "../utils/formatters";

export default function EquipmentCard({ item }) {
  const available = item.availability && item.quantity > 0;

  return (
    <article className="equipment-card">
      <Link to={`/equipment/${item._id}`} className="equipment-image">
        <img src={getImageForEquipment(item)} alt={item.name} />
        <span className={`badge ${available ? "badge-success" : "badge-muted"}`}>{available ? "Available" : "Unavailable"}</span>
      </Link>
      <div className="equipment-body">
        <div>
          <p className="eyebrow">{item.category}</p>
          <h3>{item.name}</h3>
        </div>
        <div className="equipment-meta">
          <span>{formatCurrency(item.rentPrice)} / day</span>
          <span>{item.quantity} units</span>
        </div>
        <Link className="button button-card" to={`/equipment/${item._id}`}>View details</Link>
      </div>
    </article>
  );
}

import { useMemo, useState } from "react";
import EquipmentCard from "../components/EquipmentCard";
import EmptyState from "../components/EmptyState";
import Loader from "../components/Loader";
import SearchBar from "../components/SearchBar";
import useEquipment from "../hooks/useEquipment";

export default function Equipment() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const { equipment, loading, error } = useEquipment();

  const categories = useMemo(() => ["All", ...new Set(equipment.map((item) => item.category).filter(Boolean))], [equipment]);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return equipment.filter((item) => {
      const matchesCategory = category === "All" || item.category === category;
      const matchesQuery = !normalized || [item.name, item.category].join(" ").toLowerCase().includes(normalized);
      return matchesCategory && matchesQuery;
    });
  }, [category, equipment, query]);

  return (
    <div className="page">
      <section className="page-header">
        <p className="eyebrow">Inventory</p>
        <h1>Browse campus equipment</h1>
        <p>Search items, filter categories, and open details to request a booking.</p>
      </section>

      <section className="toolbar glass-card">
        <SearchBar value={query} onChange={setQuery} placeholder="Search cameras, projectors, tools..." />
        <select value={category} onChange={(event) => setCategory(event.target.value)}>
          {categories.map((item) => <option key={item} value={item}>{item}</option>)}
        </select>
      </section>

      {loading && <Loader label="Loading equipment" />}
      {error && <div className="alert error">{error}</div>}
      {!loading && !filtered.length && <EmptyState title="No equipment found" message="Try a different search or category filter." />}
      <div className="card-grid">
        {filtered.map((item) => <EquipmentCard key={item._id} item={item} />)}
      </div>
    </div>
  );
}

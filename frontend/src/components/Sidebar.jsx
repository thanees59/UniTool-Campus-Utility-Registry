export default function Sidebar({ items, active, onSelect }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-title">Workspace</div>
      {items.map((item) => (
        <button key={item.id} className={active === item.id ? "active" : ""} type="button" onClick={() => onSelect(item.id)}>
          <span>{item.icon}</span>
          {item.label}
        </button>
      ))}
    </aside>
  );
}

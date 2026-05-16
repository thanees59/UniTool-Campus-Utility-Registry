export default function SearchBar({ value, onChange, placeholder = "Search" }) {
  return (
    <div className="search-bar">
      <span aria-hidden="true">⌕</span>
      <input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} />
    </div>
  );
}

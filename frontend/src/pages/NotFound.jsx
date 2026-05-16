import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="not-found">
      <p className="eyebrow">404</p>
      <h1>Page not found</h1>
      <p>The page you opened is not part of the UniTool workspace.</p>
      <Link className="button button-primary" to="/">Return home</Link>
    </section>
  );
}

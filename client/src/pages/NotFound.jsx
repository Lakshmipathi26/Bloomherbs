import { Link } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';
import SEO from '../../components/common/SEO';

export default function NotFound() {
  return (
    <>
      <SEO title="404" description="Page not found." />
      <div className="container notfound-page">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you're looking for doesn't exist or has been moved.</p>
        <Link to="/" className="btn btn--primary"><FiHome /> Go Home</Link>
      </div>
    </>
  );
}

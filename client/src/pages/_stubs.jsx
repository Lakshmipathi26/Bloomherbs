// Stub pages — will be replaced with full implementations in subsequent phases

const stub = (name) => () => (
  <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
    <h1 style={{ color: 'var(--primary)', fontFamily: 'var(--font-display)' }}>{name}</h1>
    <p style={{ color: 'var(--text-muted)', marginTop: '0.5rem' }}>Coming soon — Phase implementation pending.</p>
  </div>
);

export const Home = stub('Home');
export const Shop = stub('Shop');
export const ProductDetail = stub('Product Detail');
export const Categories = stub('Categories');
export const About = stub('About');
export const Contact = stub('Contact');
export const FAQ = stub('FAQ');
export const PrivacyPolicy = stub('Privacy Policy');
export const TermsConditions = stub('Terms & Conditions');
export const NotFound = stub('404 – Page Not Found');

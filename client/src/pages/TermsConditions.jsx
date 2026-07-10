import SEO from '../../components/common/SEO';

export default function TermsConditions() {
  return (
    <>
      <SEO title="Terms & Conditions" description="BloomHerbs terms and conditions." />
      <div className="container policy-page">
        <h1>Terms & Conditions</h1>
        <p><strong>Effective Date:</strong> June 1, 2024</p>
        <section><h2>Acceptance of Terms</h2><p>By using BloomHerbs, you agree to these terms and conditions.</p></section>
        <section><h2>Orders and Payments</h2><p>All orders are subject to availability. Prices are subject to change without notice. Payment must be received before order processing.</p></section>
        <section><h2>Shipping</h2><p>We aim to ship within 2-3 business days. Delivery times vary by location.</p></section>
        <section><h2>Returns</h2><p>Returns accepted within 7 days of delivery for damaged or incorrect items.</p></section>
        <section><h2>Limitation of Liability</h2><p>BloomHerbs is not liable for indirect or incidental damages arising from product use.</p></section>
      </div>
    </>
  );
}

import SEO from '../../components/common/SEO';

export default function PrivacyPolicy() {
  return (
    <>
      <SEO title="Privacy Policy" description="BloomHerbs privacy policy." />
      <div className="container policy-page">
        <h1>Privacy Policy</h1>
        <p><strong>Effective Date:</strong> June 1, 2024</p>
        <section><h2>Information We Collect</h2><p>We collect your name, email, phone number, shipping address, and payment details to process orders and improve your experience.</p></section>
        <section><h2>How We Use Your Information</h2><p>We use your data to process orders, send updates, and improve our services. We never sell your personal information.</p></section>
        <section><h2>Data Security</h2><p>We implement industry-standard security measures to protect your data.</p></section>
        <section><h2>Cookies</h2><p>We use cookies to improve your browsing experience. You can disable cookies in your browser settings.</p></section>
        <section><h2>Contact</h2><p>For privacy concerns, contact privacy@bloomherbs.com.</p></section>
      </div>
    </>
  );
}

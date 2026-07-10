import SEO from '../../components/common/SEO';

export default function About() {
  return (
    <>
      <SEO title="About Us" description="Learn about BloomHerbs story and mission." />
      <div className="container about-page">
        <h1>About BloomHerbs</h1>
        <div className="about-content">
          <p>BloomHerbs was founded with a simple mission: to bring the purest natural and organic products from the heart of nature directly to your doorstep. We believe in sustainable farming, ethical sourcing, and delivering products without any artificial additives or preservatives.</p>
          <p>Our journey began in 2020 when our founders, inspired by traditional herbal knowledge, set out to create a marketplace that connects conscious consumers with high-quality natural products. Today, we work directly with farmers and cooperatives across India to source the finest teas, coffees, spices, and honeys.</p>
          <div className="about-values">
            <div><h3>🌱 Sustainability</h3><p>We prioritize eco-friendly practices in every step of our supply chain.</p></div>
            <div><h3>🤝 Fair Trade</h3><p>We ensure our partner farmers receive fair compensation for their hard work.</p></div>
            <div><h3>🔬 Quality</h3><p>Every product is tested for purity and potency before reaching you.</p></div>
          </div>
        </div>
      </div>
    </>
  );
}

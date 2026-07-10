import SEO from '../../components/common/SEO';

export default function FAQ() {
  const items = [
    { q: 'How do I place an order?', a: 'Browse products, add them to your cart, and proceed to checkout. Choose your preferred payment method and complete the order.' },
    { q: 'What payment methods are accepted?', a: 'We accept Razorpay (cards, UPI, wallets) and Cash on Delivery.' },
    { q: 'Do you ship internationally?', a: 'Currently we ship within India. International shipping will be available soon.' },
    { q: 'How can I track my order?', a: 'Go to My Orders to see the current status and tracking number once shipped.' },
    { q: 'What is your return policy?', a: 'We accept returns within 7 days of delivery if the product is damaged or incorrect.' },
  ];

  return (
    <>
      <SEO title="FAQ" description="Frequently asked questions about BloomHerbs." />
      <div className="container faq-page">
        <h1>Frequently Asked Questions</h1>
        <div className="faq-list">
          {items.map((item, i) => (
            <details key={i} className="faq-item">
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </>
  );
}

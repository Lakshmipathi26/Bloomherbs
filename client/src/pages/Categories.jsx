import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import ProductCard from '../../components/products/ProductCard';
import SEO from '../../components/common/SEO';

export default function Categories() {
  const categories = [
    { name: 'Herbal Tea', icon: '🍵', desc: 'Calming blends for every mood' },
    { name: 'Coffee Beans', icon: '☕', desc: 'Premium single-origin beans' },
    { name: 'Coffee Powder', icon: '🥄', desc: 'Freshly ground for perfection' },
    { name: 'Spices', icon: '🌶️', desc: 'Aromatic spices from around the world' },
    { name: 'Honey', icon: '🍯', desc: 'Pure, raw, and unprocessed' },
    { name: 'Pepper', icon: '🧂', desc: ' bold flavor for your dishes' },
  ];

  return (
    <>
      <SEO title="Categories" description="Explore BloomHerbs natural product categories: teas, coffee, spices, honey and more." />
      <div className="container categories-page">
        <h1>Shop by Category</h1>
        <p className="categories-page__subtitle">Discover our curated collections of natural & organic products</p>
        <div className="categories-page__grid">
          {categories.map((cat) => (
            <Link key={cat.name} to={`/shop?category=${cat.name.toLowerCase().replace(/\s+/g, '-')}`} className="category-card-large">
              <span className="category-card-large__icon">{cat.icon}</span>
              <h3>{cat.name}</h3>
              <p>{cat.desc}</p>
              <span className="category-card-large__link">Shop <FiArrowRight /></span>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

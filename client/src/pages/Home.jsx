import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { fetchFeaturedProducts } from '../../redux/slices/productSlice';
import ProductCard from '../../components/products/ProductCard';
import SEO from '../../components/common/SEO';

export default function Home() {
  const dispatch = useDispatch();
  const { featured, loading } = useSelector((s) => s.products);

  useEffect(() => {
    dispatch(fetchFeaturedProducts());
  }, [dispatch]);

  return (
    <>
      <SEO title="Home" description="Discover natural & organic products at BloomHerbs. Premium herbal teas, coffee, spices and honey." />

      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__content">
            <h1>Nature's Best,<br />Delivered Fresh</h1>
            <p>Handpicked herbal teas, premium coffee, exotic spices and pure honey — all sourced ethically and delivered to your door.</p>
            <div className="hero__actions">
              <Link to="/shop" className="btn btn--primary">Shop Now <FiArrowRight size={18} /></Link>
              <Link to="/categories" className="btn btn--outline">Explore Categories</Link>
            </div>
          </div>
          <div className="hero__visual">🌿☕️🍯</div>
        </div>
      </section>

      <section className="section container">
        <div className="section__header">
          <h2>Featured Products</h2>
          <p>Our most loved selections this season</p>
        </div>
        {loading ? (
          <div className="grid grid--4">Loading...</div>
        ) : featured?.length ? (
          <div className="grid grid--4">
            {featured.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        ) : (
          <p className="text-center" style={{ padding: '2rem' }}>No featured products yet.</p>
        )}
        <div className="text-center" style={{ marginTop: '2rem' }}>
          <Link to="/shop" className="btn btn--primary">View All Products</Link>
        </div>
      </section>

      <section className="section container">
        <div className="section__header">
          <h2>Why Choose BloomHerbs</h2>
        </div>
        <div className="features">
          <div className="feature">
            <span className="feature__icon">🌱</span>
            <h3>100% Natural</h3>
            <p>Sourced directly from organic farms without artificial additives.</p>
          </div>
          <div className="feature">
            <span className="feature__icon">🚚</span>
            <h3>Fast Delivery</h3>
            <p>Swift and reliable delivery across the country with real-time tracking.</p>
          </div>
          <div className="feature">
            <span className="feature__icon">💚</span>
            <h3>Eco-Friendly</h3>
            <p>Sustainable packaging and carbon-neutral shipping practices.</p>
          </div>
          <div className="feature">
            <span className="feature__icon">💯</span>
            <h3>Quality Guaranteed</h3>
            <p>Every product is lab-tested for purity and potency before shipping.</p>
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="section__header">
          <h2>Shop by Category</h2>
          <p>Explore our curated collections</p>
        </div>
        <div className="categories-preview">
          {[
            { name: 'Herbal Tea', icon: '🍵', to: '/shop?category=herbal-tea' },
            { name: 'Coffee Beans', icon: '☕', to: '/shop?category=coffee-beans' },
            { name: 'Coffee Powder', icon: '🥄', to: '/shop?category=coffee-powder' },
            { name: 'Spices', icon: '🌶️', to: '/shop?category=spices' },
            { name: 'Honey', icon: '🍯', to: '/shop?category=honey' },
            { name: 'Pepper', icon: '🧂', to: '/shop?category=pepper' },
          ].map((cat) => (
            <Link key={cat.name} to={cat.to} className="category-card">
              <span className="category-card__icon">{cat.icon}</span>
              <span className="category-card__name">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section container">
        <div className="newsletter">
          <h2>Join Our Newsletter</h2>
          <p>Get exclusive deals, new release alerts, and wellness tips straight to your inbox.</p>
          <form className="newsletter__form" onSubmit={(e) => { e.preventDefault(); toast.success('Subscribed!'); }}>
            <input type="email" placeholder="Enter your email" required />
            <button type="submit" className="btn btn--primary">Subscribe</button>
          </form>
        </div>
      </section>
    </>
  );
}

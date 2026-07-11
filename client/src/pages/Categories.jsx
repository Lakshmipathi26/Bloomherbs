import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import { fetchCategories } from '../../redux/slices/categorySlice';
import SEO from '../../components/common/SEO';

export default function Categories() {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector((s) => s.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <>
      <SEO title="Categories" description="Explore BloomHerbs natural product categories: teas, coffee, spices, honey and more." />
      <div className="container categories-page">
        <h1>Shop by Category</h1>
        <p className="categories-page__subtitle">Discover our curated collections of natural & organic products</p>
        {loading ? (
          <p className="loading-text">Loading categories...</p>
        ) : categories.length === 0 ? (
          <p className="empty-text">No categories available yet.</p>
        ) : (
          <div className="categories-page__grid">
            {categories.map((cat) => (
              <Link key={cat._id} to={`/shop?category=${cat.slug}`} className="category-card-large">
                <span className="category-card-large__icon">{cat.image?.url ? <img src={cat.image.url} alt={cat.name} /> : '📦'}</span>
                <h3>{cat.name}</h3>
                <p>{cat.description || 'Explore products'}</p>
                <span className="category-card-large__link">Shop <FiArrowRight /></span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

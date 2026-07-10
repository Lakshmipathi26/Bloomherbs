import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FiSliders, FiX } from 'react-icons/fi';
import { fetchProducts } from '../../redux/slices/productSlice';
import ProductCard from '../../components/products/ProductCard';
import ProductGrid from '../../components/products/ProductGrid';
import SEO from '../../components/common/SEO';

export default function Shop() {
  const dispatch = useDispatch();
  const { products, total, loading } = useSelector((s) => s.products);
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts({ ...filters, page }));
  }, [dispatch, filters, page]);

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  };

  const clearFilters = () => {
    setFilters({});
    setPage(1);
  };

  const pages = total ? Math.ceil(total / 12) : 0;

  return (
    <>
      <SEO title="Shop" description="Browse all BloomHerbs natural & organic products: teas, coffee, spices, honey and more." />
      <div className="container shop">
        <div className="shop__header">
          <h1>Shop All Products</h1>
          <button className="shop__filter-toggle" onClick={() => setShowFilters(!showFilters)}>
            <FiSliders size={18} /> Filters
          </button>
        </div>
        <div className="shop__body">
          <aside className={`shop__sidebar ${showFilters ? 'shop__sidebar--open' : ''}`}>
            <div className="shop__filters">
              <div className="shop__filter-group">
                <label>Category</label>
                <select onChange={(e) => updateFilter('category', e.target.value || undefined)}>
                  <option value="">All</option>
                </select>
              </div>
              <div className="shop__filter-group">
                <label>Sort By</label>
                <select onChange={(e) => updateFilter('sort', e.target.value)}>
                  <option value="">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
              <div className="shop__filter-group">
                <label>Price Range ($)</label>
                <div className="shop__price-inputs">
                  <input type="number" placeholder="Min" onChange={(e) => updateFilter('minPrice', e.target.value || undefined)} />
                  <input type="number" placeholder="Max" onChange={(e) => updateFilter('maxPrice', e.target.value || undefined)} />
                </div>
              </div>
              {(filters.category || filters.sort || filters.minPrice || filters.maxPrice) && (
                <button className="shop__clear" onClick={clearFilters}><FiX size={14} /> Clear filters</button>
              )}
            </div>
          </aside>
          <main>
            <p className="shop__count">{total} product{total !== 1 ? 's' : ''} found</p>
            {loading ? <div className="shop__loading">Loading...</div> : (
              <>
                <ProductGrid products={products} loading={loading} />
                {pages > 1 && (
                  <div className="pagination">
                    <button disabled={page === 1} onClick={() => setPage(page - 1)}>Prev</button>
                    <span>{page} / {pages}</span>
                    <button disabled={page === pages} onClick={() => setPage(page + 1)}>Next</button>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </>
  );
}

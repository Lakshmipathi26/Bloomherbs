import styles from './ProductGrid.module.css';

const ProductGrid = ({ products, loading }) => {
  if (loading) {
    return (
      <div className={styles.grid}>
        {Array(8).fill(0).map((_, i) => (
          <div key={i} className={styles.skeleton}>
            <div className={styles.skeletonImage} />
            <div className={styles.skeletonBody}>
              <div className={styles.skeletonLine} style={{ width: '60%' }} />
              <div className={styles.skeletonLine} style={{ width: '90%' }} />
              <div className={styles.skeletonLine} style={{ width: '40%' }} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!products?.length) {
    return <p className={styles.empty}>No products found.</p>;
  }

  return (
    <div className={styles.grid}>
      {products.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

import ProductCard from '../products/ProductCard';

export default ProductGrid;

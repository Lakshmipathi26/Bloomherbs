import SEO from '../../components/common/SEO';

export default function AdminReviews() {
  const reviews = [
    { id: 1, product: 'Herbal Tea Collection', user: 'Alice', rating: 5, comment: 'Amazing quality!' },
    { id: 2, product: 'Arabica Coffee Beans', user: 'Bob', rating: 4, comment: 'Great taste, fast shipping.' },
  ];

  return (
    <>
      <SEO title="Reviews" description="Manage BloomHerbs product reviews." />
      <div className="admin-page">
        <h1>Reviews</h1>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead><tr><th>Product</th><th>User</th><th>Rating</th><th>Comment</th></tr></thead>
            <tbody>
              {reviews.map((r) => (
                <tr key={r.id}><td>{r.product}</td><td>{r.user}</td><td>{'★'.repeat(r.rating)}</td><td>{r.comment}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

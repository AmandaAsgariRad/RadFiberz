using RadFiberz.Models;

namespace RadFiberz.Repositories
{
    public interface ICartRepository
    {
        void Add(Cart cart);
        void DeleteByProductId(int productId);
        void DeleteByUserId(int userId);
        public Cart GetById(int id);
        public Cart GetByUserId(int userId);
        void Update(Cart cart);
    }
}
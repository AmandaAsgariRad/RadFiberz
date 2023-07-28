using RadFiberz.Models;

namespace RadFiberz.Repositories
{
    public interface ICartRepository
    {
        void Add(Cart cart);
        void Delete(int productId);
        public Cart GetById(int id);
        public Cart GetByUserId(int userId);
        void Update(Cart cart);
    }
}
using RadFiberz.Models;
using System.Collections.Generic;

namespace RadFiberz.Repositories
{
    public interface ICartRepository
    {
        void Add(Cart cart);
        void DeleteByProductColorId(int productColorId);
        void DeleteByUserId(int userId);
        public Cart GetById(int id);
        public List<Cart> GetByUserId(int userId);
        void Update(int id, ProductColor productColor);
    }
}
using RadFiberz.Models;
using System.Collections.Generic;

namespace RadFiberz.Repositories
{
    public interface IProductRepository
    {
        public List<Product> GetAll();
        Product GetById(int id);
    }
}
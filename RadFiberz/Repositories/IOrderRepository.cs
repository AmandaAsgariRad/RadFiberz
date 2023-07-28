using RadFiberz.Models;
using System.Collections.Generic;

namespace RadFiberz.Repositories
{
    public interface IOrderRepository
    {
        public List<Order> GetByUserId(int userId);
    }
}
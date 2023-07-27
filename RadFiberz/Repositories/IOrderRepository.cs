using RadFiberz.Models;

namespace RadFiberz.Repositories
{
    public interface IOrderRepository
    {
        public Order GetByUserId(int userId);
    }
}
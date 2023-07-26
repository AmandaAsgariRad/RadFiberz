using RadFiberz.Models;
using System.Collections.Generic;

namespace RadFiberz.Repositories
{
    public interface IFavoriteRepository
    {
        void Add(Favorite favorite);
        void Delete(int id);
        public List<Favorite> GetAllByUserId(int userId);
        
    }
}
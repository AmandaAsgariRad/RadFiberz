using RadFiberz.Models;
using System.Collections.Generic;

namespace RadFiberz.Repositories
{
    public interface IColorRepository
    {
        void AddProductColor(ProductColor productColor);
        void DeletePcById(int id);
        public List<Color> GetAll();
        List<ProductColor> GetAllProductColors(int userId);
        Color GetById(int id);
        ProductColor GetPcByUserId(int userId);
    }
}
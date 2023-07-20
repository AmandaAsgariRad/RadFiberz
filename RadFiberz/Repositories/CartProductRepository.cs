using Microsoft.Extensions.Configuration;
using RadFiberz.Models;
using System;

namespace RadFiberz.Repositories
{
    public class CartProductRepository: BaseRepository
    {
        public CartProductRepository(IConfiguration configuration) : base(configuration) { }
    }
}

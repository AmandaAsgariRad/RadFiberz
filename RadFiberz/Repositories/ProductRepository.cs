using RadFiberz.Models;
using System;
using Microsoft.Extensions.Configuration;

namespace RadFiberz.Repositories
{
    public class ProductRepository: BaseRepository
    {
        public ProductRepository(IConfiguration configuration) : base(configuration) { }
    }
}

using RadFiberz.Models;
using System;
using Microsoft.Extensions.Configuration;

namespace RadFiberz.Repositories
{
    public class CartRepository: BaseRepository
    {
        public CartRepository(IConfiguration configuration) : base(configuration) { }
    }
}

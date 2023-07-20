using Microsoft.Extensions.Configuration;
using RadFiberz.Models;
using System;

namespace RadFiberz.Repositories
{
    public class OrderRepository: BaseRepository
    {
        public OrderRepository(IConfiguration configuration) : base(configuration) { }
    }
}

using Microsoft.Extensions.Configuration;
using RadFiberz.Models;
using System;

namespace RadFiberz.Repositories
{
    public class PurchaseRepository: BaseRepository
    {
        public PurchaseRepository(IConfiguration configuration) : base(configuration) { }
        
    }
}

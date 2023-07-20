using Microsoft.Extensions.Configuration;
using RadFiberz.Models;
using System;

namespace RadFiberz.Repositories
{
    public class FavoriteRepository: BaseRepository
    {
        public FavoriteRepository(IConfiguration configuration) : base(configuration) { }
    }
}

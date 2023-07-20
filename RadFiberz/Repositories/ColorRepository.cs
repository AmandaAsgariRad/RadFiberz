using Microsoft.Extensions.Configuration;
using RadFiberz.Models;
using System;

namespace RadFiberz.Repositories
{
    public class ColorRepository: BaseRepository
    {
        public ColorRepository(IConfiguration configuration) : base(configuration) { }
    }
}

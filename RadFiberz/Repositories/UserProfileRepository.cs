using Microsoft.Extensions.Configuration;
using RadFiberz.Models;

namespace RadFiberz.Repositories
{
    public class UserProfileRepository : BaseRepository
    {
        public UserProfileRepository(IConfiguration configuration) : base(configuration) { }

        
    }
}

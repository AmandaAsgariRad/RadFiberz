using RadFiberz.Models;

namespace RadFiberz.Repositories
{
    public interface IUserProfileRepository
    {
        public UserProfile GetByFirebaseUserId(string firebaseUserId);
        public UserProfile GetById(int id);
        void Add(UserProfile userProfile);
        void Update(UserProfile userProfile);
        
    }
}
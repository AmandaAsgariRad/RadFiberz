using Microsoft.Extensions.Configuration;
using RadFiberz.Models;
using RadFiberz.Utils;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Security.Cryptography.X509Certificates;

namespace RadFiberz.Repositories
{
    public class UserProfileRepository : BaseRepository, IUserProfileRepository
    {
        public UserProfileRepository(IConfiguration configuration) : base(configuration) { }

        public UserProfile GetByFirebaseUserId(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT *
                        FROM UserProfile
                        WHERE firebaseUserId = @firebaseUserId";

                    DbUtils.AddParameter(cmd, "@firebaseUserId", firebaseUserId);
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {
                        UserProfile profile = null;
                        if (reader.Read())
                        {
                            profile = new UserProfile()
                            {

                                Id = DbUtils.GetInt(reader, "Id"),
                                FirstName = DbUtils.GetString(reader, "FirstName"),
                                LastName = DbUtils.GetString(reader, "LastName"),
                                Email = DbUtils.GetString(reader, "Email"),
                                IsAdmin = DbUtils.GetBool(reader, "IsAdmin"),
                                StreetAddress = DbUtils.GetString(reader, "StreetAddress"),
                                City = DbUtils.GetString(reader, "City"),
                                State = DbUtils.GetString(reader, "State"),
                                ZipCode = DbUtils.GetInt(reader, "PhoneNumber"),
                                FirebaseUserId = firebaseUserId,
                                IsActive = DbUtils.GetBool(reader, "IsActive")

                            };
                            

                        }
                        return profile;
                    }
                }
            }
        }

        public UserProfile GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT *
                        FROM UserProfile
                        WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    UserProfile userProfile = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        userProfile = new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            IsAdmin = DbUtils.GetBool(reader, "IsAdmin"),
                            Email = DbUtils.GetString(reader, "Email"),
                            StreetAddress = DbUtils.GetString(reader, "StreetAddress"),
                            City = DbUtils.GetString(reader, "City"),
                            State = DbUtils.GetString(reader, "State"),
                            ZipCode = DbUtils.GetInt(reader, "ZipCode"),
                            PhoneNumber = DbUtils.GetString(reader, "PhoneNumber"),
                            DateCreated = DbUtils.GetDateTime(reader, "DateCreated"),
                            FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                            IsActive = DbUtils.GetBool(reader, "IsActive")
                        };
                    }
                        return userProfile;
                    
                }
            }
        }

        public void Add(UserProfile userProfile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO UserProfile (FirstName, LastName, IsAdmin, Email, StreetAddress, 
                                    City, State, ZipCode, PhoneNumber, DateCreated, FirebaseUserId, IsActive)
                        OUTPUT INSERTED.ID
                        VALUES (@FirstName, @LastName, @IsAdmin, @Email, @StreetAddress, @City, @State,
                                @ZipCode, @PhoneNumber, @@DateCreated, @FirebaseUserId, @IsActive";

                    DbUtils.AddParameter(cmd, "@FirstName", userProfile.FirstName);
                    DbUtils.AddParameter(cmd, "@LastName", userProfile.LastName);
                    DbUtils.AddParameter(cmd, "@IsAdmin", userProfile.IsAdmin);
                    DbUtils.AddParameter(cmd, "@Email", userProfile.Email);
                    DbUtils.AddParameter(cmd, "@StreetAddress", userProfile.StreetAddress);
                    DbUtils.AddParameter(cmd, "@City", userProfile.City);
                    DbUtils.AddParameter(cmd, "@State", userProfile.State);
                    DbUtils.AddParameter(cmd, "@ZipCode", userProfile.ZipCode);
                    DbUtils.AddParameter(cmd, "@PhoneNumber", userProfile.PhoneNumber);
                    DbUtils.AddParameter(cmd, "@DateCreated", userProfile.DateCreated);
                    DbUtils.AddParameter(cmd, "@FirebaseUserId", userProfile.FirebaseUserId);
                    DbUtils.AddParameter(cmd, "@IsActive", userProfile.IsActive);

                    userProfile.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(UserProfile userProfile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"UPDATE UserProfile
                                        SET FirstName = @firstName,
                                            LastName = @lastName,
                                            IsAdmin = @isAdmin,
                                            Email = @email,
                                            StreetAddress = @streetAddress,
                                            City = @city,
                                            State = @state,
                                            ZipCode = @zipCode,
                                            PhoneNumber = @phoneNumber,
                                            DateCreated = @dateCreated,
                                            FirebaseUserId = @firebaseUserId,
                                            IsActive = @isActive
                                        WHERE Id = @id";
                   
                    DbUtils.AddParameter(cmd, "@firstName", userProfile.FirstName);
                    DbUtils.AddParameter(cmd, "@lastName", userProfile.LastName);
                    DbUtils.AddParameter(cmd, "@isAdmin", userProfile.IsAdmin);
                    DbUtils.AddParameter(cmd, "@email", userProfile.Email);
                    DbUtils.AddParameter(cmd, "@streetAddress", userProfile.StreetAddress);
                    DbUtils.AddParameter(cmd, "@city", userProfile.City);
                    DbUtils.AddParameter(cmd, "@state", userProfile.State);
                    DbUtils.AddParameter(cmd, "@zipCode", userProfile.ZipCode);
                    DbUtils.AddParameter(cmd, "@phoneNumber", userProfile.PhoneNumber);
                    DbUtils.AddParameter(cmd, "@dateCreated", userProfile.DateCreated);
                    DbUtils.AddParameter(cmd, "@firebaseUserId", userProfile.FirebaseUserId);
                    DbUtils.AddParameter(cmd, "@isActive", userProfile.IsActive);

                    if (userProfile.IsActive == true)
                    {
                        DbUtils.AddParameter(cmd, "@isActive", 1);
                    }
                    else
                    {
                        DbUtils.AddParameter(cmd, "@isActive", 0);
                    }

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}

//public List<Product> GetAll()
//{
//    using (var conn = Connection)
//    {
//        conn.Open();
//        using (var cmd = conn.CreateCommand())
//        {
//            cmd.CommandText = @"
//                        SELECT p.Id, p.IsMacrame, p.IsJewelry, p.Name, p.ProductColorId, p.InventoryQuantity, p.Price, p.Description, p.ProductImage
//                               pc.Id AS ProductColorId, pc.ColorId, pc.ProductId
//                               c.Id AS ColorId, c.Name AS ColorName
//                        FROM Product P
//                        JOIN ProductColor pc ON p.Id = pc.ProductId
//                        JOIN Color c ON c.Id = pc.ColorId";

//            using (var reader = cmd.ExecuteReader())
//            {
//                var products = new List<Product>();
//                while (reader.Read())
//                {
//                    products.Add(new Product()
//                    {
//                        Id = DbUtils.GetInt(reader, "Id"),
//                        IsMacrame = DbUtils.GetBool(reader, "IsMacrame"),
//                        IsJewelry = DbUtils.GetBool(reader, "IsJewelry"),
//                        Name = DbUtils.GetString(reader, "Name"),
//                        ProductColorId = DbUtils.GetInt(reader, "ProductColorId"),
//                        InventoryQuantity = DbUtils.GetInt(reader, "InventoryQuantity"),
//                        Price = DbUtils.GetInt(reader, "Price"),
//                        Description = DbUtils.GetString(reader, "Description"),
//                        ProductImage = DbUtils.GetString(reader, "ProductImage"),
//                        ProductColor = new ProductColor()
//                        {
//                            Id = DbUtils.GetInt(reader, "ProductColorId"),
//                            ColorId = DbUtils.GetInt(reader, "ColorId"),
//                            Color = new Color()
//                            {
//                                Id = DbUtils.GetInt(reader, "ColorId"),
//                                Name = DbUtils.GetString(reader, "Name"),

//                            }
//,
//                        },
//                    });
//                }

//                return products;
//            }

//        }
//    }
//}

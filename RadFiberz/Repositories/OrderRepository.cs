using Microsoft.Extensions.Configuration;
using RadFiberz.Models;
using RadFiberz.Utils;
using System;
using System.Collections.Generic;

namespace RadFiberz.Repositories
{
    public class OrderRepository : BaseRepository, IOrderRepository
    {
        public OrderRepository(IConfiguration configuration) : base(configuration) { }

        public Order GetByUserId(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT o.Id AS OrderId, o.ProductId, o.UserId, o.CartId,
                               c.Id, c.ProductId AS CartProductId, c.ProductQuantity, c.UserId AS CartUserId,
                               c.OrderComplete,
                               up.Id AS UserProfileId, up.FirstName, up.LastName, up.Email, up.StreetAddress,
                               up.City, up.State, up.ZipCode, up.PhoneNumber, up.FirebaseUserId, up.IsActive
                        FROM Order o
                        JOIN Cart c ON o.CartId = c.Id
                        JOIN UserProfile up ON o.UserId = up.Id
                        WHERE o.UserId = @userId";

                    DbUtils.AddParameter(cmd, "@userId", userId);

                    Order order = null;
                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        order = new Order()
                        {
                            Id = DbUtils.GetInt(reader, "OrderId"),
                            ProductId = DbUtils.GetInt(reader, "ProductId"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            CartId = DbUtils.GetInt(reader, "CartId"),
                            Cart = new Cart()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                ProductId = DbUtils.GetInt(reader, "CartProductId"),
                                ProductQuantity = DbUtils.GetInt(reader, "ProductQuantity"),
                                UserId = DbUtils.GetInt(reader, "CartUserId"),
                                UserProfile = new UserProfile()
                                {
                                    Id = DbUtils.GetInt(reader, "UserProfileId"),
                                    FirstName = DbUtils.GetString(reader, "FirstName"),
                                    LastName = DbUtils.GetString(reader, "LastName"),
                                    Email = DbUtils.GetString(reader, "Email"),
                                    StreetAddress = DbUtils.GetString(reader, "StreetAddress"),
                                    City = DbUtils.GetString(reader, "City"),
                                    State = DbUtils.GetString(reader, "State"),
                                    ZipCode = DbUtils.GetInt(reader, "ZipCode"),
                                    PhoneNumber = DbUtils.GetString(reader, "PhoneNumber"),
                                    FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                                    IsActive = DbUtils.GetBool(reader, "IsActive")
                                }
                            }
                        };
                    }
                    return order;
                }
            }
        }
    }
}

using Microsoft.Extensions.Configuration;
using RadFiberz.Models;
using RadFiberz.Utils;
using System;
using System.Collections.Generic;
using System.Data;

namespace RadFiberz.Repositories
{
    public class OrderRepository : BaseRepository, IOrderRepository
    {
        public OrderRepository(IConfiguration configuration) : base(configuration) { }

        public List<Order> GetByUserId(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT o.Id AS OrderId, o.ProductId, o.UserId, o.CartId,
                               p.Id AS ProdId, p.IsMacrame, p.IsJewelry, p.Name, p.ProductColorId AS ProdClrId,
                               p.InventoryQuantity, p.Price, p.Description, p.ProductImage,
                               c.Id, c.ProductId AS CartProductId, c.ProductQuantity, c.UserId AS CartUserId,
                               c.OrderComplete,
                               pc.ColorId, pc.ProductId AS PrdctId,
                               col.Id AS ClrId, col.Name AS ClrName,
                               up.Id AS UserProfileId, up.FirstName, up.LastName, up.Email, up.StreetAddress,
                               up.City, up.State, up.ZipCode, up.PhoneNumber, up.FirebaseUserId, up.IsActive
                        FROM Order o
                        JOIN Product p ON o.ProductId = p.Id
                        JOIN Cart c ON p.Id = c.ProductId
                        JOIN ProductColor pc ON p.Id = pc.ProductId
                        JOIN Color col ON pc.ColorId = col.Id
                        JOIN UserProfile up ON o.UserId = up.Id
                        WHERE o.UserId = @userId";

                    DbUtils.AddParameter(cmd, "@userId", userId);

                    var orders = new List<Order>();

                    using (var reader = cmd.ExecuteReader())
                    {
                        while (reader.Read())
                        {
                            orders.Add(new Order()
                            {
                                Id = DbUtils.GetInt(reader, "OrderId"),
                                ProductId = DbUtils.GetInt(reader, "ProductId"),
                                UserId = DbUtils.GetInt(reader, "UserId"),
                                CartId = DbUtils.GetInt(reader, "CartId"),
                                Product = new Product()
                                {
                                    Id = DbUtils.GetInt(reader, "ProdId"),
                                    IsMacrame = DbUtils.GetBool(reader, "IsMacrame"),
                                    IsJewelry = DbUtils.GetBool(reader, "IsJewelry"),
                                    Name = DbUtils.GetString(reader, "Name"),
                                    ProductColorId = DbUtils.GetInt(reader, "ProdClrId"),
                                    InventoryQuantity = DbUtils.GetInt(reader, "InventoryQuantity"),
                                    Price = reader.GetDouble(reader.GetOrdinal("Price")),
                                    Description = DbUtils.GetString(reader, "Description"),
                                    ProductImage = DbUtils.GetString(reader, "ProductImage"),
                                    Cart = new Cart()
                                    {
                                        Id = DbUtils.GetInt(reader, "Id"),
                                        ProductId = DbUtils.GetInt(reader, "CartProductId"),
                                        ProductQuantity = DbUtils.GetInt(reader, "ProductQuantity"),
                                        UserId = DbUtils.GetInt(reader, "CartUserId"),
                                        ProductColor = new ProductColor()
                                        {
                                            ColorId = DbUtils.GetInt(reader, "ColorId"),
                                            ProductId = DbUtils.GetInt(reader, "PrdctId"),
                                            Color = new Color()
                                            {
                                                Id = DbUtils.GetInt(reader, "ClrId"),
                                                Name = DbUtils.GetString(reader, "ClrName"),
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
                                        }
                                    }
                                }
                            });
                        }
                        return orders;
                    }
                }
            }
        }

        //public void Add(Order order)
        //{

        //}

        //public void Delete(int id)
        //{

        //}
    }
}

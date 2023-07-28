using RadFiberz.Models;
using System;
using Microsoft.Extensions.Configuration;
using RadFiberz.Utils;

namespace RadFiberz.Repositories
{
    public class CartRepository : BaseRepository, ICartRepository
    {
        public CartRepository(IConfiguration configuration) : base(configuration) { }

        public Cart GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT c.Id, c.ProductId, c.ProductQuantity, c.UserId, c.ProductColorId, c.OrderComplete,
                               p.Id AS ProdId, p.IsMacrame, p.IsJewelry, p.Name, p.ProductColorId AS ProdClrId, p.InventoryQuantity,
                               p.Price, p.Description, p.ProductImage,
                               pc.Id AS PrdctClrId, pc.ColorId, pc.ProductId AS PrdctId,
                               col.Id AS ClrId, col.Name AS ColorName
                        FROM Cart c
                        JOIN Product p ON c.ProductId = p.Id
                        JOIN ProductColor pc ON p.ProductColorId = pc.Id
                        JOIN Color col ON pc.ColorId = col.Id
                        WHERE c.Id = @id";

                    DbUtils.AddParameter(cmd, "id", id);

                    Cart cart = null;
                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        cart = new Cart()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            ProductId = DbUtils.GetInt(reader, "ProductId"),
                            ProductQuantity = DbUtils.GetInt(reader, "ProductQuantity"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            ProductColorId = DbUtils.GetInt(reader, "ProductColorId"),
                            OrderComplete = DbUtils.GetBool(reader, "OrderComplete"),
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
                                ProductColor = new ProductColor()
                                {
                                    Id = DbUtils.GetInt(reader, "PrdctClrId"),
                                    ColorId = DbUtils.GetInt(reader, "ColorId"),
                                    ProductId = DbUtils.GetInt(reader, "PrdctId"),
                                    Color = new Color()
                                    {
                                        Id = DbUtils.GetInt(reader, "ClrId"),
                                        Name = DbUtils.GetString(reader, "ColorName")
                                    }
                                }
                            }

                        };
                    }
                    return cart;
                }
            }
        }

        public Cart GetByUserId(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT c.Id, c.ProductId, c.ProductQuantity, c.UserId, c.ProductColorId, c.OrderComplete,
                               p.Id AS ProdId, p.IsMacrame, p.IsJewelry, p.Name, p.ProductColorId AS ProdClrId, p.InventoryQuantity,
                               p.Price, p.Description, p.ProductImage,
                               pc.Id AS PrdctClrId, pc.ColorId, pc.ProductId AS PrdctId,
                               col.Id AS ClrId, col.Name AS ColorName
                        FROM Cart c
                        JOIN Product p ON c.ProductId = p.Id
                        JOIN ProductColor pc ON p.ProductColorId = pc.Id
                        JOIN Color col ON pc.ColorId = col.Id
                        WHERE c.UserId = @userId";

                    DbUtils.AddParameter(cmd, "@userId", userId);

                    Cart cart = null;
                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        cart = new Cart()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            ProductId = DbUtils.GetInt(reader, "ProductId"),
                            ProductQuantity = DbUtils.GetInt(reader, "ProductQuantity"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            ProductColorId = DbUtils.GetInt(reader, "ProductColorId"),
                            OrderComplete = DbUtils.GetBool(reader, "OrderComplete"),
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
                                ProductColor = new ProductColor()
                                {
                                    Id = DbUtils.GetInt(reader, "PrdctClrId"),
                                    ColorId = DbUtils.GetInt(reader, "ColorId"),
                                    ProductId = DbUtils.GetInt(reader, "PrdctId"),
                                    Color = new Color()
                                    {
                                        Id = DbUtils.GetInt(reader, "ClrId"),
                                        Name = DbUtils.GetString(reader, "ColorName")
                                    }
                                }
                            }

                        };
                    }
                    return cart;
                }
            }
        }

        public void Delete(int productId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        DELETE FROM Cart
                        WHERE ProductId = @productId";

                    DbUtils.AddParameter(cmd, "@productId", productId);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Update(Cart cart)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Cart
                        SET ProductId = @productId,
                            ProductQuantity = @productQuantity,
                            UserId = @userId,
                            ProductColorId = @productColorId,
                            OrderComplete = @orderComplete
                        WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@productId", cart.ProductId);
                    DbUtils.AddParameter(cmd, "@productQuantity", cart.ProductQuantity);
                    DbUtils.AddParameter(cmd, "@userId", cart.UserId);
                    DbUtils.AddParameter(cmd, "@productColorId", cart.ProductColorId);
                    DbUtils.AddParameter(cmd, "@orderComplete", cart.OrderComplete);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Add(Cart cart)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Cart (ProductId, ProductQuantity, UserId, ProductColorId, OrderComplete)
                        OUTPUT INSERTED.ID
                        VALUES (@ProductId, @ProductQuantity, @UserId, @ProductColorId, @OrderComplete)";

                    DbUtils.AddParameter(cmd, "ProductId", cart.ProductId);
                    DbUtils.AddParameter(cmd, "@ProductQuantity", cart.ProductQuantity);
                    DbUtils.AddParameter(cmd, "@UserId", cart.UserId);
                    DbUtils.AddParameter(cmd, "@ProductColorId", cart.ProductColorId);
                    DbUtils.AddParameter(cmd, "@OrderComplete", cart.OrderComplete);

                    cart.Id = (int)cmd.ExecuteScalar();
                }
            }
        }
    }
}





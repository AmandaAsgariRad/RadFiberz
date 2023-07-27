using RadFiberz.Models;
using System;
using Microsoft.Extensions.Configuration;
using RadFiberz.Utils;

namespace RadFiberz.Repositories
{
    public class CartRepository : BaseRepository
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
                               pc.Id AS PrdctClrId, pc.ColorId, pc.ProductId AS PrdctId,
                               col.Id AS ClrId, col.Name
                        FROM Cart c
                        JOIN ProductColor pc ON c.Id = pc.PrdctClrId
                        JOIN Color col ON pc.ColorId = col.ClrId
                        WHERE c.Id = @Id";

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
                            ProductColor = new ProductColor()
                            {
                                Id = DbUtils.GetInt(reader, "PrdctClrId"),
                                ColorId = DbUtils.GetInt(reader, "ColorId"),
                                ProductId = DbUtils.GetInt(reader, "PrdctId"),
                                Color = new Color()
                                {
                                    Id = DbUtils.GetInt(reader, "ClrId"),
                                    Name = DbUtils.GetString(reader, "Name")
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
                               pc.Id AS PrdctClrId, pc.ColorId, pc.ProductId AS PrdctId,
                               col.Id AS ClrId, col.Name
                        FROM Cart c
                        JOIN ProductColor pc ON c.Id = pc.PrdctClrId
                        JOIN Color col ON pc.ColorId = col.ClrId
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
                            ProductColor = new ProductColor()
                            {
                                Id = DbUtils.GetInt(reader, "PrdctClrId"),
                                ColorId = DbUtils.GetInt(reader, "ColorId"),
                                ProductId = DbUtils.GetInt(reader, "PrdctId"),
                                Color = new Color()
                                {
                                    Id = DbUtils.GetInt(reader, "ClrId"),
                                    Name = DbUtils.GetString(reader, "Name")
                                }
                            }

                        };
                    }
                    return cart;
                }
            }
        }
    }
}





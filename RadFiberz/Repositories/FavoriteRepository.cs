using Microsoft.Extensions.Configuration;
using RadFiberz.Models;
using RadFiberz.Utils;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Security.Cryptography;

namespace RadFiberz.Repositories
{
    public class FavoriteRepository : BaseRepository, IFavoriteRepository
    {
        public FavoriteRepository(IConfiguration configuration) : base(configuration) { }

        public List<Favorite> GetAllByUserId(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                SELECT f.Id, f.UserId, f.ProductId, 
                       p.Id AS PrdctId, p.Name AS ProductName, p.Price AS ProductPrice, p.ProductImage AS ProductImage, p.IsMacrame, p.IsJewelry, p.Description
                FROM Favorite f
                JOIN Product p ON f.ProductId = p.Id
                WHERE f.UserId = @userId";

                    DbUtils.AddParameter(cmd, "@userId", userId);

                    var reader = cmd.ExecuteReader();
                    var favorites = new List<Favorite>();
                    while (reader.Read())
                    {
                        favorites.Add(new Favorite()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            ProductId = DbUtils.GetInt(reader, "ProductId"),
                            Product = new Product()
                            {
                                Id = DbUtils.GetInt(reader, "PrdctId"),
                                Name = DbUtils.GetString(reader, "ProductName"),
                                Price = reader.GetDouble(reader.GetOrdinal("ProductPrice")),
                                ProductImage = DbUtils.GetString(reader, "ProductImage"),
                                IsMacrame = DbUtils.GetBool(reader, "IsMacrame"),
                                IsJewelry = DbUtils.GetBool(reader, "IsJewelry"),
                                Description = DbUtils.GetString(reader, "Description"),
                                //ProductColor = new ProductColor()
                                //{
                                //    Id = DbUtils.GetInt(reader, "PrdctClrId"),
                                //    ProductId = DbUtils.GetInt(reader, "ProdId"),
                                //    ColorId = DbUtils.GetInt(reader, "ColorId"),
                                //    Color = new Color()
                                //    {
                                //        Id = DbUtils.GetInt(reader, "ClrId"),
                                //        Name = DbUtils.GetString(reader, "Name")
                                //    }
                                //}
                            }
                        });
                    }

                    return favorites;
                }
            }
        }

        public void Add(Favorite favorite)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Favorite (UserId, ProductId)
                        OUTPUT INSERTED.ID
                        VALUES (@UserId, @ProductId)";

                    DbUtils.AddParameter(cmd, "UserId", favorite.UserId);
                    DbUtils.AddParameter(cmd, "ProductId", favorite.ProductId);

                    favorite.Id = (int)cmd.ExecuteScalar();

                }
            }
        }

        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                DELETE FROM Favorite
                WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}

    //add to GetAllByUserId method
    //pc.Id AS PrdctClrId, pc.ProductId AS ProdId, pc.ColorId,
    //c.Id AS ClrId, c.Name
    //    JOIN ProductColor pc ON p.Id = pc.PrdctClrId
    //            JOIN Color c ON pc.PrdctClrId = c.ClrId


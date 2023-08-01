using Microsoft.Extensions.Configuration;
using RadFiberz.Models;
using RadFiberz.Utils;
using System;
using System.Collections.Generic;

namespace RadFiberz.Repositories
{
    public class ColorRepository : BaseRepository, IColorRepository
    {
        public ColorRepository(IConfiguration configuration) : base(configuration) { }

        public List<Color> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT *
                        FROM Color";

                    using (var reader = cmd.ExecuteReader())
                    {
                        var colors = new List<Color>();
                        while (reader.Read())
                        {
                            colors.Add(new Color()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Name = DbUtils.GetString(reader, "Name"),
                            });
                        }
                        return colors;
                    }
                }
            }
        }

        public Color GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT *
                        FROM Color
                        WHERE Id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    Color color = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        color = new Color()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Name = DbUtils.GetString(reader, "Name")
                        };
                    }

                    return color;
                }
            }
        }

        //----------------------------product colors------------------------------------------------------


        public List<ProductColor> GetAllProductColors()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT pc.Id, pc.ColorId, pc.ProductId, pc.UserId,
                               c.Id AS ClrId, c.Name,
                               p.Id AS PrdctId,
                               up.Id AS UserProfileId
                        FROM ProductColor pc
                        JOIN Product p ON p.Id = pc.ProductId
                        JOIN Color c ON pc.ColorId = c.Id
                        JOIN UserProfile up ON pc.UserId = up.Id;
                        ";

                    using (var reader = cmd.ExecuteReader())
                    {
                        var productColors = new List<ProductColor>();
                        while (reader.Read())
                        {
                            productColors.Add(new ProductColor()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                ColorId = DbUtils.GetInt(reader, "ColorId"),
                                ProductId = DbUtils.GetInt(reader, "ProductId"),
                                UserId = DbUtils.GetInt(reader, "UserId"),
                                Color = new Color()
                                {
                                    Id = DbUtils.GetInt(reader, "ClrId"),
                                    Name = DbUtils.GetString(reader, "Name"),
                                    UserProfile = new UserProfile()
                                    {
                                        Id = DbUtils.GetInt(reader, "UserProfileId"),
                                        Product = new Product()
                                        {
                                            Id = DbUtils.GetInt(reader, "PrdctId")
                                        }
                                    }
                                }
                            });

                        }
                        return productColors;
                    }



                }
            }

        }

        //getbyuserid
        public ProductColor GetPcByUserId(int userId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT pc.Id, pc.ColorId, pc.ProductId, pc.UserId,
                               c.Id AS ClrId, c.Name,
                               p.Id AS PrdctId
                        FROM ProductColor pc
                        JOIN Product p ON p.Id = pc.ProductId
                        JOIN Color c ON pc.ColorId = c.Id
                        WHERE pc.UserId = @userId";

                    DbUtils.AddParameter(cmd, "@userId", userId);

                    ProductColor productColor = null;
                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        productColor = new ProductColor()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            ColorId = DbUtils.GetInt(reader, "ColorId"),
                            ProductId = DbUtils.GetInt(reader, "ProductId"),
                            UserId = DbUtils.GetInt(reader, "UserId"),
                            Product = new Product()
                            {
                                Id = DbUtils.GetInt(reader, "PrdctId"),
                                Color = new Color()
                                {
                                    Id = DbUtils.GetInt(reader, "ClrId"),
                                    Name = DbUtils.GetString(reader, "Name")
                                }
                            }
                        };
                    }
                    return productColor;
                }
            }
        }

        //post/add product color
        public void AddProductColor(ProductColor productColor)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO ProductColor (ColorId, ProductId, UserId)
                        OUTPUT INSERTED.ID
                        VALUES (@ColorId, @ProductId, @UserId)";

                    DbUtils.AddParameter(cmd, "@ColorId", productColor.ColorId);
                    DbUtils.AddParameter(cmd, "@ProductId", productColor.ProductId);
                    DbUtils.AddParameter(cmd, "@UserId", productColor.UserId);

                    productColor.Id = (int)cmd.ExecuteScalar();

               
                }
            }
        }
        
        //delete productcolorbyid
        public void DeletePcById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        DELETE FROM ProductColor
                        WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }
        
    }
}
using RadFiberz.Models;
using System;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
using RadFiberz.Utils;
using System.Data.Common;

namespace RadFiberz.Repositories
{
    public class ProductRepository : BaseRepository, IProductRepository
    {
        public ProductRepository(IConfiguration configuration) : base(configuration) { }

        public List<Product> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT p.Id, p.IsMacrame, p.IsJewelry, p.Name, p.InventoryQuantity, p.Price, p.Description, p.ProductImage,
                               pc.Id AS PcId, pc.ColorId, pc.ProductId,
                               c.Id AS ColorId, c.Name AS ColorName
                        FROM Product p
                        JOIN ProductColor pc ON p.Id = pc.ProductId
                        JOIN Color c ON c.Id = pc.ColorId";

                    using (var reader = cmd.ExecuteReader())
                    {
                        var products = new List<Product>();
                        while (reader.Read())
                        {
                            products.Add(new Product()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                IsMacrame = DbUtils.GetBool(reader, "IsMacrame"),
                                IsJewelry = DbUtils.GetBool(reader, "IsJewelry"),
                                Name = DbUtils.GetString(reader, "Name"),
                                InventoryQuantity = DbUtils.GetInt(reader, "InventoryQuantity"),
                                Price = reader.GetDouble(reader.GetOrdinal("Price")),
                                Description = DbUtils.GetString(reader, "Description"),
                                ProductImage = DbUtils.GetString(reader, "ProductImage")
                                
                            });
                        }

                        return products;
                    }

                }
            }
        }

        public Product GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT p.Id, p.IsMacrame, p.IsJewelry, p.Name, p.InventoryQuantity, p.Price, p.Description, p.ProductImage,
                               pc.Id AS PcId, pc.ColorId, pc.ProductId,
                               c.Id AS ColorId, c.Name AS ColorName
                        FROM Product P
                        JOIN ProductColor pc ON p.Id = pc.ProductId
                        JOIN Color c ON c.Id = pc.ColorId
                        WHERE p.Id = @id";

                    DbUtils.AddParameter(cmd, "@id", id);

                    Product product = null;
                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        product = new Product()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            IsMacrame = DbUtils.GetBool(reader, "IsMacrame"),
                            IsJewelry = DbUtils.GetBool(reader, "IsJewelry"),
                            Name = DbUtils.GetString(reader, "Name"),
                            InventoryQuantity = DbUtils.GetInt(reader, "InventoryQuantity"),
                            Price = reader.GetDouble(reader.GetOrdinal("Price")),
                            Description = DbUtils.GetString(reader, "Description"),
                            ProductImage = DbUtils.GetString(reader, "ProductImage"),
                            
                        };
                    }

                    return product;
                }

            }
        }



    }
}

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
                        SELECT *
                        FROM Product";
                        

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
                        SELECT *
                        FROM Product";

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

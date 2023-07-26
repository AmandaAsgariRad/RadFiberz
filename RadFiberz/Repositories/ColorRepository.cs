//using Microsoft.Extensions.Configuration;
//using RadFiberz.Models;
//using RadFiberz.Utils;
//using System;
//using System.Collections.Generic;

//namespace RadFiberz.Repositories
//{
//    public class ColorRepository : BaseRepository, IColorRepository
//    {
//        public ColorRepository(IConfiguration configuration) : base(configuration) { }

//        public List<Color> GetAll()
//        {
//            using (var conn = Connection)
//            {
//                conn.Open();
//                using (var cmd = conn.CreateCommand())
//                {
//                    cmd.CommandText = @"
//                        SELECT *
//                        FROM Color";

//                    using (var reader = cmd.ExecuteReader())
//                    {
//                        var colors = new List<Color>();
//                        while (reader.Read())
//                        {
//                            colors.Add(new Color()
//                            {
//                                Id = DbUtils.GetInt(reader, "Id"),
//                                Name = DbUtils.GetString(reader, "Name"),
//                            });
//                        }
//                        return colors;
//                    }
//                }
//            }
//        }

//        public Color GetById(int id)
//        {
//            using (var conn = Connection)
//            {
//                conn.Open();
//                using (var cmd =conn.CreateCommand())
//                {
//                    cmd.CommandText = @"
//                        SELECT *
//                        FROM Color
//                        WHERE Id = @id";

//                    DbUtils.AddParameter(cmd, "@id", id);

//                    Color color = null;

//                    var reader = cmd.ExecuteReader();
//                    if (reader.Read())
//                    {
//                        color = new Color()
//                        {
//                            Id = DbUtils.GetInt(reader, "Id"),
//                            Name = DbUtils.GetString(reader, "Name")
//                        };
//                    }

//                    return color;
//                }
//            }
//        }

        //public List<Color> GetAllProductColors()
        //{
        //    using (var conn = Connection)
        //    {
        //        conn.Open();
        //        using (var cmd = conn.CreateCommand())
        //        {
        //            cmd.CommandText = @"
        //                SELECT pc.Id, pc.ColorId, pc.ProductId,
        //                       c.Id AS ClrId, c.Name AS ColorName,
        //                       p.Id AS PrdctId, p.ProductColorid AS PrdctClrId
        //                FROM ProductColor pc
        //                JOIN Product p ON pc.Id = p.PrdctId
        //                JOIN Color c ON pc.ColorId = c.ClrId
        //                ";

        //            using (var reader = cmd.ExecuteReader())
        //            {
        //                var colors = new List<Color>();
        //                while (reader.Read())
        //                {
        //                    colors.Add(new Color()
        //                    {
        //                        Id = DbUtils.GetInt(reader, "ProductColorId"),
        //                        ColorId = DbUtils.GetInt(reader, "ColorId"),
        //                        ProductId = DbUtils.GetInt(reader, "ProductId"),
        //                        Color = new Color()
        //                        {
        //                            Id = DbUtils.GetInt(reader, "Id"),
        //                            Name = DbUtils.GetString(reader, "ColorName")
        //                        }
        //                    });
        //                }
        //                return colors;
        //            }


        //        }
        //    }
        //}
//    }
//}
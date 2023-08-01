using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace RadFiberz.Models
{
    public class Product
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(55)]
        public string Name { get; set; }
        
        [Required]
        public bool IsMacrame { get; set; }
        [Required]
        public bool IsJewelry { get; set; }

        [Required]
        public int InventoryQuantity { get; set; }
        [Required]
        public double Price { get; set; }
        [Required]
        [MaxLength(75)]
        public string Description { get; set; }
        public string ProductImage { get; set; }
        public List<ProductColor> ProductColors { get; set; }
        public Cart Cart { get; set; }
        
        public Color Color { get; set; }
        



    }
}

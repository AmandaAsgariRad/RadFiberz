using System;
using System.ComponentModel.DataAnnotations;

namespace RadFiberz.Models
{
    public class Product
    {
        [Required]
        [MaxLength(50)]
        public string Name { get; set; }
        public int Id { get; set; }
        public bool IsMacrame { get; set; }
        public bool IsJewelry { get; set; }

        [Required]
        public int ColorId { get; set; }
        public int Quantity { get; set; }


    }
}

using System;
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
        public int ColorId { get; set; }
        public int Quantity { get; set; }


    }
}

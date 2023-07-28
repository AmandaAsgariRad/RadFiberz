using System.ComponentModel.DataAnnotations;

namespace RadFiberz.Models
{
    public class ProductColor
    {
        public int Id { get; set; }
        [Required]
        public int ColorId { get; set; }
        [Required]
        public int ProductId { get; set; }
        public Color Color { get; set; }
        public Product Product { get; set; }
    }
}

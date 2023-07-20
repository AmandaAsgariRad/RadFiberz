using System.ComponentModel.DataAnnotations;

namespace RadFiberz.Models
{
    public class CartProduct
    {
        public int Id { get; set; }
        [Required]
        public int ProductId { get; set; }
        [Required]
        public int CartId { get; set; }

    }
}

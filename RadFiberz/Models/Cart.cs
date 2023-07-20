using System.ComponentModel.DataAnnotations;

namespace RadFiberz.Models
{
    public class Cart
    {
        public int Id { get; set; }
        [Required]
        public int UserId { get; set; }

    }
}

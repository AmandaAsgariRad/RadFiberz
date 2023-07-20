using System.ComponentModel.DataAnnotations;

namespace RadFiberz.Models
{
    public class Color
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; }

    }
}

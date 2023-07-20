namespace RadFiberz.Models
{
    public class Purchase
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public int UserId { get; set; }
        public int PurchaseDate { get; set; }
        public int OrderId { get; set; }

    }
}

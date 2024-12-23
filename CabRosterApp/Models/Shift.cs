using System.ComponentModel.DataAnnotations;

namespace CabRosterApp.Models
{
    public class Shift
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string ShiftTime { get; set; }
    }
}
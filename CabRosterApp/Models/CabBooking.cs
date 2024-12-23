using System;
using System.ComponentModel.DataAnnotations;

namespace CabRosterApp.Models
{
    public class CabBooking
    {
        public int Id { get; set; }

        public string UserId { get; set; }  // Change int to string

        [Required]
        public int ShiftId { get; set; }

        [Required]
        public DateTime BookingDate { get; set; } // Date of the booking

        [Required]
        [MaxLength(20)]
        public string Status { get; set; }

        // Navigation properties
        public ApplicationUser User { get; set; }
        public Shift Shift { get; set; }

        // Foreign Key for NodalPoint
        public int NodalPointId { get; set; }  // <-- Add this foreign key
        public virtual NodalPoint NodalPoint { get; set; }  // <-- Navigation property to NodalPoint

    }
}

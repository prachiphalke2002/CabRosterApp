namespace CabRosterApp.Models
{
    public class CabBookingRequest
    {
        public string UserId { get; set; }  // User requesting the booking
        public int ShiftId { get; set; }    // ID of the Shift
        public List<DateTime> BookingDates { get; set; }  // Dates to book
                                                          // Add this property to represent NodalPointId
        public int NodalPointId { get; set; }  // NodalPointId that is being booked
    }
}

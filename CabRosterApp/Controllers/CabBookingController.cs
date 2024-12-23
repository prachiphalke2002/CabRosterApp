using CabRosterApp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace CabRosterApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CabBookingController : ControllerBase
    {
        private readonly CabRosterAppDbContext _context;

        public CabBookingController(CabRosterAppDbContext context)
        {
            _context = context;
        }

        // POST /api/CabBooking/book
        [HttpPost("book")]
        public async Task<IActionResult> BookCab([FromBody] CabBookingRequest bookingRequest)
        {
            if (bookingRequest == null)
            {
                return BadRequest("Invalid booking request.");
            }

            // Check if all required fields are present
            if (bookingRequest.BookingDates == null || bookingRequest.BookingDates.Count == 0)
            {
                return BadRequest("No dates selected.");
            }

            if (bookingRequest.ShiftId <= 0 || bookingRequest.NodalPointId <= 0)
            {
                return BadRequest("Invalid shift or nodal point.");
            }

            try
            {
                // Creating a new cab booking for each selected date
                foreach (var date in bookingRequest.BookingDates)
                {
                    var newBooking = new CabBooking
                    {
                        UserId = bookingRequest.UserId,
                        ShiftId = bookingRequest.ShiftId,
                        BookingDate = date,
                        Status = "Booked",  // Set the status as "Booked" initially
                        NodalPointId = bookingRequest.NodalPointId
                    };

                    _context.CabBookings.Add(newBooking);  // Add each individual booking record to the context
                }

                await _context.SaveChangesAsync();  // Save all new bookings in the database -a

                return Ok(new { Success = true, Message = "Cab booked successfully!" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Error = ex.Message });
            }
        }

        // GET /api/CabBooking/list
        [HttpGet("list")]
        public async Task<IActionResult> GetBookings()
        {
            try
            {
                // Fetch all bookings with their associated shift and user data
                var bookings = await _context.CabBookings
                    .Include(b => b.Shift) // Include the Shift navigation property
                    .Include(b => b.User) // Include the User navigation property
                    .Select(b => new
                    {
                        b.Id,
                        b.BookingDate,
                        Shift = b.Shift.ShiftTime, // Shift time
                        b.Status,
                        User = b.User.Name, // User who booked
                        b.NodalPointId // Nodal point ID
                    })
                    .ToListAsync(); // Asynchronously execute the query

                return Ok(bookings);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Error = ex.Message });
            }
        }

        // PUT /api/CabBooking/update-status/{id}
        [HttpPut("update-status/{id}")]
        public async Task<IActionResult> UpdateBookingStatus(int id, [FromBody] string status)
        {
            if (string.IsNullOrEmpty(status) || (status != "Approved" && status != "Rejected"))
            {
                return BadRequest(new { Error = "Invalid status. Use 'Approved' or 'Rejected'." });
            }

            try
            {
                var booking = await _context.CabBookings.FindAsync(id); // Asynchronous DB lookup
                if (booking == null)
                {
                    return NotFound(new { Error = "Booking not found." });
                }

                // Update the booking status
                booking.Status = status;
                await _context.SaveChangesAsync(); // Asynchronously save changes

                return Ok(new { Message = $"Booking status updated to {status}." });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Error = ex.Message });
            }
        }
    }
}

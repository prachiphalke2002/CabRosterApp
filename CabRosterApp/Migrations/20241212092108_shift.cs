using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CabRosterApp.Migrations
{
    /// <inheritdoc />
    public partial class shift : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ShiftId1",
                table: "CabBookings",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_CabBookings_ShiftId1",
                table: "CabBookings",
                column: "ShiftId1");

            migrationBuilder.AddForeignKey(
                name: "FK_CabBookings_Shifts_ShiftId1",
                table: "CabBookings",
                column: "ShiftId1",
                principalTable: "Shifts",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CabBookings_Shifts_ShiftId1",
                table: "CabBookings");

            migrationBuilder.DropIndex(
                name: "IX_CabBookings_ShiftId1",
                table: "CabBookings");

            migrationBuilder.DropColumn(
                name: "ShiftId1",
                table: "CabBookings");
        }
    }
}

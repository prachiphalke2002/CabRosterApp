using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CabRosterApp.Migrations
{
    /// <inheritdoc />
    public partial class AddCabBookingModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "BookingDate",
                table: "CabBookings",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "BookingStatus",
                table: "CabBookings",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "ShiftTime",
                table: "CabBookings",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                table: "CabBookings",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_CabBookings_UserId",
                table: "CabBookings",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_CabBookings_AspNetUsers_UserId",
                table: "CabBookings",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CabBookings_AspNetUsers_UserId",
                table: "CabBookings");

            migrationBuilder.DropIndex(
                name: "IX_CabBookings_UserId",
                table: "CabBookings");

            migrationBuilder.DropColumn(
                name: "BookingDate",
                table: "CabBookings");

            migrationBuilder.DropColumn(
                name: "BookingStatus",
                table: "CabBookings");

            migrationBuilder.DropColumn(
                name: "ShiftTime",
                table: "CabBookings");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "CabBookings");
        }
    }
}

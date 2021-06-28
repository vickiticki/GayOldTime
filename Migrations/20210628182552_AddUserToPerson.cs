using Microsoft.EntityFrameworkCore.Migrations;

namespace GayOldTime.Migrations
{
    public partial class AddUserToPerson : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "LgbtPeople",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "UserId",
                table: "LgbtPeople");
        }
    }
}

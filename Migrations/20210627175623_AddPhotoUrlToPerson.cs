using Microsoft.EntityFrameworkCore.Migrations;

namespace GayOldTime.Migrations
{
    public partial class AddPhotoUrlToPerson : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PhotoUrl",
                table: "LgbtPeople",
                type: "text",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PhotoUrl",
                table: "LgbtPeople");
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

namespace GayOldTime.Migrations
{
    public partial class AddMakerUpdaterStrings : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "LastUpdater",
                table: "LgbtPeople",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Maker",
                table: "LgbtPeople",
                type: "text",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LastUpdater",
                table: "LgbtPeople");

            migrationBuilder.DropColumn(
                name: "Maker",
                table: "LgbtPeople");
        }
    }
}

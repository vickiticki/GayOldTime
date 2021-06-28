using Microsoft.EntityFrameworkCore.Migrations;

namespace GayOldTime.Migrations
{
    public partial class AddLgbtPeople : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // migrationBuilder.DropColumn(
            //     name: "Birthdate",
            //     table: "LgbtPeople");

            migrationBuilder.AddColumn<int>(
                name: "LgbtPersonId",
                table: "MediaRecs",
                type: "integer",
                nullable: true);

            // migrationBuilder.AddColumn<int>(
            //     name: "BirthYear",
            //     table: "LgbtPeople",
            //     type: "integer",
            //     nullable: false,
            //     defaultValue: 0);

            // migrationBuilder.AddColumn<string>(
            //     name: "Birthday",
            //     table: "LgbtPeople",
            //     type: "text",
            //     nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_MediaRecs_LgbtPersonId",
                table: "MediaRecs",
                column: "LgbtPersonId");

            migrationBuilder.AddForeignKey(
                name: "FK_MediaRecs_LgbtPeople_LgbtPersonId",
                table: "MediaRecs",
                column: "LgbtPersonId",
                principalTable: "LgbtPeople",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MediaRecs_LgbtPeople_LgbtPersonId",
                table: "MediaRecs");

            migrationBuilder.DropIndex(
                name: "IX_MediaRecs_LgbtPersonId",
                table: "MediaRecs");

            migrationBuilder.DropColumn(
                name: "LgbtPersonId",
                table: "MediaRecs");

            migrationBuilder.DropColumn(
                name: "BirthYear",
                table: "LgbtPeople");

            migrationBuilder.DropColumn(
                name: "Birthday",
                table: "LgbtPeople");

            migrationBuilder.AddColumn<string>(
                name: "Birthdate",
                table: "LgbtPeople",
                type: "text",
                nullable: false,
                defaultValue: "");
        }
    }
}

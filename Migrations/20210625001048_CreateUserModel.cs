using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace GayOldTime.Migrations
{
    public partial class CreateUserModel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MediaRecs_LgbtPeople_LgbtPersonId",
                table: "MediaRecs");

            migrationBuilder.AlterColumn<int>(
                name: "LgbtPersonId",
                table: "MediaRecs",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    FullName = table.Column<string>(type: "text", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false),
                    HashedPassword = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.AddForeignKey(
                name: "FK_MediaRecs_LgbtPeople_LgbtPersonId",
                table: "MediaRecs",
                column: "LgbtPersonId",
                principalTable: "LgbtPeople",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MediaRecs_LgbtPeople_LgbtPersonId",
                table: "MediaRecs");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.AlterColumn<int>(
                name: "LgbtPersonId",
                table: "MediaRecs",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddForeignKey(
                name: "FK_MediaRecs_LgbtPeople_LgbtPersonId",
                table: "MediaRecs",
                column: "LgbtPersonId",
                principalTable: "LgbtPeople",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GayOldTime;
using GayOldTime.Models;

namespace GayOldTime.Controllers
{
    // All of these routes will be at the base URL:     /api/Users
    // That is what "api/[controller]" means below. It uses the name of the controller
    // in this case UsersController to determine the URL
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        // This is the variable you use to have access to your database
        private readonly DatabaseContext _context;

        // Constructor that recives a reference to your database context
        // and stores it in _context for you to use in your API methods
        public UsersController(DatabaseContext context)
        {
            _context = context;
        }



        // POST: api/Users
        //
        // Creates a new user in the database.
        //
        // The `body` of the request is parsed and then made available to us as a User
        // variable named user. The controller matches the keys of the JSON object the client
        // supplies to the names of the attributes of our User POCO class. This represents the
        // new values for the record.
        //
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            try
            {

                // Indicate to the database context we want to add this new record
                _context.Users.Add(user);
                await _context.SaveChangesAsync();

                // Return a response that indicates the object was created (status code `201`) and some additional
                // headers with details of the newly created object.
                return CreatedAtAction("GetUser", new { id = user.Id }, user);
            }
            catch (Microsoft.EntityFrameworkCore.DbUpdateException)
            {
                var response = new
                {
                    status = 400,
                    errors = new List<string>() { "This account already exists!" }
                };

                return BadRequest(response);
            }


        }

        // DELETE: api/Users/5
        //
        // Deletes an individual user with the requested id. The id is specified in the URL
        // In the sample URL above it is the `5`. The "{id} in the [HttpDelete("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            // Find this user by looking for the specific id
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                // There wasn't a user with that id so return a `404` not found
                return NotFound();
            }

            // Tell the database we want to remove this record
            _context.Users.Remove(user);

            // Tell the database to perform the deletion
            await _context.SaveChangesAsync();

            // Return a copy of the deleted data
            return Ok(user);
        }

        // Private helper method that looks up an existing user by the supplied id
        private bool UserExists(int id)
        {
            return _context.Users.Any(user => user.Id == id);
        }
    }
}

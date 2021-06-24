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
    // All of these routes will be at the base URL:     /api/LgbtPeople
    // That is what "api/[controller]" means below. It uses the name of the controller
    // in this case LgbtPeopleController to determine the URL
    [Route("api/[controller]")]
    [ApiController]
    public class LgbtPeopleController : ControllerBase
    {
        // This is the variable you use to have access to your database
        private readonly DatabaseContext _context;

        // Constructor that recives a reference to your database context
        // and stores it in _context for you to use in your API methods
        public LgbtPeopleController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/LgbtPeople
        //
        // Returns a list of all your LgbtPeople
        //
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LgbtPerson>>> GetLgbtPeople(string filter)
        {
            // Uses the database context in `_context` to request all of the LgbtPeople, sort
            // them by row id and return them as a JSON array.

            // UPDATE TO INCLUDE A FILTER WITH AN IF STATEMENT AND ORDER BY YEAR OR ALPHABET
            if (filter == null)
            {
                return await _context.LgbtPeople.OrderBy(row => row.Id).ToListAsync();

            }
            else
            {
                return await _context.LgbtPeople.Where(person => person.Name.ToLower().Contains(filter.ToLower()) || person.Country.ToLower().Contains(filter.ToLower())).ToListAsync();
            }


        }

        // GET: api/LgbtPeople/5
        //
        // Fetches and returns a specific lgbtPerson by finding it by id. The id is specified in the
        // URL. In the sample URL above it is the `5`.  The "{id}" in the [HttpGet("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        [HttpGet("{id}")]
        public async Task<ActionResult<LgbtPerson>> GetLgbtPerson(int id)
        {
            // Find the lgbtPerson in the database using `FindAsync` to look it up by id
            var lgbtPerson = await _context.LgbtPeople.Include(person => person.MediaRecs).Where(person => person.Id == id).FirstOrDefaultAsync();

            // If we didn't find anything, we receive a `null` in return
            if (lgbtPerson == null)
            {
                // Return a `404` response to the client indicating we could not find a lgbtPerson with this id
                return NotFound();
            }

            //  Return the lgbtPerson as a JSON object.
            return lgbtPerson;
        }

        // PUT: api/LgbtPeople/5
        //
        // Update an individual lgbtPerson with the requested id. The id is specified in the URL
        // In the sample URL above it is the `5`. The "{id} in the [HttpPut("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        // In addition the `body` of the request is parsed and then made available to us as a LgbtPerson
        // variable named lgbtPerson. The controller matches the keys of the JSON object the client
        // supplies to the names of the attributes of our LgbtPerson POCO class. This represents the
        // new values for the record.
        //
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLgbtPerson(int id, LgbtPerson lgbtPerson)
        {
            // If the ID in the URL does not match the ID in the supplied request body, return a bad request
            if (id != lgbtPerson.Id)
            {
                return BadRequest();
            }

            // Tell the database to consider everything in lgbtPerson to be _updated_ values. When
            // the save happens the database will _replace_ the values in the database with the ones from lgbtPerson
            _context.Entry(lgbtPerson).State = EntityState.Modified;

            try
            {
                // Try to save these changes.
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                // Ooops, looks like there was an error, so check to see if the record we were
                // updating no longer exists.
                if (!LgbtPersonExists(id))
                {
                    // If the record we tried to update was already deleted by someone else,
                    // return a `404` not found
                    return NotFound();
                }
                else
                {
                    // Otherwise throw the error back, which will cause the request to fail
                    // and generate an error to the client.
                    throw;
                }
            }

            // Return a copy of the updated data
            return Ok(lgbtPerson);
        }

        // POST: api/LgbtPeople
        //
        // Creates a new lgbtPerson in the database.
        //
        // The `body` of the request is parsed and then made available to us as a LgbtPerson
        // variable named lgbtPerson. The controller matches the keys of the JSON object the client
        // supplies to the names of the attributes of our LgbtPerson POCO class. This represents the
        // new values for the record.
        //
        [HttpPost]
        public async Task<ActionResult<LgbtPerson>> PostLgbtPerson(LgbtPerson lgbtPerson)
        {
            // Indicate to the database context we want to add this new record
            _context.LgbtPeople.Add(lgbtPerson);
            await _context.SaveChangesAsync();

            // Return a response that indicates the object was created (status code `201`) and some additional
            // headers with details of the newly created object.
            return CreatedAtAction("GetLgbtPerson", new { id = lgbtPerson.Id }, lgbtPerson);
        }

        // DELETE: api/LgbtPeople/5
        //
        // Deletes an individual lgbtPerson with the requested id. The id is specified in the URL
        // In the sample URL above it is the `5`. The "{id} in the [HttpDelete("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLgbtPerson(int id)
        {
            // Find this lgbtPerson by looking for the specific id
            var lgbtPerson = await _context.LgbtPeople.FindAsync(id);
            if (lgbtPerson == null)
            {
                // There wasn't a lgbtPerson with that id so return a `404` not found
                return NotFound();
            }

            // Tell the database we want to remove this record
            _context.LgbtPeople.Remove(lgbtPerson);

            // Tell the database to perform the deletion
            await _context.SaveChangesAsync();

            // Return a copy of the deleted data
            return Ok(lgbtPerson);
        }

        // Private helper method that looks up an existing lgbtPerson by the supplied id
        private bool LgbtPersonExists(int id)
        {
            return _context.LgbtPeople.Any(lgbtPerson => lgbtPerson.Id == id);
        }
    }
}

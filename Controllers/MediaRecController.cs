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
    // All of these routes will be at the base URL:     /api/MediaRec
    // That is what "api/[controller]" means below. It uses the name of the controller
    // in this case MediaRecController to determine the URL
    [Route("api/[controller]")]
    [ApiController]
    public class MediaRecController : ControllerBase
    {
        // This is the variable you use to have access to your database
        private readonly DatabaseContext _context;

        // Constructor that recives a reference to your database context
        // and stores it in _context for you to use in your API methods
        public MediaRecController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/MediaRec
        //
        // Returns a list of all your MediaRecs
        //
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MediaRec>>> GetMediaRecs()
        {
            // Uses the database context in `_context` to request all of the MediaRecs, sort
            // them by row id and return them as a JSON array.
            return await _context.MediaRecs.OrderBy(row => row.Id).ToListAsync();
        }

        // GET: api/MediaRec/5
        //
        // Fetches and returns a specific mediaRec by finding it by id. The id is specified in the
        // URL. In the sample URL above it is the `5`.  The "{id}" in the [HttpGet("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        [HttpGet("{id}")]
        public async Task<ActionResult<MediaRec>> GetMediaRec(int id)
        {
            // Find the mediaRec in the database using `FindAsync` to look it up by id
            var mediaRec = await _context.MediaRecs.FindAsync(id);

            // If we didn't find anything, we receive a `null` in return
            if (mediaRec == null)
            {
                // Return a `404` response to the client indicating we could not find a mediaRec with this id
                return NotFound();
            }

            //  Return the mediaRec as a JSON object.
            return mediaRec;
        }

        // PUT: api/MediaRec/5
        //
        // Update an individual mediaRec with the requested id. The id is specified in the URL
        // In the sample URL above it is the `5`. The "{id} in the [HttpPut("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        // In addition the `body` of the request is parsed and then made available to us as a MediaRec
        // variable named mediaRec. The controller matches the keys of the JSON object the client
        // supplies to the names of the attributes of our MediaRec POCO class. This represents the
        // new values for the record.
        //
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMediaRec(int id, MediaRec mediaRec)
        {
            // If the ID in the URL does not match the ID in the supplied request body, return a bad request
            if (id != mediaRec.Id)
            {
                return BadRequest();
            }

            // Tell the database to consider everything in mediaRec to be _updated_ values. When
            // the save happens the database will _replace_ the values in the database with the ones from mediaRec
            _context.Entry(mediaRec).State = EntityState.Modified;

            try
            {
                // Try to save these changes.
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                // Ooops, looks like there was an error, so check to see if the record we were
                // updating no longer exists.
                if (!MediaRecExists(id))
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
            return Ok(mediaRec);
        }

        // POST: api/MediaRec
        //
        // Creates a new mediaRec in the database.
        //
        // The `body` of the request is parsed and then made available to us as a MediaRec
        // variable named mediaRec. The controller matches the keys of the JSON object the client
        // supplies to the names of the attributes of our MediaRec POCO class. This represents the
        // new values for the record.
        //
        [HttpPost]
        public async Task<ActionResult<MediaRec>> PostMediaRec(MediaRec mediaRec)
        {
            // Indicate to the database context we want to add this new record
            _context.MediaRecs.Add(mediaRec);
            await _context.SaveChangesAsync();

            // Return a response that indicates the object was created (status code `201`) and some additional
            // headers with details of the newly created object.
            return CreatedAtAction("GetMediaRec", new { id = mediaRec.Id }, mediaRec);
        }

        // DELETE: api/MediaRec/5
        //
        // Deletes an individual mediaRec with the requested id. The id is specified in the URL
        // In the sample URL above it is the `5`. The "{id} in the [HttpDelete("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMediaRec(int id)
        {
            // Find this mediaRec by looking for the specific id
            var mediaRec = await _context.MediaRecs.FindAsync(id);
            if (mediaRec == null)
            {
                // There wasn't a mediaRec with that id so return a `404` not found
                return NotFound();
            }

            // Tell the database we want to remove this record
            _context.MediaRecs.Remove(mediaRec);

            // Tell the database to perform the deletion
            await _context.SaveChangesAsync();

            // Return a copy of the deleted data
            return Ok(mediaRec);
        }

        // Private helper method that looks up an existing mediaRec by the supplied id
        private bool MediaRecExists(int id)
        {
            return _context.MediaRecs.Any(mediaRec => mediaRec.Id == id);
        }
    }
}

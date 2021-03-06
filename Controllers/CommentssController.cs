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
    // All of these routes will be at the base URL:     /api/Commentss
    // That is what "api/[controller]" means below. It uses the name of the controller
    // in this case CommentssController to determine the URL
    [Route("api/[controller]")]
    [ApiController]
    public class CommentssController : ControllerBase
    {
        // This is the variable you use to have access to your database
        private readonly DatabaseContext _context;

        // Constructor that recives a reference to your database context
        // and stores it in _context for you to use in your API methods
        public CommentssController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/Commentss
        //
        // Returns a list of all your Comments
        //
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Comment>>> GetComments()
        {
            // Uses the database context in `_context` to request all of the Comments, sort
            // them by row id and return them as a JSON array.
            return await _context.Comments.OrderBy(row => row.Id).ToListAsync();
        }

        // GET: api/Commentss/5
        //
        // Fetches and returns a specific comment by finding it by id. The id is specified in the
        // URL. In the sample URL above it is the `5`.  The "{id}" in the [HttpGet("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        [HttpGet("{id}")]
        public async Task<ActionResult<Comment>> GetComment(int id)
        {
            // Find the comment in the database using `FindAsync` to look it up by id
            var comment = await _context.Comments.FindAsync(id);

            // If we didn't find anything, we receive a `null` in return
            if (comment == null)
            {
                // Return a `404` response to the client indicating we could not find a comment with this id
                return NotFound();
            }

            //  Return the comment as a JSON object.
            return comment;
        }

        // PUT: api/Commentss/5
        //
        // Update an individual comment with the requested id. The id is specified in the URL
        // In the sample URL above it is the `5`. The "{id} in the [HttpPut("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        // In addition the `body` of the request is parsed and then made available to us as a Comment
        // variable named comment. The controller matches the keys of the JSON object the client
        // supplies to the names of the attributes of our Comment POCO class. This represents the
        // new values for the record.
        //
        [HttpPut("{id}")]
        public async Task<IActionResult> PutComment(int id, Comment comment)
        {
            // If the ID in the URL does not match the ID in the supplied request body, return a bad request
            if (id != comment.Id)
            {
                return BadRequest();
            }

            // Tell the database to consider everything in comment to be _updated_ values. When
            // the save happens the database will _replace_ the values in the database with the ones from comment
            _context.Entry(comment).State = EntityState.Modified;

            try
            {
                // Try to save these changes.
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                // Ooops, looks like there was an error, so check to see if the record we were
                // updating no longer exists.
                if (!CommentExists(id))
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
            return Ok(comment);
        }

        // POST: api/Commentss
        //
        // Creates a new comment in the database.
        //
        // The `body` of the request is parsed and then made available to us as a Comment
        // variable named comment. The controller matches the keys of the JSON object the client
        // supplies to the names of the attributes of our Comment POCO class. This represents the
        // new values for the record.
        //
        [HttpPost]
        public async Task<ActionResult<Comment>> PostComment(Comment comment)
        {
            // Indicate to the database context we want to add this new record
            _context.Comments.Add(comment);
            await _context.SaveChangesAsync();

            // Return a response that indicates the object was created (status code `201`) and some additional
            // headers with details of the newly created object.
            return CreatedAtAction("GetComment", new { id = comment.Id }, comment);
        }

        // DELETE: api/Commentss/5
        //
        // Deletes an individual comment with the requested id. The id is specified in the URL
        // In the sample URL above it is the `5`. The "{id} in the [HttpDelete("{id}")] is what tells dotnet
        // to grab the id from the URL. It is then made available to us as the `id` argument to the method.
        //
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteComment(int id)
        {
            // Find this comment by looking for the specific id
            var comment = await _context.Comments.FindAsync(id);
            if (comment == null)
            {
                // There wasn't a comment with that id so return a `404` not found
                return NotFound();
            }

            // Tell the database we want to remove this record
            _context.Comments.Remove(comment);

            // Tell the database to perform the deletion
            await _context.SaveChangesAsync();

            // Return a copy of the deleted data
            return Ok(comment);
        }

        // Private helper method that looks up an existing comment by the supplied id
        private bool CommentExists(int id)
        {
            return _context.Comments.Any(comment => comment.Id == id);
        }
    }
}

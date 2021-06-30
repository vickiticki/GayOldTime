using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace GayOldTime
{
    public class LgbtPerson
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        // [Required]
        // public string Birthdate { get; set; }

        [Required]
        public int BirthYear { get; set; }

        public string Birthday { get; set; }

        [Required]
        public string Deathdate { get; set; }

        [Required]
        public string Country { get; set; }

        public string Biography { get; set; }

        public List<MediaRec> MediaRecs { get; set; }

        // I'll figure this out later
        // public List<Comment> Comments { get; set; }

        //user
        public int UserId { get; set; }

        //photo
        public string PhotoUrl { get; set; }

        public string Maker { get; set; }

        public string LastUpdater { get; set; }

    }
}
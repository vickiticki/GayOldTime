using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace GayOldTime
{
    public class Comment
    {
        public int Id { get; set; }

        public string Body { get; set; }

        public int LgbtPersonId { get; set; }

        public int UserId { get; set; }

    }
}
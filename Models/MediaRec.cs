using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace GayOldTime
{
    public class MediaRec
    {
        public int Id { get; set; }
        public string Item { get; set; }

        public bool fiction { get; set; }

        public int PersonId { get; set; }


    }
}
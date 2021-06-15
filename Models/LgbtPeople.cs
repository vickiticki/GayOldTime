using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

public class LgbtPeople
{
    public int Id { get; set; }

    [Required]
    public string Name { get; set; }

    [Required]
    public string Birthdate { get; set; }

    [Required]
    public string Deathdate { get; set; }

    public string country { get; set; }

}
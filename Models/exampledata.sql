TRUNCATE TABLE "LgbtPeople", "MediaRecs" RESTART IDENTITY;


INSERT INTO "LgbtPeople" ("Name", "BirthYear", "Birthday", "Deathdate", "Country", "Biography") VALUES ('Alexander the Great', -356, '07-20', '323-06-10 BCE', 'Greece', 'Alexander the Great was obsessed with Achilles. Total Achilles kin. His best friend was Bucephalus, his horse. His boyfriend was Hephaestion. He conquered a lot of land but died very young and with no obvious heir, so his kingdom was split up.');
INSERT INTO "LgbtPeople" ("Name", "BirthYear", "Birthday", "Deathdate", "Country", "Biography") VALUES ('Julie d Aubigny', 1670, '01-01', '1707-01-01', 'France', 'Julie was one of the coolest women to ever live. She was a bisexual opera singer and fencer. She married young but then hit the road, earning a living singing and fencing. At one point she joined a convent and set it on fire to free her love. She was exiled a couple times.');
INSERT INTO "LgbtPeople" ("Name", "BirthYear", "Birthday", "Deathdate", "Country", "Biography") VALUES ('Leonardo da Vinci', 1452, '04-15', '1519-05-02', 'Italy', 'Obviously I had to include Leonardo. He was a bastard son of a peasant and became one of the most famous artists. He had unlimited confidence and beautiful hair. He painted but was also an inventor, engineer, anatomist, and more. He was obsessed with birds. Salai is a treasure.');
INSERT INTO "LgbtPeople" ("Name", "BirthYear", "Birthday", "Deathdate", "Country", "Biography") VALUES ('Oscar Wilde', 1854, '10-16', '1900-11-30', 'Ireland', 'Oscar was born and grew up. He studied classics. He wrote some plays. Then he met Lord Alfred Douglas and got into a fight with Queenberry, the father of Douglas. Oscar should have left it alone but instead he sued him and things did not go his way and Oscar went to jail. The End.');
INSERT INTO "LgbtPeople" ("Name", "BirthYear", "Birthday", "Deathdate", "Country", "Biography") VALUES ('Salai', 1480, '01-01', '1524-03-01', 'Italy', 'Gian Giacomo Caprotti da Oreno is better known as Salai. He was Leonardos student and probably lover and a spoiled little shit. I love him so much. He loved to wear fancy clothes and eat anise candy. He died in a duel.');

INSERT INTO "MediaRecs" ("Item", "fiction", "PersonId", "LgbtPersonId") VALUES ('Assassins Creed 2', true, 3, 3);
INSERT INTO "MediaRecs" ("Item", "fiction", "PersonId", "LgbtPersonId") VALUES ('Assassins Creed Brotherhood', true, 5, 5);
INSERT INTO "MediaRecs" ("Item", "fiction", "PersonId", "LgbtPersonId") VALUES ('Leonardo da Vinci by Walter Isaacson', false, 3, 3);
INSERT INTO "MediaRecs" ("Item", "fiction", "PersonId", "LgbtPersonId") VALUES ('Rejected Princesses by Jason Porath', false, 2, 2);
INSERT INTO "MediaRecs" ("Item", "fiction", "PersonId", "LgbtPersonId") VALUES ('Ikemen Vampire', true, 3, 3);

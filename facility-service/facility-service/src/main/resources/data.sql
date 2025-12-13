-- sample data for facilities and equipment
INSERT IGNORE INTO facility (name, description, capacity) VALUES ('Sala A','Sala principal de reuniones',20);
INSERT IGNORE INTO facility (name, description, capacity) VALUES ('Sala B','Sala secundaria',8);

-- equipment linked to facility id 1
INSERT IGNORE INTO equipment (name, description, facility_id) VALUES ('Proyector','Proyector HD',1);
INSERT IGNORE INTO equipment (name, description, facility_id) VALUES ('Pizarra','Pizarra blanca',1);
INSERT INTO facility (name, description, capacity) VALUES
('Sala A','Sala principal con 30 sillas',30),
('Sala B','Sala de reuniones pequeña',8);

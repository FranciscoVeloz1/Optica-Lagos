create database optica;
use optica;

create table user(
    id_user int primary key auto_increment,
    user varchar(50),
    fullname varchar(50),
    email varchar(50),
    password varchar(250),
    role varchar(50)
);

--Creacion de tablas
create table pacientes
(
    id_paciente int primary key auto_increment,
    nombre varchar(100),
    apellidop varchar(100),
    apellidom varchar(100),
    edad int,
    direccion varchar(200),
    colonia varchar(100),
    telefono varchar(100),
    fecha varchar(100)
);

create table antecedentes
(
    id_antecedente int primary key auto_increment,
    fk_paciente int,
    diabetes varchar(3),
    hipertension varchar(3),
    otro varchar(100),
    tiempo varchar(100),
    lentes varchar(3),
    derecho varchar(10),
    izquierdo varchar(10),
    adiacion varchar(10),
    foreign key(fk_paciente) references pacientes(id_paciente)
);

create table orden
(
    id_orden int primary key auto_increment,
    fecha varchar(100),
    fk_paciente int,
    derecho varchar(100),
    izquierdo varchar(100),
    addp varchar(100),
    material varchar(100),
    entrega varchar(100),
    precio varchar(100),
    anticipo varchar(100),
    saldo varchar(100),
    foreign key(fk_paciente) references pacientes(id_paciente)
);

--Vistas
drop view v_antePaciente;
create view v_antePaciente as 
select a.id_antecedente, p.id_paciente, p.nombre, a.diabetes, a.hipertension, a.otro, a.tiempo, a.lentes, a.derecho, a.izquierdo, a.adiacion
from antecedentes a, pacientes p
where a.fk_paciente = p.id_paciente;

drop view v_ordenpaciente;
create view v_ordenpaciente as 
select o.id_orden, o.fecha, p.id_paciente, p.nombre, o.derecho, o.izquierdo, o.addp, o.material, o.entrega, o.precio, o.anticipo, o.precio-o.anticipo as resta
from orden o, pacientes p
where o.fk_paciente = p.id_paciente;

drop view v_ventas;
create view v_ventas as
select o.id_orden, p.id_paciente, p.nombre, o.fecha, o.precio, o.anticipo, o.precio-o.anticipo as resta
from orden o, pacientes p
where o.fk_paciente = p.id_paciente;

drop view v_sumaprecio;
create view v_sumaprecio as
select SUM(precio) as suma from v_ordenpaciente
where resta = 0;
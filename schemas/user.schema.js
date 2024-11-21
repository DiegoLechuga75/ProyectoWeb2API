const Joi = require('joi');

const id_cliente = Joi.number().integer();
const nombre = Joi.string().max(255);
const correo = Joi.string().email();
const telefono = Joi.string().max(255);
const direccion = Joi.string().max(255);
const rol = Joi.string().valid("cliente", "admin");
const usuario = Joi.string().max(255);
const contrasena = Joi.string().min(8);

const createUserSchema = Joi.object({
    nombre: nombre.required(),
    correo: correo.required(),
    contrasena: contrasena.required(),
    telefono: telefono.required(),
    direccion: direccion.required(),
    rol: rol.required(),
    usuario: usuario.required(),
});

const updateUserSchema = Joi.object({
    nombre,
    correo,
    contrasena,
    telefono,
    direccion,
    rol,
    usuario,
});

const getUserSchema = Joi.object({
    id_cliente: id_cliente.required(),
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema };

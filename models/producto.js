const { Schema, model } = require('mongoose');

const ProductoSchema = Schema({
    nombre: {
        type: String,
        required: [true,'El nombre es obligatorio'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: [true,'El estado es obligatorio']
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: [true,'El Usuario es obligatorio']
    },
    precio: {
        type: Number,
        default: 0,
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: [true,'La Categoria es obligatoria']
    },
    descripcion: {
        type: String
    },
    disponible: {
        type: Boolean,
        default: true
    },
    img: {
        type: String
    }
});

// Remover campos para la respuesta
ProductoSchema.methods.toJSON = function() {
    const { __v, estado, _id, ...data } = this.toObject();
    data.pid = _id;
    return JSON.parse(JSON.stringify(data));
};

module.exports = model('Producto', ProductoSchema);
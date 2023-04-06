const { Schema, model } = require('mongoose');

const CategoriaSchema = Schema({
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
});

// Remover campos para la respuesta
CategoriaSchema.methods.toJSON = function() {
    const { __v, estado, _id, ...data } = this.toObject();
    data.cid = _id;
    return JSON.parse(JSON.stringify(data));
};

module.exports = model('Categoria', CategoriaSchema);
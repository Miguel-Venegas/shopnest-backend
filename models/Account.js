const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    businessName: {type: String, required: true}
}, { versionKey: false });

accountSchema.virtual('products', {
    ref: 'Product',
    localField: '_id',
    foreignField: 'account'
});

accountSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
    }
});


module.exports = mongoose.model('Account', accountSchema);
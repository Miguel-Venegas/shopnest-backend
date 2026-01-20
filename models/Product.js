const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {

        account: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Account',
            required: true,
            index: true
        },

        name: {
            type: String,
            required: [true, 'Product name is required'],
            trim: true,
            minlength: [2, 'Name must be at least 2 characters'],
            maxlength: [100, 'Name is too long'],
        },

        price: {
            type: Number,
            required: [true, 'Price is required'],
            min: [0, 'Price cannot be negative'],
        },

        description: {
            type: String,
            required: true,
            trim: true,
            maxlength: 500,
        },

        imageUrl: {
            type: String,
            required: true,
            match: [/^https?:\/\//, 'Image must be a valid URL'],
        },

        stockQuantity: {
            type: Number,
            required: true,
            min: [0, 'Stock cannot be negative'],
        },
    },
    { timestamps: true, versionKey: false }
);

productSchema.virtual('inStock').get(function () {
    return this.stockQuantity > 0;
});



productSchema.set('toJSON', {
    transform: (doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
    }
});


module.exports = mongoose.model('Product', productSchema);
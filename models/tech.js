`use strict`

let mongoose = require(`mongoose`);
let Schema = mongoose.Schema;
let TechSchema = new Schema({
    section: {
        type: String
    },
    items: {
        type: [{
            name: {
                type: String
            },
            value: {
                type: Number,
                default: 0
            }
        }]
    }
});

mongoose.model(`tech`, TechSchema);

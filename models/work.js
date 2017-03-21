`use strict`

let mongoose = require(`mongoose`);
let WorkSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, `Укажите имя проекта`]
    },
    tech: {
        type: String,
        required: [true, `Укажите используемые технологии`]
    },
    link: {
        type: String,
        required: [true, `Укажите ссылку на проект`]
    },
    pictures: {
        type: [String]
    }
});

mongoose.model(`work`, WorkSchema);

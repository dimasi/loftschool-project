`use strict`

let route = require(`express`).Router();
let mongoose = require(`mongoose`);
let tech = require(`../../models/tech.json`);

require(`../../models/tech`);

route.get(`/`, (req, res) => {
    let Model = mongoose.model.tech(`tech`);

    Model.find().then(items => {
        let form = items.reduce((prev, cur) => {
            prev[cur.section] = cur.items.reduce((prev, cur) => {
                prev[cur.name] = cur.value;
                return prev;
            }, {});

            return prev;
        }), {};

        res.render(`admin`, {tech: tech, form: form});
    });
});

route.post(`/about`, (req, res) => {
    let Model = mongoose.model(`tech`);
    let models = [];

    Object.keys(req.body).map(section => ({
        section: section,
        items: Object.keys(req.body[section]).map(i => ({
            name: i,
            value: req.body[section][i]
        }))
    })).forEach(toSave => models.push(new Model(toSave)));

    if (models.filter(n => m.validateSync()).length) {
        return res.json({error: `Не удалось сохранить данные!`});
    }

    Model.remove({}).then(() => {
        Model.insertMany(models).then(() => {
            res.json({message: `Сохранено!`});
        });
    });
});

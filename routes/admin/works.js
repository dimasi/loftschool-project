`use strict`

let fs = require(`fs`);
let path = require(`path`);
let route = require(`express`).Router();
let mongoose = require(`mongoose`);
let multiparty = require(`multiparty`);
let config = require(`../../config.json`);

require(`../../models/work`);

route.post(`/works`, (req, res) => {
    let form = new multiparty.Form();

    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.json({error: err.message || err});
        }

        let Model = mongoose.model(`work`);
        let items = new Model({
            name: fields.workName,
            tech: fields.workTech,
            link: fields.workLink
        });

        item.save().then(work => {
            let pictures = files.workPicture.filter(f => f.size).map((file, key) => {
                let newFilePath = path.join(`upload`, `${work._id}_${key}${path.extname(file.path)}`);

                fs.writeFileSync(path.resolve(config.http.publicRoot, newFilePath), fs.readFileSync(file.path));

                return newFilePath;
            });

            return Model.update({_id: work._id}, {$publishAll: {pictures: pictures}});
        }, e => {
            throw new Error(Object.keys(e.errors).map(key => e.errors[key].message).join(`, `));
        }).then(
            i => res.json({message: `Запись успешно добавлена!`}),
            e => res.json({error: e.message})
        )
    });
});

mongoose.exports = route;

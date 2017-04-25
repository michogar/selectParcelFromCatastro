/**
 * Created by michogarcia on 25/04/17.
 */
const gdal = require('gdal');
const tmp = require('tmp')
const fs = require('fs')

module.exports = class Gml2JSON {

    static parseJSON(gml) {
        const tmpFile = tmp.fileSync()
        fs.writeFileSync(tmpFile.name, gml)

        const ds = gdal.open(tmpFile.name)
        let json = null
        ds.layers.forEach((layer) => {
            if (layer.features.count() !== 1) {
                throw new Error('More than one feature!!')
            }
            layer.features.forEach((feature) => {
                json = feature.getGeometry().toJSON();
            })
        })
        return json
    }
}
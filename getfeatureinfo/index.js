/**
 * Created by michogarcia on 22/04/17.
 */

const rp = require('request-promise-native');
const parseString = require('xml2js').parseString;
const Gml2JSON = require('../gml2json')

module.exports = class GetFeatureInfo {

    getGeometry(refcat) {

        const URL_WFS_CATASTRO = (refcat) => "http://ovc.catastro.meh.es/INSPIRE/wfsCP.aspx?" +
        "service=wfs&" +
        "version=2&" +
        "request=getfeature&" +
        "STOREDQUERIE_ID=GetParcel&" +
        `REFCAT=${refcat}&srsname=EPSG:25829`

        return new Promise((resolve, reject) => {
            rp(URL_WFS_CATASTRO(refcat)).then((result) => {
                resolve(Gml2JSON.parseJSON(result));
            }).catch(reject)
        })
    }

    getFeatureInfo(point, size, bbox) {

        const URL_WMS_CATASTRO = 'http://ovc.catastro.meh.es/Cartografia/WMS/ServidorWMS.aspx?'
        const params = {
            request: 'GetFeatureInfo',
            service: 'WMS',
            srs: 'EPSG:4326',
            version: '1.1.1',
            format: 'image/png',
            bbox: bbox,
            height: size.y,
            width: size.x,
            layers: 'Catastro',
            query_layers: 'Catastro',
            info_format: 'text/xml',
            x: point.x,
            y: point.y
        };

        const URL = URL_WMS_CATASTRO + Object.keys(params).map(function(key) {
                return key + '=' + params[key];
            }).join('&');

        return new Promise((resolve, reject) => {
            rp(URL).then((result) => {
                parseString(result, (err, result) => {
                    if (err) {
                        reject(err)
                    }
                    let refcat
                    try {
                        refcat  = result.html.body[0].p[1].a[0]._
                    } catch (err) {
                        reject(err)
                    }
                    this.getGeometry(refcat).then((geom) => {
                        resolve(geom)
                    }).catch(reject)
                });
            }).catch(reject)
        })

    }
}
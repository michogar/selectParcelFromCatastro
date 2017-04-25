/**
 * Created by michogarcia on 25/04/17.
 */

const expect = require('chai').expect
const fs = require('fs')
const path = require('path')
const Gml2JSON = require('../gml2json')

describe("GML2JSON Spec: ", () => {

    it("Should return a JSON after parse de GML", () => {
        const gml = fs.readFileSync(path.join(__dirname, 'assets/geom.xml'))
        const json = fs.readFileSync(path.join(__dirname, 'assets/geom.xml.geojson'), "utf-8")
        const jsonParsed = Gml2JSON.parseJSON(gml)

        expect(json).to.equal(jsonParsed)
    })
})
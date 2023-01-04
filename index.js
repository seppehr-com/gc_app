const { XMLParser, XMLBuilder, XMLValidator} = require("fast-xml-parser");
const fs = require('fs');

const inst = process.argv[2]=='g'?'Snare%g Ghost Stroke':'Snare%g Cross Stick'
const path = process.argv[3]

const findInstrument=(obj,name)=>{
    const instrument=obj.find(item => item['instrument-name']==name)
    if(!instrument)
        return false
    return instrument['@_id']
}

//run like this:
//gcapp.exe g './data/the-prodigy-breathe.musicxml'

if(path && inst) {
    fs.readFile(path , 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        const parser = new XMLParser({ignoreAttributes : false});
        let mObj = parser.parse(data);
        let instruments = mObj['score-partwise']['part-list']['score-part']['score-instrument']
    
        const str=findInstrument(instruments,inst)
        console.log(str)
    });
}
else {
    console.log('Invalid Args!')
}
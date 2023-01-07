const fs = require('fs');
const RegexClass=require('./src/RegexClass')

const path = process.argv[2]
const save = process.argv[3]

if(path){
    fs.readFile(path , 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        let regex=new RegexClass(data)
    
        //Tempo Fix!
        regex.tempoFix(logg=>{
            console.log(logg)
        })
    
        //Equal Mark Fix!
        regex.equalFix(logg=>{
            console.log(logg)
        })
    
        //Convert Words to Rehearsal!
        regex.wordsToRehearsal(logg=>{
            console.log(logg)
        })
        
        fs.writeFile(save?save:path,regex.xml,()=>{
            console.log('Done!')
        })
    })
}
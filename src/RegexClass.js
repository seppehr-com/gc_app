class RegexClass{
    constructor(data){
        this.xml=data
        this.tempo=this.getTempo()
    }

    getTempo(){
        const reg=/<credit-words.*>(?<tempo>([0-9]*)).*?bpm.*<\/credit-words>/g
        for (const match of this.xml.matchAll(reg)) {
            console.log(`tempo = ${match.groups.tempo} `);
            return match.groups.tempo
        }
    }
    tempoFix(callback){
        const reg=/<sound.*(tempo=).*\/>/g
        const replace=`<sound tempo="${this.tempo}" />`
        this.xml=this.xml.replace(reg,replace)

        callback(this.xml.match(reg))
    }
    equalFix(callback){
        const reg=/<words.*(valign="top").*>([a-zA-Z0-9\=\- ]*)(.|[\r\n])?<\/words>/g
        const replace=""
        callback(this.xml.match(reg))
        
        this.xml=this.xml.replace(reg,replace)
    }
    wordsToRehearsal(callback){
        const reg = /<words(?<attribiutes>.*(font-weight).*)>(?<value>([a-zA-Z0-9\- ]*))(.|[\r\n])?<\/words>/gm
        const replace = "<rehearsal $<attribiutes>>$<value></rehearsal>"
        callback(this.xml.match(reg)) 
        
        this.xml=this.xml.replace(reg,replace)
    }
}

module.exports = RegexClass
function methodType( text , fn , returnType ){
    let definitionParams = text.slice( text.split('(')[0].length + 1 , -1).replace('))',')').split(' ').join('')
    let typesParams = ''
    definitionParams = definitionParams.split(',')
        .filter( i => i.split('($').length > 1)
        .join(',')
    definitionParams
        .split(',')
        .forEach( i => {
            let def = i.split('=($')
            if( def.length > 1) {
                def[1] = def[1].split(')')[0]
                typesParams+=`\n\r${def[0]}=$${def[1]}(${def[0]})`
            }
        })
    if(typesParams) return typesParams
    return ''
}


const typed = ( fn , returnType ) => {
    let text = fn.toString()
    if(text.search('class') == 0){
        let add = ''
        let classText = text.split('{').map( (item,index) => {
            item += '{'
            if( item.split('=($').length > 1) {
                add = methodType( item , fn , returnType )
            }
            
            if(add) {
                item += add
                add = ''
            }
            return item
        })
        // global
        // eval('global.'+text.split(' ')[1].split('{')[0]+'='+ classText.join('').slice(0,-1) )

        // local
        let newClass
        eval('newClass='+ classText.join('').slice(0,-1) )
        return newClass
    }
    let fnText = methodType( text )
    fnText = text.replace('{' , '{\n'+fnText)
    let newClass
    eval('newClass='+ fnText )
    return newClass
    // return paramsType( text , fn , returnType )
}
export default typed
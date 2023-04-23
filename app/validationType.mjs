import Joi from "joi";

export const T = Joi

const isJoiType = definitionType => {
    return (definitionType['$_root'] != undefined)
}

const testTypeJoi = evalData => {
    try {            
        T.assert( evalData , definitionType )
    } catch (error) {
        throw error
    }
    return evalData
}

function testNotJoi( definitionType ){
    // is object 
    let keys = Object.keys(definitionType)
    let keysAll = keys
    let types = {}
    for(let key of keys){
        if(definitionType[key]['$_root'] == undefined){
            let schemaCustom = definitionType[key]
            delete definitionType[key]
            let _key = key.replace('?','')
            if(Array.isArray( schemaCustom )){
                schemaCustom = schemaCustom[0]
                types[_key] = v => {
                    if( Array.isArray( v ) ){
                        if(key.split('?').length == 1) v.forEach( i => schemaCustom( i ) )
                    }else schemaCustom( v )
                }
                definitionType[_key] = (key.split('?').length == 2) ? Joi.array().allow([]).required() : Joi.array().required()
            }else{
                types[_key] = schemaCustom
                definitionType[_key] = (key.split('?').length == 2) ? Joi.object().allow([]).required() : Joi.object().required()
            }
        }else{
            if(key.split('?').length == 2) {
                definitionType[key.replace('?','')] = definitionType[key].allow(null)
                delete definitionType[key]
            }else {
                definitionType[key] = definitionType[key].required()
            }
        }
    }
    keys = Object.keys(definitionType)
    let schema = Joi.compile([ definitionType ])
    return ( evalData ) => {
        if(evalData == '@types') return types
        if(evalData == '@keys') return keys
        if(evalData == '@all') return keysAll
        Joi.assert( evalData , schema )
        return evalData
    }
}

const inspectIsType = ( definitionType ) => {
    // is not object or primitive
    if( isJoiType( definitionType ) ){
        return testTypeJoi( definitionType )
    }
    return testNotJoi( definitionType )
}

export default inspectIsType
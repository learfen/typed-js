import Joi from "joi"
import './parseFunctionTyped.mjs'

let keyValue = Symbol('value')
function createObject(typeDefined) {
    for (let key in typeDefined) {
        if (typeDefined[key]['$_root']) {
            typeDefined[key] = typeDefined[key].required()
        } else {
            typeDefined[key] = typeDefined[key]('@schema').required()
        }
    }
    typeDefined = Joi.object(typeDefined)
    return value => {
        if (value == '@schema') return typeDefined
        try {
            for (let key in value) {
                value[key] = value[key][keyValue] ? value[key][keyValue]() : value[key]
            }
            Joi.assert(value, typeDefined)

            let typeCreated = new Proxy(value, {
                set(target, key, value) {
                    try {
                        Joi.assert({ ...target, [key]: value }, typeDefined)
                        Reflect.set(target, key, value)
                    } catch (error) {
                        console.log('No se actualizo ', key, '>', value, '. Validación de tipo fallida. ', error)
                        throw error
                    }
                    return target
                }
            })
            Object.preventExtensions(typeCreated)
            return typeCreated
        } catch (error) {
            console.log('Error de tipos', error)
            throw error
        }
    }
}

function createPrimitive(typeDefined) {
    let data = null
    return value => {
        if (value == '@schema') return typeDefined
        try {
            Joi.assert({ value }, Joi.object({ value: typeDefined }))
            data = value
            let obj = {
                set(newValue) {
                    try {
                        Joi.assert({ value: newValue }, Joi.object({ value: typeDefined }))
                        data = newValue
                        obj.value = data
                    } catch (error) {
                        throw error
                    }
                }
                , value
                , [keyValue]() { return data }
                , [Symbol.toPrimitive](hint) {
                    if (hint === "object") {
                        return data
                    }
                    if (hint === "number") {
                        return data
                    }
                    if (hint === "string") {
                        if (typeDefined.type == 'number') return +data
                        return data
                    }
                    if (hint === "default") {
                        if (typeDefined.type == 'number') return +data
                        if (typeDefined.type == 'string') return data
                        if (typeDefined.type == 'object') return obj
                        return data
                    }
                    return obj
                }
            }
            return new Proxy(obj, {
                get(target, key) {
                    if (key != 'value') return target[key]
                    return target
                }
                , set(target, key, value) {
                    try {
                        Joi.assert({ value: value }, Joi.object({ value: typeDefined }))
                        data = value
                        target.value = data
                        return target
                    } catch (error) {
                        throw error
                    }
                }
            })
        } catch (error) {
            // console.log('Error de tipos' , error)
            throw error
        }
    }
}

export function create(typeDefined) {
    if (typeDefined['$_root']) {
        return createPrimitive(typeDefined)
    }
    return createObject(typeDefined)
}

export function install(types) {
    for (let type in types) {
        global[type] = types[type]
    }
}

export default { create , install }
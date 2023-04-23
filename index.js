'use strict'
import Joi from "joi"

const setObject = (target, key, value) => {
    let newValue = { ...target }
    newValue[key] = value
    let validation = target.validation(newValue)
    if (validation === true)
        target[key] = value
    else throw validation
    return target
}
const setPrimitive = (target, key, value) => {
    console.log(target, key, value)
    try {
        let validation = target.validation(value)
        if (validation === true)
            target[valueKey] = value
        return target
    } catch (error) {
        throw error
    }
}

const valueKey = Symbol.for('value')

class TypePrimitive {
    constructor(schema) {
        this.schema = schema
    }
    validation(value) {
        console.log('primitive ', value)
        try {
            Joi.assert(value[valueKey], this.schema)
            return true
        } catch (error) {
            return error
        }
    }
    start(obj, data) {
        let validation = this.validation(data)
        if (validation !== true)
            throw validation
        else {
            obj[valueKey] = data
        }
        return new Proxy(obj, {
            set(target, key, value) {
                return setPrimitive(target, key, value)
            },
            get(target) {
                return target[valueKey]
            }
        })
    }
}

class Type {
    constructor(schema) {
        this.schema = schema
    }
    validation(value) {
        try {
            Joi.assert(value, this.schema)
            return true
        } catch (error) {
            return error
        }
    }
    start(obj, data) {
        let validation = this.validation(data)
        if (validation !== true)
            throw validation
        else {
            for (let key in data) {
                obj[key] = data[key]
            }
        }
        return new Proxy(obj, {
            set(target, key, value) {
                return setObject(target, key, value)
            },
            get(target, key) {
                if (key != undefined)
                    return target[key]
                return target
            }
        })
    }
}

function $number() {
    return Joi.number().min(1).max(20)
}
function $object() {
    return Joi.object()
}
function $string() {
    return Joi.string()
}

function $user(value = ({ id: $number, username: $string })) {
    class User extends Type {
        constructor() {
            super($object({
                id: $number(),
                username: $string()
            }))
        }
    }
    let obj = new User(value)
    let proxy = obj.start(obj, value)
    return proxy
}
function newPrimitive(value) {
    return {
        value(data) {
            try {
                this[valueKey] = this.validation(data)
            } catch (error) {
                console.log(error)
            }
            return this
        },
        [valueKey]: value,
        [Symbol.toPrimitive](hint) {
            if (hint === "number") {
                return this.number()
            }
            if (hint === "string") {
                return this.string()
            }
            if (hint === "default") {
                return this.default()
            }
            return this
        }
    }
}
function validationUserId(value) {
    Joi.assert(value, Joi.number().min(0).max(10))
    return value
}

function $userId(value=($number)) {
    let primitive = newPrimitive(value)
    primitive.validation = validationUserId
    primitive.number = function () { return +this[valueKey] }
    primitive.default = function () { return +this[valueKey] }
    return primitive
}

function typeObject() {
    const n = $user({ username: 'learfen', id: 1 })
    n.username = 'da'
    console.log(n)
}
function primitive() {
    // tipo telefono <number>
    // inicializacion de la variable
    const n1 = $userId(547128913)
    n1.value(12)
}
function main() {
    //typeObject()
    primitive()
}
main()

import Joi from "joi"
import { create , install } from "./app/typed/createType.mjs"

const $userName = create(Joi.string().alphanum().min(3).max(20))
const $legajo = create(Joi.number().min(1))

const $user = create({
    name: $userName,
    email: Joi.string().email(),
    password: Joi.string().min(6).max(20)
})


const $student = create({
    legajo: $legajo,
    user: $user
})

install({
    $userName
    , $legajo
    , $user
    , $student
})
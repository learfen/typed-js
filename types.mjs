import Joi from "joi"
import { create , install } from "./index.js"

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
const $studentAlternative = create({
    legajo: $legajo
})

install({
    $userName
    , $legajo
    , $user
    , $student
    , $studentAlternative
})
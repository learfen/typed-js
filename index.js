import Joi from "joi"
import typed from "./app/typed/createType.mjs"

export const create = typed.create 
export const install = typed.install 
export const typed = typed.typed 

export default { create , install , typed }

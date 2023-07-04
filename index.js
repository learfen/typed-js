import typedCreate from "./app/typed/createType.mjs"
export const create = typedCreate.create 
export const install = typedCreate.install 
export const typed = global.typed
export const Joi = typedCreate.Joi
export default { create , install , typed , Joi:typedCreate.Joi}

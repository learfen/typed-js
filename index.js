import typedCreate from "./app/typed/createType.mjs"
export const create = typedCreate.create 
export const install = typedCreate.install 
export const typed = global.typed
export default { create , install , typed }

import typed from "./app/typed/createType.mjs"
export const create = typed.create 
export const install = typed.install 

export default { create , install , typed:global.typed }

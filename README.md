# typed-js
add typed in js, import index file

## How install type, install as global in file ./types.mjs
	install({
		$userName
		, $legajo
	})

## Create primitive (string-number): new type, create in file ./types.mjs
	const $userName = create(Joi.string().alphanum().min(3).max(20))
	const $legajo = create(Joi.number().min(1))

How update primitive

	const folder = $legajo(9)
	// update by set
	folder.set(2)
	// or 
	folder.value = 3

Primitives (number or string) work normally

	console.log( folder + 20 )

## Create object: new type, create in file ./types.mjs
	const $user = create({
		name: $userName,
		email: Joi.string().email(),
		password: Joi.string().min(6).max(20)
	})

## Create function or class: new type, create in fiel ./types.mjs
Validation call

	const updateName = typed(function updateName(name = ($userName), age = ($legajo)) {
			console.log(name , legajo)
		}
	)
	console.log( updateName('Daniel' , 30) )

Validation instance and update

	const classPerson = typed(class {
		constructor(name = ($userName)) {
			this.name = name
		}
		updateName(name = ($userName), age = ($legajo)) {
			this.name = name
			this.age = age
			console.log(this.name)
		}
	})

	let newObjectPerson = new classPerson('daniel')

Try using invalid parameters

	newObjectPerson.updateName('daniel2', 12)
import './types.mjs'
let failTest = []
let successTest = []
console.log('\n\n\n\n --------------- STRING UPDATED TEST --------------------')

// example primitive create string
let daniel = $userName('daniel')
// test get primitive string
if (daniel + ' 1 ' == 'daniel 1 ')
    successTest.push(' :) get primitive as string')
else
    failTest.push(' :( ', 'STRING GET TEST: get as primitive string = ' + daniel)
// option 1: update primitive 
daniel.value = 'Daniel'
// test get primitive after update 
if (daniel + ' 2 ' == 'Daniel 2 ')
    successTest.push(' :) updated by .value')
else
    failTest.push(' :( ', 'STRING UPDATED TEST: updated by .value = ' + daniel)
// view instance
console.log(daniel)

console.log('\n\n\n\n --------------- NUMBER UPDATED TEST --------------------')
// example primitive create number
let codeDaniel = $legajo(1)
// test get primitive string
if (codeDaniel + 1 == 2)
    successTest.push(' :) get as primitive number')
else failTest.push('NUMBER UPDATED TEST: :( ', ' add 1 ')
// option 2: update primitive
codeDaniel.set(2)
// test get primitive after update 
if (codeDaniel + 1 == 3)
    successTest.push(' :) updated primitive as .set(2)')
else failTest.push(' :( ', 'NUMBER UPDATED TEST: updated by .set( 2 ) ')
// view instance
console.log(codeDaniel)


console.log('\n\n\n\n --------------- USE TYPED PRIMITIVE INSTANCE IN OBJECT TEST --------------------')
let user
console.log('\nExample valid value ')
try {
    user = $user({
        name: daniel,
        email: 'daniel@gmail.com',
        password: '123456'
    })
    successTest.push(' :) USE TYPED PRIMITIVE INSTANCE IN OBJECT')
} catch (error) {
    failTest.push('USE TYPED PRIMITIVE INSTANCE IN OBJECT TEST: :( fail object create eval ')
}

console.log('\nExample invalid value ')
try {
    user = $user({
        name: daniel,
        email: 'daniel@gmail.com',
        password: '1236'
    })
    failTest.push('USE TYPED PRIMITIVE INSTANCE IN OBJECT TEST: :( fail object create eval ')
} catch (error) {
    successTest.push(' :) USE TYPED PRIMITIVE INSTANCE IN OBJECT TEST ')
}

console.log('\n\n\n\n --------------- USE TYPED OBJECT INSTANCE IN OBJECT TEST --------------------')
let student = $student({
    legajo: 1,
    user
})
// created
console.log(user)
console.log(student)
// updated
daniel.set('daniel2')
console.log('nuevo nombre ' + daniel)
console.log(user)



console.log('\nExample valid value ')
try {
    user.password = 'dani1234'
    successTest.push(' :) USE TYPED OBJECT INSTANCE IN OBJECT TEST ')
} catch (error) {
    failTest.push('USE TYPED OBJECT INSTANCE IN OBJECT TEST: :( fail function eval ')
}

console.log('\nExample invalid value ')
try {
    user.password = 'da'
    failTest.push('USE TYPED OBJECT INSTANCE IN OBJECT TEST: :( fail function eval ')
} catch (error) {
    successTest.push(' :) USE TYPED OBJECT INSTANCE IN OBJECT TEST ')
}

console.log('\n\n\n\n --------------- ARROW FUNCTION INSTANCE IN OBJECT TEST --------------------')
const $saveUserName = typed((name=($userName)) => {
    return name
})

console.log('\nExample valid value ')
try {
    $saveUserName('laura')
    successTest.push(' :) ARROW FUNCTION INSTANCE IN OBJECT TEST eval params ')
} catch (error) {
    failTest.push('ARROW FUNCTION INSTANCE IN OBJECT TEST: :( fail function eval ')
}

console.log('\nExample invalid value ')
try {
    $saveUserName('da')
    failTest.push('ARROW FUNCTION INSTANCE IN OBJECT TEST: :( fail function eval ')
} catch (error) {
    successTest.push(' :) ARROW FUNCTION INSTANCE IN OBJECT TEST eval params ')
}

console.log('\n\n\n\n --------------- FUNCTION INSTANCE IN OBJECT TEST --------------------')
const $saveUserId = typed(function (name=($legajo)) {
    return name
})
console.log('\nExample valid value ')
try {
    console.log($saveUserId(1))
    successTest.push(' :) FUNCTION INSTANCE IN OBJECT TEST eval params ')
} catch (error) {
    failTest.push('FUNCTION INSTANCE IN OBJECT TEST: :( fail function eval ')
}

console.log('\n\nExample invalid value ')
try {
    console.log($saveUserId(0))
    failTest.push('FUNCTION INSTANCE IN OBJECT TEST: :( fail function eval ')
} catch (error) {
    successTest.push(' :) FUNCTION INSTANCE IN OBJECT TEST eval params ')
}


console.log('\n\n\n\n --------------- CLASS TEST --------------------')
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
console.log(newObjectPerson)

newObjectPerson.updateName('daniel2', 12)
console.log("what's your name?",newObjectPerson.name)

const updateName = typed(function updateName(name = ($userName), age = ($legajo)) {
        this.name = name
        this.age = age
        console.log(this.name)
    }
)
console.log( updateName )





console.log('\n\n\n\n --------------- ALTERNATIVE KEY TEST --------------------')
let studentAlternative = $studentAlternative({
    legajo: null
})
// created
console.log(studentAlternative)
// updated
studentAlternative.legajo.set(2)
console.log(studentAlternative)

console.log('\nExample valid value ')
try {
    studentAlternative.user.password = 'dani1234'
    successTest.push(' :) ALTERNATIVE KEY TEST ')
} catch (error) {
    failTest.push('ALTERNATIVE KEY TEST 1 : :( fail function eval ')
}

console.log('\nExample invalid value ')
try {
    studentAlternative.user.password = 'da'
    failTest.push('ALTERNATIVE KEY TEST 2: :( fail function eval ')
} catch (error) {
    successTest.push(' :) ALTERNATIVE KEY TEST ')
}



console.log('\n\n\n\n --------------- FAIL TEST --------------------')
console.log('Total fail test ' + failTest.length)
console.log(failTest)

console.log('\n\n\n\n --------------- SUCCESS TEST --------------------')
console.log('Total success test ' + successTest.length)
//console.log(successTest)

console.log('\n\n\n\n --------------- END TEST --------------------')
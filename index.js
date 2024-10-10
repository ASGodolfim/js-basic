
let firstName = 'Mosh';
let lastName = 'Godoi';
let age = 30;
let selectColor = null;
let isApproved = true;
typeof firstName;
typeof age;
typeof selectColor;
typeof isApproved;

let person = {
    firstName: 'Mosh',
    lastName: 'Godoi',
    age: 29,
    isApproved: true
}

function greet (name){
    console.log('Hello' + name)
}

greet(person.firstName)

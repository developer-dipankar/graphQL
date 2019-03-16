const users = [
    {id: '1', fullname: 'Andrew Parker', email: 'abc@domain.com', age: 29, isActive: true, posts: [1,2]},
    {id: '2', fullname: 'Molly Duncan', email: 'abc@domain.com', age: 29, isActive: true, posts: [1,3]},
    {id: '3', fullname: 'Steve Smith', email: 'abc@domain.com', age: 29, isActive: true, posts: [3,2]},
    {id: '4', fullname: 'Prithi Potolkumari', email: 'abc@domain.com', age: 29, isActive: true, posts: [1,4]},
    {id: '5', fullname: 'Ken Takla', email: 'abc@domain.com', age: 29, isActive: true, posts: [1,2,5]},
    {id: '6', fullname: 'Leo Kabla', email: 'abc@domain.com', age: 29, isActive: true, posts: [1,5]},
    {id: '7', fullname: 'Kaan dhore mule debo', email: 'abc@domain.com', age: 29, isActive: true, posts: [1,3]},
    {id: '8', fullname: 'Keliye laat kore debo', email: 'abc@domain.com', age: 29, isActive: true, posts: [1,4]},
]

const posts = [
    {id: '1', title: 'A Blog', body: null, isPublished: true},
    {id: '2', title: 'B Blog', body: 'Blog A', isPublished: true},
    {id: '3', title: 'C Blog', body: null, isPublished: true},
    {id: '4', title: 'D Blog', body: null, isPublished: true},
    {id: '5', title: 'E Blog', body: null, isPublished: true},
]

const db = {
    users,
    posts
}

export { db as default}
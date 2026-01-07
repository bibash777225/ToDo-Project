export const endpoints = { 
    getAll:"https://695b46bf1d8041d5eeb6452f.mockapi.io/api/todo",
    getById:(id:string|number)=>`https://695b46bf1d8041d5eeb6452f.mockapi.io/api/todo/${id}`,
    create: "https://695b46bf1d8041d5eeb6452f.mockapi.io/api/todo",
    update:(id:string|number)=>`https://695b46bf1d8041d5eeb6452f.mockapi.io/api/todo/${id}`,
    delete:(id:string|number)=>`https://695b46bf1d8041d5eeb6452f.mockapi.io/api/todo/${id}`,
}
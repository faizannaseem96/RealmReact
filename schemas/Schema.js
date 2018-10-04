import Realm from 'realm';
export const TODOLIST_SCHEMA = "TodoList";
export const TODO_SCHEMA = "Todo";
// Define your models and their properties
export const TodoSchema = {
    name: TODO_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: 'int',    // primary key
        name: { type: 'string', indexed: true },
        done: { type: 'bool', default: false },
    }
};
export const TodoListSchema = {
    name: TODOLIST_SCHEMA,
    primaryKey: 'id',
    properties: {
        id: 'int',    // primary key
        name: 'string',
        creationDate: 'date',
        todos: { type: 'list', objectType: TODO_SCHEMA },
    }
};
const databaseOptions = {
    path: 'todoListApp.realm',
    schema: [TodoListSchema, TodoSchema],
    schemaVersion: 0, //optional    
};
//functions for TodoLists
export const insertNewTodoList = newTodoList => new Promise((success, failed) => {    
    Realm.open(databaseOptions).then(realm => {
        realm.write(() => {
            realm.create(TODOLIST_SCHEMA, newTodoList);
            success(newTodoList);
        });
    }).catch((error) => failed(error));
});
export const updateTodoList = todoList => new Promise((success, failed) => {    
    Realm.open(databaseOptions).then(realm => {        
        realm.write(() => {
            let updatingTodoList = realm.objectForPrimaryKey(TODOLIST_SCHEMA, todoList.id);   
            updatingTodoList.name = todoList.name;    
            success();     
        });
    }).catch((error) => failed(error));;
});
export const deleteTodoList = todoListId => new Promise((success, failed) => {    
    Realm.open(databaseOptions).then(realm => {        
        realm.write(() => {
            let deletingTodoList = realm.objectForPrimaryKey(TODOLIST_SCHEMA, todoListId);
            realm.delete(deletingTodoList);
            success();   
        });
    }).catch((error) => failed(error));;
});
export const deleteAllTodoLists = () => new Promise((success, failed) => {    
    Realm.open(databaseOptions).then(realm => {        
        realm.write(() => {
            let allTodoLists = realm.objects(TODOLIST_SCHEMA);
            realm.delete(allTodoLists);
            success();
        });
    }).catch((error) => failed(error));;
});
export const queryAllTodoLists = () => new Promise((success, failed) => {    
    Realm.open(databaseOptions).then(realm => {        
        let allTodoLists = realm.objects(TODOLIST_SCHEMA).sorted('id',true)
        success(Array.from(allTodoLists));  
    }).catch((error) => {        
        failed(error);  
    });;
});
export default new Realm(databaseOptions);

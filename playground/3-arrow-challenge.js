const tasks = {
    tasks:[{
        text: 'grocery',
        completed: true,
    },
    {
        text: 'cleanfalse',
        completed: false,
    },
    {
        text: 'film',
        completed: false,
    },
],
getTasksToDo() {
    return this.tasks.filter(task => !task.completed);
}
}

console.log(tasks.getTasksToDo())
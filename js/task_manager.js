const createTaskHtml = (id, name, description, assignedTo, dueDate, status) => {
    return `<div class="list-item" data-task-id= ${id}>
    <div class="card" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">${name} <span class="badge bg-danger">${status}</span></h5>
        <p class="card-text">${description}</p>
        <h6 class="card-subtitle mb-2 text-muted">Assigned to: ${assignedTo}</h6>
        <h6 class="card-subtitle mb-2 text-muted">Due Date: ${dueDate}</h6>
        <button type="button" class="btn btn-success done-button">Mark As Done</button>
        <button type="button" class="btn btn-primary delete-button">DELETE</button>
      </div>
    </div>
  </div>`
}


class TaskManager {
    constructor(currentId = 0) {
        this.tasks = [];
        this.currentId = currentId;
    }

    addTask(name, description, assignedTo, dueDate) {
        const task = {
            id: this.currentId++,
            name: name,
            description: description,
            assignedTo: assignedTo,
            dueDate: dueDate,
            status: "To-Do"
        }

        this.tasks.push(task)
    }

    getTaskById(taskId){
      // variable to store the found task
      let foundTask;
      // loops over tasks to find the with the id passed as a parameter
      for(let i = 0; i < this.tasks.length; i++) {

        // variable for current task in loop
        const task = this.tasks[i];
        // compares and check if its the right task by comparing the task's id to the id passed as a parameter
        if(task.id === taskId){
          foundTask = task;
        }
      }

      // return found task
      return foundTask
    }

    save(){
      // converts tasks to json string of tasks
      const tasksJson = JSON.stringify(this.tasks);

      // store json string in local storage
      localStorage.setItem("tasks", tasksJson);

      // convertes current id to string
      const currentId = String(this.currentId);

      // stores current id in local storage
      localStorage.setItem("currentId", currentId);


    }

    load(){

      // checks if tasks are saved in localStorage
      if(localStorage.getItem('tasks')) {
        // variable of json string of tasks in localStorage
        const tasksJson = localStorage.getItem('tasks');
        // converts it to array and store in taskManager
        this.tasks = JSON.parse(tasksJson);
      }

      // checks if current id is saved in LocalStorage
      if(localStorage.getItem('currentId')) {

        // variable of current id string in localStoage
        const currentId = localStorage.getItem('currentId');
        // converts currentId to number and stores it in TaskManager
        this.currentId = Number(currentId);



      }
    }

    deleteTask(taskId){
      // variable that creates empty arrat
      const newTasks = [];

      // loops over tasks
      for(let i = 0; i < this.tasks.length; i++){

        // gets current task in loop
        const task = this.tasks[i]
        // checks if task.id is not equal to taskId
        if(task.id !== taskId){
  
          // pushes task to new tasks array
          newTasks.push(task);
        }
      }

      // sets this.tasks to newtasks
      this.tasks = newTasks;
    }

    render() {
     // variable storing html tasks
        const tasksHtmlList = [];

        for(let i = 0; i < this.tasks.length; i++) {
            // variable for current task in loop
            const task = this.tasks[i];
            // fix date
            const date = new Date(task.dueDate);
            const formattedDate = `${date.getDate()} / ${date.getMonth() + 1} / ${date.getFullYear()}`;
            // variable that creates task html
            const taskHtml = createTaskHtml(task.id, task.name, task.description, task.assignedTo, formattedDate, task.status );

            tasksHtmlList.push(taskHtml);
        }

        const tasksHtml = tasksHtmlList.join('\n');

        const tasksList = document.getElementById('tasksList');
        tasksList.innerHTML = tasksHtml;

    }

}
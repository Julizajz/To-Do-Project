document.addEventListener('DOMContentLoaded', () => {
    // intitialises new instance of TaskManager
    const taskManager = new TaskManager(0);

    // loads task from localStorage
    taskManager.load();

    // renders loaded tasks
    taskManager.render();
    
    // task form selector
    const newTaskForm = document.getElementById('newTaskForm')
    
    
    newTaskForm.addEventListener('submit', (event) => {
        
        // element input selectors 
        const newTaskNameInput = document.getElementById('taskName');
        const newTaskDescriptionInput = document.getElementById('taskDescription');
        const newAssignedToInput = document.getElementById('assignedTo');
        const newDueDateInput = document.getElementById('dueDate');
        const newStatusInput = document.getElementById('status')
        let failValidation = 0;
        
        // prevent default action
        event.preventDefault();
        
        // input values
        const name = newTaskNameInput.value;
        const description = newTaskDescriptionInput.value;
        const assignedTo = newAssignedToInput.value;
        const dueDate = newDueDateInput.value;
    
        
        // validates for min lenght of 4 characters
        if (name.length > 4) {
            newTaskNameInput.classList.add('is-valid');
            newTaskNameInput.classList.remove('is-invalid');
        } else {
            newTaskNameInput.classList.add('is-invalid');
            newTaskNameInput.classList.remove('is-valid');
            failValidation++;
        }
        
        // valides for min length of 7 characters
        if(description.length > 7){
            newTaskDescriptionInput.classList.add('is-valid');
            newTaskDescriptionInput.classList.remove('is-invalid');
        }   else {
            newTaskDescriptionInput.classList.add('is-invalid');
            newTaskDescriptionInput.classList.remove('is-valid');
            failValidation++;
        }
        
        // validates assigned to for min length
        if(assignedTo.length > 3){
            newAssignedToInput.classList.add('is-valid');
            newAssignedToInput.classList.remove('is-invalid');
        }   else {
            newAssignedToInput.classList.add('is-invalid');
            newAssignedToInput.classList.remove('is-valid');
            failValidation++;
        }
        
        // validates due date
        if(dueDate.length){
            newDueDateInput.classList.add('is-valid');
            newDueDateInput.classList.remove('is-invalid');
        }   else {
            newDueDateInput.classList.add('is-invalid');
            newDueDateInput.classList.remove('is-valid');
            failValidation++;
        }
        
        // stops execution of new task if one input fails validation
        if(failValidation > 0) {
            return
        }
        // puts inputs into addTask array
        taskManager.addTask(
            name,
            description,
            assignedTo,
            dueDate,
            status
            );
            // test to see task with id of 0 
            console.log(taskManager.getTaskById(0))
            // saves task to local storage
            taskManager.save();
            taskManager.render();
        
        // clears form fields after rendering
        newTaskNameInput.value = '';
        newTaskDescriptionInput.value = '';
        newAssignedToInput.value = '';
        newDueDateInput.value = '';
        console.log(taskManager);
        
    });
    
    // variable stores tasklist div
    const taskList = document.getElementById('tasksList')
    taskList.addEventListener('click', (event) => {
        
        if(event.target.classList.contains('done-button')){
            // parent task of done button
            const parentTask = event.target.parentElement.parentElement.parentElement;
            console.log(parentTask);
            
            // turns task id of parent task and turns it into number
            const taskId = Number(parentTask.dataset.taskId);

            // gets the task from the task manager using the taskid
            const task = taskManager.getTaskById(taskId);
            // updates task status to done
            task.status = "Done";
            // calls save method to save tasks to local storage
            taskManager.save();
            
            taskManager.render();
        }

        // checks if delete-buttonw was clicked
        if (event.target.classList.contains("delete-button")){

            // parent task variable that holds parent of delete button
            const parentTask = event.target.parentElement.parentElement.parentElement;

            // turns task string taskid to number 
            const taskId = Number(parentTask.dataset.taskId);

            // deletes task
            taskManager.deleteTask(taskId);

            // saves to local storage
            taskManager.save();

            // renders tasks
            taskManager.render();

        }

    })
});












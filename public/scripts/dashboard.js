// DOM elements
// -------------------------------------------------------------------------------------
const listButton = document.getElementById('list-button')
const taskList = document.getElementById('task-list')
const createTask = document.querySelector('.create-form-group')

const modal = document.getElementById('edit-modal')
const closeBtn = document.querySelector('.close')
const editForm =  document.querySelector('.edit-form')
const editTitle = document.getElementById('edit-title')
const editDescription = document.getElementById('edit-description')
const editStatus =  document.getElementById('edit-status')

let currenteTaskId = null

// Function: Create Task
createTask.addEventListener('submit', async function(e) {
    e.preventDefault()

    const title = document.getElementById('title').value
    const description = document.getElementById('description').value

    try {
        const token = localStorage.getItem('token')

        const res = await fetch('/task', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({title, description})
        })

        const data = await res.json()

        if(res.ok) {
            alert(data.message || 'Task created successfully')
            e.target.reset()
            listButton.click()
        } else {
            alert(data.error || 'Fail to create task')
        }

    } catch (err) {
        console.log(err)
        alert('Network error, try again later')
    }
})

// Function: List Tasks
listButton.addEventListener('click', async () => {
    try {
        const token = localStorage.getItem('token')

        const res = await fetch('/task', {
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        const data = await res.json()
        const tasks = data.data

        taskList.innerHTML= ''

        if(res.ok){
            if (tasks.length === 0) {
                taskList.innerHTML = `<p class='error'> No tasks found </p>`
                return
            }

            tasks.forEach(task => renderTask(task))

        } else {
            taskList.innerHTML = `<p class='error'> ${data.error || 'Failed to get tasks'}`
        }

    } catch (err) {
        console.log(err)
        alert('Network error, try again later')
    }
})

// Function: Render Task
function renderTask(task) {
    const taskCard = document.createElement('div')
    taskCard.classList.add('task-card')
    taskCard.innerHTML = `
        <h3> Title: ${task.title} </3>
        <p> Description: ${task.description || 'No description provided.'} </p>
        <div class='task-card-btn'>
            <button class='btn edit-btn' data-id=${task._id}>Edit</button>
            <button class='btn del-btn' data-id=${task._id}>Delete</button>
        </div>
    `
    taskList.appendChild(taskCard)

    // Edit button
    taskCard.querySelector('.edit-btn').addEventListener('click', () => openEditModal(task))

    // Delete button
    taskCard.querySelector('.del-btn').addEventListener('click', () => deleteTask(task._id, taskCard))
}

// Function: Open Edit modal
function openEditModal(task) {
    currenteTaskId = task._id
    editTitle.value = task.title
    editDescription.value = task.description
    editStatus.value = task.status || 'pending'

    modal.style.display = 'block'
}

// Close Modal
closeBtn.addEventListener('click', () => modal.style.display = 'none')

// Save changes (edit task)
editForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    const token = localStorage.getItem('token')
    const updateTask = {
        title: editTitle.value,
        description: editDescription.value,
        status: editStatus.value
    }

    try {
        const res = await fetch(`/task/${currenteTaskId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(updateTask)
        })

        const data = await res.json()

        if (res.ok) {
            alert('Task updated successfully')
            modal.style.display = 'none'
            listButton.click() // Update list of tasks
        } else {
            alert(data.error || 'Fail to update task')
        }

    } catch (err) {
        console.log(err)
        alert('Network error, try again later')
    }
})

// Function: Delete task
async function deleteTask(taskId, taskCard) {
    if(!confirm('Delete this task?')) return

    const token = localStorage.getItem('token')

    try {
        const res = await fetch(`/task/${taskId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

        const data = await res.json()

        if (res.ok) {
            alert('Task deleted successfully')
            taskCard.remove() // remove from DOM
        } else {
            alert(data.error || 'Failed to delete task')
        }
    } catch (err) {
        console.log(err)
        alert('Network error, try again later')
    }
}
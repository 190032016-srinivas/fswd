let user_data_array = localStorage.getItem('user_data').split(' ')
console.log('user_data_array=',user_data_array)
if (localStorage.getItem('user_data')) {
    for (let task of user_data_array) {
        //creation
        let new_task = document.createElement('div')
        new_task.className = 'task'
        let new_task_1 = document.createElement('div')
        new_task_1.className = 'task_name'
        new_task_1.textContent = task
        let new_task_2 = document.createElement('div')
        new_task_2.className = 'task_tick'
        let new_task_2_1 = document.createElement('img')
        new_task_2_1.id = 'completed_button'
        new_task_2_1.src = 'images/check_mark.png'

        //arranging/assigning
        const task_parent = document.getElementById('tasks_log')
        new_task.appendChild(new_task_1)
        new_task.appendChild(new_task_2)
        new_task_2.appendChild(new_task_2_1)
        task_parent.insertBefore(new_task, task_parent.firstChild)

    }
}
// /adding new tasks
const add_task_button = document.getElementById('add_task_button')
// let text_area = document.getElementById('textarea_add_new_task')
// let new_task_value = text_area.value.trim().replaceAll(' ', '_')
function fof_add_task_button() {
    let text_area = document.getElementById('textarea_add_new_task')
    let new_task_value = text_area.value.trim().replaceAll(' ', '_')
    console.log('new_task_value=',new_task_value)
    //validations empty and duplicate
    if (new_task_value.length == 0) {
        alert('please enter a task')
        text_area.value = ''
        return
    }
    if (user_data_array.includes(new_task_value)) {
        alert('task already present')
        text_area.value = ''
        return
    }
    //adding this value to storage
    user_data_array.push(new_task_value)


    //adding the new tasks to display

    //creation
    let new_task = document.createElement('div')
    new_task.className = 'task'
    let new_task_1 = document.createElement('div')
    new_task_1.className = 'task_name'
    new_task_1.textContent = new_task_value
    let new_task_2 = document.createElement('div')
    new_task_2.className = 'task_tick'
    let new_task_2_1 = document.createElement('img')
    new_task_2_1.id = 'completed_button'
    new_task_2_1.src = 'images/check_mark.png'
    //eventlistner of this delete icon
    function fof_new_task_2_1(){
        console.log('deleting',new_task_value)
        new_task.remove()
        let user_data_array = localStorage.getItem('user_data').split(' ')
        let index = user_data_array.indexOf(new_task_value)
        console.log('user_data_array=',user_data_array,index)
        user_data_array.splice(index,1)
        console.log('user_data_array=',user_data_array)
        //updating the storage 
        let updated_string = user_data_array.join(' ')
        localStorage.setItem('user_data', updated_string)
    }
    new_task_2_1.addEventListener('click',fof_new_task_2_1)

    //arranging/assigning
    const task_parent = document.getElementById('tasks_log')
    new_task.appendChild(new_task_1)
    new_task.appendChild(new_task_2)
    new_task_2.appendChild(new_task_2_1)
    task_parent.insertBefore(new_task, task_parent.firstChild)

    //resetting the text area
    text_area.value = ''


    //updating the storage 
    let updated_string = user_data_array.join(' ')
    localStorage.setItem('user_data', updated_string)

}
//triggering the addtaskbutton when enter key is pressed
let text_area = document.getElementById('textarea_add_new_task')
text_area.addEventListener('keydown', function(event){
    console.log('textarea interacted')
    if(event.key==='Enter'){
        event.preventDefault
        add_task_button.click()
    }
})
//pressing normally tick icon
add_task_button.addEventListener('click', fof_add_task_button)


//clear button
const clear_button = document.getElementById('clear_button')
function fof_clear_button() {
    localStorage.setItem('user_data', '')
    const task_parent = document.getElementById('tasks_log')
    while(task_parent.firstChild){
        task_parent.removeChild(task_parent.firstChild)
    }
    user_data_array = []
}
clear_button.addEventListener('click', fof_clear_button)


//global context 
const in_s_name = document.getElementById('s_name')
const in_s_id = document.getElementById('s_id')
const in_s_mail = document.getElementById('s_email')
const in_s_num = document.getElementById('s_num')
const register_button = document.getElementById('register_button')



//rendering local storage
if (localStorage.getItem('s_data')) {
    const arr = localStorage.getItem('s_data').split(' ')
    for (let i = 0; i < arr.length; i = i + 4) {
        //row creation
        let newrow = document.createElement('tr')
        //element creation
        let newtd1 = document.createElement('td')
        newtd1.textContent = arr[i]
        let newtd2 = document.createElement('td')
        newtd2.textContent = arr[i + 1]
        let newtd3 = document.createElement('td')
        newtd3.textContent = arr[i + 2]
        let newtd4 = document.createElement('td')
        newtd4.textContent = arr[i + 3]
        let newtd5 = document.createElement('td')
        let img_div = document.createElement('div')
        img_div.id = 'parent_edit_icons'
        let edit_icon = document.createElement('img')
        edit_icon.addEventListener('click', fof_edit_icon)
        function fof_edit_icon() {
            //sending the data to input fields
            in_s_name.value = arr[i]
            in_s_id.value = arr[i + 1]
            in_s_mail.value = arr[i + 2]
            in_s_num.value = arr[i + 3]
            //alerting about the edit procedure
            alert('Records are shown in the input section please edit the details and register again')
            fof_del_icon()
        }
        edit_icon.className = 'edit_icon'
        edit_icon.src = 'images/pen.png'
        img_div.appendChild(edit_icon)
        let del_icon = document.createElement('img')
        del_icon.addEventListener('click',()=>{fof_del_icon(1)})
        function fof_del_icon(a){
            //deleting from display
            newrow.remove()
            //alerting the user about deletion
            if(a)alert('Record deleted')
                //deleting from local storage
            let existing_data_string = localStorage.getItem('s_data')
            let existing_data_array = existing_data_string.split(' ')
            let index = existing_data_array.indexOf(arr[i + 1])
            existing_data_array.splice(index-1,4)
            let outgoing = existing_data_array.join(' ')
            localStorage.setItem('s_data',outgoing)
        }
        del_icon.className = 'edit_icon'
        del_icon.src = "images/delete.png"
        img_div.appendChild(del_icon)
        newtd5.appendChild(img_div)

        //linking to the new row
        newrow.appendChild(newtd1)
        newrow.appendChild(newtd2)
        newrow.appendChild(newtd3)
        newrow.appendChild(newtd4)
        newrow.appendChild(newtd5)

        //adding to dom
        const parent_table_body = document.getElementById('parent_table_body')
        parent_table_body.insertBefore(newrow, parent_table_body.firstChild)
    }
}


//inserting a new record
//inserting a new record
//inserting a new record

register_button.addEventListener('click', fof_register_button)
function fof_register_button() {
    //take in all the values
    let en_s_name = in_s_name.value
    let en_s_id = in_s_id.value
    let en_s_mail = in_s_mail.value
    let en_s_num = in_s_num.value
    //space to underscore conversions
    en_s_name = en_s_name.trim().replaceAll(' ', '_')
    en_s_mail = en_s_mail.trim().replaceAll(' ', '_')
    //number to string conversions
    en_s_id = en_s_id.toString()
    en_s_num = en_s_num.toString()
    //validations
    if(en_s_name.length==0){
        alert('please enter a name')
        return
    }
    if (en_s_id.length !== 5) {
        alert('please enter a 5 digit student ID')
        return
    }
    if(en_s_mail.length==0){
        alert('please enter a mail id')
        return
    }
    if (en_s_num.length !== 10) {
        alert('please enter 10 digit number')
        return
    }
    
    
    //unique id verification
    let existing_data_string = localStorage.getItem('s_data')
    let existing_data_array
    if (existing_data_string) {
        existing_data_array = existing_data_string.split(' ')
    }
    else {
        existing_data_array = []
    }

    if (existing_data_array.includes(en_s_id)) {
        in_s_id.value = ''
        alert('Enter a unique ID')
        return
    }
    //proceeding validations
    //add this to local storage
    //fetch local storage data already done in id verification
    //update the data
    existing_data_array.push(en_s_name, en_s_id, en_s_mail, en_s_num)

    //upload new data
    let outgoing_data_string = existing_data_array.join(' ')
    localStorage.setItem('s_data', outgoing_data_string)
    //display the new data in the table
    //creating the new row and its elements
    let newrow = document.createElement('tr')
    //normal data
    let in_data_arr = [en_s_name, en_s_id, en_s_mail, en_s_num]
    for (let x of in_data_arr) {
        let newtd = document.createElement('td')
        newtd.textContent = x
        newrow.appendChild(newtd)
    }
    //icons generation
    let icon_td = document.createElement('td')
    let img_div = document.createElement('div')
    img_div.id = 'parent_edit_icons'
    let edit_icon = document.createElement('img')
    //function of edit button
    edit_icon.addEventListener('click', fof_edit_icon)
    function fof_edit_icon() {
        //sending the data to input fields
        in_s_name.value = en_s_name
        in_s_id.value = en_s_id
        in_s_mail.value = en_s_mail
        in_s_num.value = en_s_num
        //alerting about the edit procedure
        alert('Records are shown in the input section. Please edit the details and register again')
        //deleting the existing record
        fof_del_icon()
    }
    edit_icon.className = 'edit_icon'
    edit_icon.src = 'images/pen.png'
    img_div.appendChild(edit_icon)
    let del_icon = document.createElement('img')
    del_icon.addEventListener('click',()=>{fof_del_icon(1)})
    function fof_del_icon(a){
        //deleting from display
        newrow.remove()
        //alerting the user about deletion
        if(a)alert('Record deleted')
        //deleting from local storage
        let existing_data_string = localStorage.getItem('s_data')
        let existing_data_array = existing_data_string.split(' ')
        let index = existing_data_array.indexOf(en_s_id)
        existing_data_array.splice(index-1,4)
        let outgoing = existing_data_array.join(' ')
        localStorage.setItem('s_data',outgoing)
    }
    del_icon.className = 'edit_icon'
    del_icon.src = "images/delete.png"
    img_div.appendChild(del_icon)
    icon_td.appendChild(img_div)
    newrow.appendChild(icon_td)
    //completed new row generation
    //attaching to the table body
    const parent_table_body = document.getElementById('parent_table_body')
    parent_table_body.insertBefore(newrow, parent_table_body.firstChild)

    //clear the values in the form
    in_s_name.value = ''
    in_s_id.value = ''
    in_s_mail.value = ''
    in_s_num.value = ''

}

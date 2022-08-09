//elements
const addButtonEle = document.getElementById("add-button");
const inputTaskEle = document.getElementById("input-task");
const taskListContainerEle = document.getElementById("task-list");
const searchStringEle = document.getElementById("search");
const inputErrorEle = document.getElementById("error");

//global variables
let inputString =""
let searchString=""
let lists = JSON.parse(localStorage.getItem('task-list')) || []



//read input
inputTaskEle.addEventListener('change',event=>{
    inputString=event.target.value;
    
})


//search
searchStringEle.addEventListener('keyup',event=>{
    searchString=event.target.value;
    const tempList = lists.filter(obj=> obj.textData.includes(searchString))
    console.log(tempList)
    render(tempList)
})



addButtonEle.addEventListener('click', ()=>{
    if (inputString==""){
        inputErrorEle.classList.remove("hide-error");
    }else{
        inputErrorEle.classList.add("hide-error");
        inputTaskEle.value=""
        addTask()
        inputString=""
        
        
    }
})

//save current input

function save(){
    localStorage.setItem('task-list',JSON.stringify(lists));
}





function addTask(){
    let newItemObj ={
        id: Date.now().toString(),
        textData : inputString
    }
    lists.push(newItemObj);
    save()
    createAndAppend(newItemObj)
}


function render(ListToRender){
    taskListContainerEle.textContent=""
    for (let todoObj of ListToRender){
        
        createAndAppend(todoObj);
    }

}


function createAndAppend(todoObj){
    let currentId=todoObj.id;
    const listItemEle = document.createElement("li");
    listItemEle.id =currentId;
    listItemEle.classList.add("list_item");
    listItemEle.textContent=todoObj.textData;
    taskListContainerEle.appendChild(listItemEle);

    const deleteButtonEle = document.createElement("button");
    deleteButtonEle.classList.add("delete-button");
    deleteButtonEle.textContent="X";
    deleteButtonEle.onclick=function (){
        ondelTodoId(currentId)
    } 
    listItemEle.appendChild(deleteButtonEle);



}

function ondelTodoId(id){
    const currentEle = document.getElementById(id);
    taskListContainerEle.removeChild(currentEle);
    lists =lists.filter(obj=>obj.id!=id);
    save()
}




//render function
render(lists)

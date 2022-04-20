
////Input Element
let title=document.querySelector("#title")
let price=document.querySelector("#price")
let category=document.querySelector("#category")
let count=document.querySelector("#count")
let search=document.querySelector("#search")

///buttons SeachBy
let searchByname=document.querySelector(".seach-category > div:first-of-type")
let searchByCategory=document.querySelector(".seach-category > div:last-of-type")



///Toggle Betwen Upade And Create
let togglebutton=document.querySelector(".toggle")

let selected=document.querySelector(".all-selected > div")
let table=document.querySelector("tbody")

let deleteAllButtom=document.querySelector(".delete-all > div")
////Store Element
let dateOfAllElement=[]


//Store Element Selected
let selectedElement={}

//searching By
let searchThrough="title"

if(localStorage.getItem("alldata")){
    dateOfAllElement=JSON.parse(localStorage.getItem("alldata"))
    showDate()
}
let posElementWhichUpdate=0
////When i click create
togglebutton.onclick=function(){

    if (checkAllInputField()){
        if(togglebutton.innerHTML === "Update")
        {
            
            dateOfAllElement[posElementWhichUpdate].title=title.value
            dateOfAllElement[posElementWhichUpdate].price=price.value
            dateOfAllElement[posElementWhichUpdate].category=category.value

            togglebutton.innerHTML="Create"


        }
        else
        {
            data={
                title:title.value,
                price:price.value,
                category:category.value,
            }
            if(count.value > 1){
                for(i=0;i<count.value;i++){
                    dateOfAllElement.push(data)
                }
            }
            else
            {
                dateOfAllElement.push(data)
            }
        }


        clearDate()
        showDate()
    }

}

selected.onclick=function()
{


    dateOfAllElement = dateOfAllElement.filter(chechIfSelected);
    selectedElement={}
    selected.style.display="none"
    showDate()


}

searchByname.onclick=function(){
    searchThrough="title"
    search.placeholder="Search By Title"


}

searchByCategory.onclick=function(){
    searchThrough="category"
    search.placeholder="Search By Category"


}

search.onkeyup=function(){

    if(searchThrough == "title"){

        searchBy("title")
    }
    else
    {
        searchBy("category")


    }


}

function searchBy(by){
    console.log(44)
    let dateOfTable=''
    for(let i=0;i<dateOfAllElement.length;i++){
        if(dateOfAllElement[i][by].includes(search.value)){
            dateOfTable+=`
                <tr>
                    <td><input type="checkbox" onclick=selectElement(this,${i})></td>
                    <td>${i}</td>
                    <td>${dateOfAllElement[i].title}</td>
                    <td>${dateOfAllElement[i].price}</td>
                    <td>${dateOfAllElement[i].category}</td>
                    <td><div class="update" onclick=updateDate(${i})>Update</div></td>
                    <td><div class="delete" onclick=deleteDate(${i})>Delete</div></td>
                </tr>               
            `
        }

    }
    table.innerHTML=dateOfTable
    
}



function chechIfSelected(val,index){
    let elemnts=Object.values(selectedElement)
    for(let i=0;i<elemnts.length;i++){
        if(+elemnts[i] === +index) {
            return false
        }
    }
    return true



}

function showDate(){
    localStorage.setItem("alldata",JSON.stringify(dateOfAllElement))
    table.innerHTML=""
    for(let i=0;i<dateOfAllElement.length;i++){
        table.innerHTML+=`
            <tr>
                <td><input type="checkbox" onclick=selectElement(this,${i})></td>

                <td>${i}</td>
                <td>${dateOfAllElement[i].title}</td>
                <td>${dateOfAllElement[i].price}</td>
                <td>${dateOfAllElement[i].category}</td>
                <td><div class="update" onclick=updateDate(${i})>Update</div></td>
                <td><div class="delete" onclick=deleteDate(${i})>Delete</div></td>
            </tr>
        `

    }

    if(dateOfAllElement.length){
        deleteAllButtom.style.display="block";
        deleteAllButtom.innerHTML=`Delete All(${dateOfAllElement.length})`;
    }
    else{
        deleteAllButtom.style.display="none";
    }

}


function updateDate(elementPos){
    posElementWhichUpdate=elementPos
    toSetValueInInput(elementPos)
    togglebutton.innerHTML="Update"


}


function toSetValueInInput(elementPos){

    title.value=dateOfAllElement[elementPos].title
    price.value=dateOfAllElement[elementPos].price
    category.value=dateOfAllElement[elementPos].category


}

function deleteDate(elementPos){
    dateOfAllElement.splice(elementPos,1)
    showDate()
    
}


function checkAllInputField(){
    if(title.value && price.value && category.value ){
        return true;
    }
    return false;
}


function deleteAllElement(){
    dateOfAllElement.splice(0)
    localStorage.clear()
    showDate()

}

function selectElement(e,pos){
    if(e.checked){
        selectedElement[pos]=pos

    }
    else
    {   
        delete selectedElement[pos]
    }

    if(Object.keys(selectedElement).length){
        selected.style.display="block"
        selected.innerHTML=`Delete All Selected(${Object.keys(selectedElement).length})`
    }
    else{
        selected.style.display="none"

    }
 
    
}


function clearDate(){
    title.value=""
    price.value=""
    category.value=""
    count.value=""
    search.value=""
}
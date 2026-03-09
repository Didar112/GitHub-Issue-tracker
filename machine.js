// id getting part
const cardHolder=document.getElementById("card-display") //card gallery 
const issueCount = document.getElementById("issueCount") // issues counter

let issueCounter=0;

const srcBox = document.getElementById("srbox")
const srcBtn =document.getElementById("find-btn")



//catahgory buttons
const allBtn=document.getElementById("all-btn")
const openBtn=document.getElementById("open-btn")
const closedBtn=document.getElementById("close-btn")

//spinner 
const spnr = document.getElementById("spinner");


//modal 
const mdl = document.getElementById("my_modal_1")

//modal showing function, will call in innerhtml of showcards
const buildModal=async(id)=>{

        const singleUrl = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`

        const res  =await fetch(singleUrl)
        const data = await res.json()
        const dataObj=data.data
        my_modal_1.showModal()
    
        mdl.innerHTML=`
        
        <div class="modal-box">
        <h3 class="text-lg font-bold">${dataObj.title}</h3>
        <p class="py-4">${dataObj.description}</p> 
       
        <div class="flex items-start">
        <div class="badge badge-success mr-5">Opened</div>
            <p class="font-light text-[12px] mr-4">Opened by ${dataObj.author}</p>
            <p class="font-light text-[12px]">${dataObj.createdAt}</p>
        </div>
        <div class="modal-badge-holder my-5">
                        ${createSyn(dataObj.labels)}
        </div>
        <p class="font-normal text-[16px]">${dataObj.description}</p>
        <div class="card mt-6 bg-base-100 card-xs shadow-sm">
  <div class="w-[100%] mx-auto card-body bg-slate-100 grid grid-cols-2">
    <div>
        <p>assignee: <br></p>
        <p>${dataObj.author}</p>
    </div>
    <div>
        <p>Prioroty:</p>
        <div class="badge badge-error">HIGH</div>
    </div>
  </div>
</div>
        <div class="modal-action">
            <form method="dialog">
               
                <button class="btn">Close</button>
            </form>
        </div>
    </div>
        
        `
        

}


// search functionality
//btn click 
const srcBtnClick=()=>{
    searchIssue(srcBox.value)
}

const searchIssue= async(val)=>{
    //search api
searchUrl= `https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${val}`

    showSpinner()
    allBtn.classList.remove("btn-primary")
    openBtn.classList.remove("btn-primary")
    closedBtn.classList.remove("btn-primary")
    allBtn.classList.add("btn-outline")
    openBtn.classList.add("btn-outline")
    closedBtn.classList.add("btn-outline")
    const res=await fetch(searchUrl)
    const data = await res.json()
    
    
    
    showAllissues(data.data);
    hideSpinner()

    

    

 }







// dynamically create array for badges
const createSyn=(arr)=>{

    const array=arr.map((element)=> `<div class="badge badge-soft badge-warning">${element}</div>`);
    return array.join(" ")

}
//function for spinner logic
const showSpinner=()=>{
    spnr.classList.remove("hidden")
    cardHolder.innerHTML="";
}
const hideSpinner=()=>{
    spnr.classList.add("hidden")
}


// bring "all" data from the api
const getAllissues=async()=>{
    allBtn.classList.add("btn-primary")
    allBtn.classList.remove("btn-outline")
    const url="https://phi-lab-server.vercel.app/api/v1/lab/issues"
    openBtn.classList.remove("btn-primary")
    closedBtn.classList.remove("btn-primary")
    openBtn.classList.add("btn-outline")
    closedBtn.classList.add("btn-outline")
    issueCounter=0
    showSpinner()
    const res = await fetch(url)
    const data = await res.json()

    showAllissues(data.data);
    
    
}
// showing all data cards
const showAllissues=(arr)=> {

    
    cardHolder.innerHTML="";

    issueCounter=0
    arr.forEach(element => {
        let card = document.createElement("div")
        let borderColor='';
        if(element.status=="open"){
            borderColor="border-green-500"
        } else {
            borderColor="border-purple-500"
        }
        
        card.innerHTML=`

            <div onclick="buildModal(${element.id})" class="card border-t-4 ${borderColor} shadow-sm hover:cursor-pointer h-full">
                <div class="p-[24px] pb-0">
                <div class="flex justify-between mb-3">${(element.status=="open")?`<img src="../assets/OpenStatus.png" alt="">`:`<img src="./assets/Closed- Status .png" alt="">`}
                    
                    <div class="badge badge-soft badge-warning">${(element.priority)}</div>
                </div>
                <h3 class="font-semibold text-[18px]">${element.title}</h3>
                <p class="line-clamp-2 mb-3 font-light text-[14px]">${element.description}</p>

                <div class="flex gap-1 items-center">
                      ${createSyn(element.labels)}
                </div>
                </div>
                  <div class="divider mb-[0px]"></div>
                  <div class="p-[24px]">
                  <p class="font-extralight text-[12px]">#1 by ${element.author}</p>
                  <p class="font-extralight text-[12px]">${element.createdAt}</p>
                  </div>
            </div>
        `
        cardHolder.append(card)
        issueCounter++;
        
    });
    issueCount.innerText=`${issueCounter} Issues`
   hideSpinner()
}


//filtering data for open issues only 
const getOpenissues=async()=>{
    openBtn.classList.add("btn-primary")
    openBtn.classList.remove("btn-outline")
    const url="https://phi-lab-server.vercel.app/api/v1/lab/issues"
    allBtn.classList.remove("btn-primary")
    closedBtn.classList.remove("btn-primary")
    allBtn.classList.add("btn-outline")
    closedBtn.classList.add("btn-outline")
    showSpinner()
    const res = await fetch(url)
    const data = await res.json()

    filterOpenIssues(data.data);
}
//open issues rendering and filtering part
const filterOpenIssues=(data)=>{
    const openElements=data.filter((element)=>element.status=="open")
    issueCounter=0
    showAllissues(openElements);
}


//filtering data for closed issues only 
const getClosedissues=async()=>{
    closedBtn.classList.add("btn-primary")
    closedBtn.classList.remove("btn-outline")
    const url="https://phi-lab-server.vercel.app/api/v1/lab/issues"
    allBtn.classList.remove("btn-primary")
    openBtn.classList.remove("btn-primary")
    openBtn.classList.add("btn-outline")
    allBtn.classList.add("btn-outline")

    showSpinner()
    const res = await fetch(url)
    const data = await res.json()

    filterClosedIssues(data.data);
}

const filterClosedIssues=(data)=>{
    const openElements=data.filter((element)=>element.status=="closed")
    issueCounter=0
    showAllissues(openElements);
}

getAllissues()
// id getting part
const cardHolder=document.getElementById("card-display") //card gallery 
const issueCount = document.getElementById("issueCount") // issues counter
let issueCounter=0;




// dynamically create array for badges
const createSyn=(arr)=>{

    const array=arr.map((element)=> `<div class="badge badge-soft badge-accent">${element}</div>`);
    return array.join(" ")

}


// bring "all" data from the api
const getAllissues=async()=>{
    const url="https://phi-lab-server.vercel.app/api/v1/lab/issues"
    issueCounter=0

    const res = await fetch(url)
    const data = await res.json()

    showAllissues(data.data);

}
// showing all data cards
const showAllissues=(arr)=> {

    cardHolder.innerHTML="";


    arr.forEach(element => {
        let card = document.createElement("div")
        
        card.innerHTML=`

            <div class="card shadow-sm">
                <div class="p-[24px] pb-0">
                <div class="flex justify-between mb-3">${(element.status=="open")?`<img src="./assets/Open-Status.png" alt="">`:`<img src="./assets/Closed- Status .png" alt="">`}
                    
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
}


//filtering data for open issues only 
const getOpenissues=async()=>{
    const url="https://phi-lab-server.vercel.app/api/v1/lab/issues"


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
    const url="https://phi-lab-server.vercel.app/api/v1/lab/issues"


    const res = await fetch(url)
    const data = await res.json()

    filterOpenIssues(data.data);
}

const filterClosedIssues=(data)=>{
    const openElements=data.filter((element)=>element.status=="closed")
    issueCounter=0
    showAllissues(openElements);
}

getAllissues()
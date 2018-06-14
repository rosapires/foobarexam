"use strict"

let myObject;

//Getting data
let json = FooBar.getData();

//parsing the json file into an object and returning string
myObject = JSON.parse(json);
let pplInQueue = 0;


//Data being fetched at an interval

setInterval(() => {
    json = FooBar.getData();
    myObject = JSON.parse(json);
    showQueue();
    drawGraph();
    showLevels(myObject);
    baristas();
    whoIsWorking(myObject.bartenders);
    counting(myObject);

}, 1000);




// The data for Queue is shown

function showQueue() {
    //console.log(myObject.queue);
    document.querySelector("#queue").textContent = myObject.queue.length + "  waiting";
};



// The Kegs - naming and animation


// The name of a beer shown under each keg and the change randomly according to the JSON

let names = ["#kegname1", "#kegname2", "#kegname3", "#kegname4", "#kegname5", "#kegname6", "#kegname7"];


function showNames() {
    // console.log(myObject.beertypes);
    document.querySelector(".kegname1 text").textContent = myObject.taps[0].beer;
    document.querySelector(".kegname2 text").textContent = myObject.taps[1].beer;
    document.querySelector(".kegname3 text").textContent = myObject.taps[2].beer;
    document.querySelector(".kegname4 text").textContent = myObject.taps[3].beer;
    document.querySelector(".kegname5 text").textContent = myObject.taps[4].beer;
    document.querySelector(".kegname6 text").textContent = myObject.taps[5].beer;
    document.querySelector(".kegname7 text").textContent = myObject.taps[6].beer;
}

//When a keg is clicked a modal box is shown on the right of the screen
let kegsButton = document.querySelector("#keg1");

// function to hide the modal when the page is loaded
function hideModal() {
    modal.classList.add("hide");
}

// The modal box content
function showModalContent() {

    let modal = document.querySelector("#modal");
    let kegs = ["#keg1", "#keg2", "#keg3", "#keg4", "#keg5", "#keg6", "#keg7"];
    let kegObjs = document.querySelectorAll('#kegs g[id*="keg"]')
    // console.log(kegObjs)

        //The click function for each keg
        kegObjs.forEach(function (theKeg, index) {
        theKeg.addEventListener('click', function () {
            // console.log(myObject.taps[index]);
            //find beer in beertypes
            let thisBeer = myObject.beertypes.find(function (element) {
                return element.name === myObject.taps[index].beer;
            });


            // console.log(thisBeer)


            //showModalContent(theKeg);
            modal.classList.remove("hide")
            modal.querySelector(".name").textContent ="Name: " + thisBeer.name;
            modal.querySelector(".category").textContent ="Category: " + thisBeer.category;
            modal.querySelector(".label").src = thisBeer.label;
            modal.querySelector(".appearance").textContent = "Appearance:  " + thisBeer.description.appearance;
            modal.querySelector(".aroma").textContent = "Aroma: " + thisBeer.description.aroma;
            modal.querySelector(".flavor").textContent = "Flavor: " + thisBeer.description.flavor;
            modal.querySelector(".mouthfeel").textContent = "Mouthfeel: " + thisBeer.description.mouthfeel;
            modal.querySelector(".overall").textContent = "Short Description: " + thisBeer.description.overallImpression;
            modal.querySelector(".alcohol").textContent = "Alcohol %: " + thisBeer.alc;
            modal.querySelector(".popularity").textContent = "Where do our customers rank this beer?: " + thisBeer.popularity;
            // modal.querySelector(".more").textContent = "We have " + myObject.storage + " in storage";
            modal.addEventListener('click', hideModal);
        });
    })
};

// The levels of beer in each which changes according to the JSON
// When the keg is full it shows a green line. When it is about half empty a orange line is shown. 
// When it getting close to empty a red line is shown

let mylevel = document.querySelectorAll(".mylevel rect");
let kegok2 = document.querySelectorAll(".kegok .st19");
let kegok = document.querySelectorAll(".kegok .st20");
let replace = document.querySelectorAll(".kegreplace .st200");
let replace2 = document.querySelectorAll(".kegreplace .st2001");
let inuse = document.querySelectorAll(".st62");


function showLevels(tapObj){
    // console.log(tapObj);
    let alltaps = tapObj.taps; 
    for (let i=0;i<alltaps.length;i++)  {

    let tap=alltaps[i];
    let level=mylevel[i];
    let kegokPath=kegok[i];
    let kegokPath2=kegok2[i];
    let replacePath=replace[i];
    let replacePath2=replace2[i];

if (tap.level == 2500 ){
        level.style.height= "0";
        level.style.y = "866";

        kegokPath.style.fill = "green";
        kegokPath2.style.fill = "green";     
};

if (tap.level <= 2450 && tap.level >1000 ){

            level.style.height= "40";
            level.style.y = "866";

            kegokPath.style.fill = "#D1D1D3";
            kegokPath2.style.fill = "#D1D1D3";

            replacePath.style.fill = "orange";
            replacePath2.style.fill = "orange";
}

if (tap.level <= 1000 && tap.level >500){

            level.style.height= "70";
            level.style.y = "866";

            kegokPath.style.fill = "#D1D1D3";
            kegokPath2.style.fill = "#D1D1D3";

            replacePath.style.fill = "red";
            replacePath2.style.fill = "red";
    }

    if (tap.level <= 500){

        level.style.height= "90";
        level.style.y = "866";

        kegokPath.style.fill = "#D1D1D3";
        kegokPath2.style.fill = "#D1D1D3";

        replacePath.style.fill = "red";
        replacePath2.style.fill = "red";
}

// When a tap is being used the tube  from the keg that leads to the tab changes color and blinks
// when it is not being used the color is the same

    let onetap = inuse[i];
    var tl = new TimelineMax({repeat: -1});
if (tap.inUse == true ){
            onetap.style.fill= "#daa520";
tl
        .fromTo(onetap, 3, {autoAlpha: 1}, {autoAlpha: 0})
    }
    else{
        onetap.style.fill= "#dbdbdb";
        onetap.style.stoke= "2";

        tl 
        .fromTo(onetap, 2.3, {autoAlpha: 1}, {autoAlpha: 1, immediateRender:false})
    };
};
};

//Text showing which of the bartenders is working or is ready
function whoIsWorking(bartenders) {
    bartenders.forEach((bartender) => {
        
        if (bartender.status == "READY") {
            console.log(bartender.status)
            document.querySelector(`#${bartender.name}`).classList.add("hideBartender")
            
        } else { 
            document.querySelector(`#${bartender.name}`).classList.remove("hideBartender")
        }
    })
}

//Text that shows if bartenders are working or ready 
function baristas() {
    document.querySelector(".textbox").textContent = "Peter is: " + myObject.bartenders[0].status;
    document.querySelector(".textbox1").textContent = "Jonas is: " + myObject.bartenders[1].status;
    document.querySelector(".textbox2").textContent = "Martin is: " + myObject.bartenders[2].status;
}


// The graph showing the number of people in queue vs time in seconds

const queueArray = [];

function drawGraph() {

    queueArray.push(myObject.queue.length);
    if (queueArray.length > 94) { 
        queueArray.shift();
    }

    // The top of the graph and bottom defined in pixels
        const pointsArr = [];
        const top = 25;
        const bot = 285;

            let x = 1;
                queueArray.forEach(queueLength => {
            const y = (1-(queueLength/25)) * (bot-top) + top;
                pointsArr.push([x, y]);
                 x += 6;
    });
    document.querySelector('#graph polyline').setAttribute('points', pointsArr.join(" "));
    let myDraw = document.querySelector('#graph polyline');
}

// The Storage being shown in the div on the right of the screen

let storage = myObject.storage;

function showStorage() {

    storage.forEach(function (item, index, array) {
        console.log(index,item);
        let thisStore = myObject.storage.find(function (element) {
            return element.amount === myObject.storage[index].amount;
            
        });
        document.querySelector(".storage").textContent ="We have " + myObject.storage[0].amount + " kegs left " + "of " +  storage[0].name;
        document.querySelector(".storage1").textContent ="We have " + myObject.storage[1].amount + " kegs left " + "of " +  storage[1].name;
        document.querySelector(".storage2").textContent ="We have " + myObject.storage[2].amount + " kegs left " + "of " +  storage[2].name;
        document.querySelector(".storage3").textContent ="We have " + myObject.storage[3].amount + " kegs left " + "of " +  storage[3].name;
        document.querySelector(".storage4").textContent ="We have " + myObject.storage[4].amount + " kegs left " + "of " +  storage[4].name;
        document.querySelector(".storage5").textContent ="We have " + myObject.storage[5].amount + " kegs left " + "of " +  storage[5].name;
        document.querySelector(".storage6").textContent ="We have " + myObject.storage[6].amount + " kegs left " + "of " +  storage[6].name;
        document.querySelector(".storage7").textContent ="We have " + myObject.storage[7].amount + " kegs left " + "of " +  storage[7].name;
        document.querySelector(".storage8").textContent ="We have " + myObject.storage[8].amount + " kegs left " + "of " +  storage[8].name;
        document.querySelector(".storage9").textContent ="We have " + myObject.storage[9].amount + " kegs left " + "of " +  storage[9].name;       
    })   
};

// The total of beers served

let totalBeers = 0;
    let lastCustomer = 0;
    function counting(myObj){
        document.querySelector("#countbeer").textContent = "Total of beers served: " + totalBeers;
        myObj.serving.forEach(servedCustomer=>{
            if(servedCustomer.id>lastCustomer){
            totalBeers += servedCustomer.order.length;
            lastCustomer = servedCustomer.id;
        }
        }) 
    }

// Calling the functions

showStorage();
baristas();
hideModal();
showQueue();
showNames();
showModalContent();
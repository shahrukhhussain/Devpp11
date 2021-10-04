let myDB = window.localStorage;
let ticketsContainer = document.querySelector(".tickets-container");
let allFilterClasses = ["red", "blue", "green", "yellow", "black"];
function loadTickets() {
  // [{} , {} , {} , {} , {}]......array of objects
  let allTickets = myDB.getItem("allTickets");
  if (allTickets) {
    allTickets = JSON.parse(allTickets);
    for (let i = 0; i < allTickets.length; i++) {
      let ticketInfoObject = allTickets[i];
      appendTicket(ticketInfoObject);
    }
  }
}
loadTickets();

function loadSelectedTickets(filter) {
  let allTickets = JSON.parse(myDB.getItem("allTickets"));
  for (let i = 0; i < allTickets.length; i++) {
    if (allTickets[i].ticketFilter == filter) {
      //allTickets[i] = ticketInfoObject
      appendTicket(allTickets[i]);
    }
  }
}

function saveTicketToDB(ticketInfoObject) {
  let allTickets = myDB.getItem("allTickets"); ////formed an array of key " allTickets"
  if (allTickets) {
    ///already tickets are present
    allTickets = JSON.parse(allTickets); ///get Item m object ki form m daalte h
    allTickets.push(ticketInfoObject);
    myDB.setItem("allTickets", JSON.stringify(allTickets));
  } else {
    ///already tickets are not present i.e ticket not found
    let allTickets = [ticketInfoObject];
    myDB.setItem("allTickets", JSON.stringify(allTickets));
  }
}

function appendTicket(ticketInfoObject) {
  let { ticketFilter, ticketValue, ticketId } = ticketInfoObject;
  let ticketDiv = document.createElement("div");
  ticketDiv.classList.add("ticket");
  ticketDiv.innerHTML = ` <div class="ticket-header ${ticketFilter}"></div>
      
      <div class="ticket-content">
          <div class="ticket-info">
              <div class="ticket-id"> #${ticketId}</div>
              <div class="Locked fas fa-lock"></div>
              <div class="UnLocked fas fa-lock-open"></div>
              <div class="ticket-delete far fa-trash-alt"></div>
          </div>
          <div class="ticket-value">${ticketValue}</div>
      </div>`;
  //    console.log(ticketInfoObject);

  let TicketHeadear = ticketDiv.querySelector(".ticket-header");
  TicketHeadear.addEventListener("click", function (e) {
    let currentFilter = e.target.classList[1];

    let indexOfcurrFilter = allFilterClasses.indexOf(currentFilter);
    let newIndex = (indexOfcurrFilter + 1) % allFilterClasses.length;
    let newFilter = allFilterClasses[newIndex];
    TicketHeadear.classList.remove(TicketHeadear.classList[1]);
    TicketHeadear.classList.add(newFilter);
  });
  let LockBtn = ticketDiv.querySelector(".Locked");
  let unLockBtn = ticketDiv.querySelector(".UnLocked");
  let LockButton = false;
  let UnLockButton = true;
  LockBtn.addEventListener("click" , function(e){
      LockButton = true;
  })
  unLockBtn.addEventListener("click" , function(e){
    UnLockButton = false;
  })
  let deleteTicketBtn = ticketDiv.querySelector(".ticket-delete");
  if(!LockButton || UnLockButton){
    deleteTicketBtn.addEventListener("click", function (e) {
      deleteTicket(ticketDiv, ticketId);
    });
  }
 
  // console.log(ticketsContainer);
  ticketsContainer.append(ticketDiv);
}

function deleteTicket(ticketDiv, ticketId) {
  ticketDiv.remove(); ///Removed From UI
  deleteTicketFromDB(ticketId);
}

function deleteTicketFromDB(ticketId) {
  let allTickets = JSON.parse(myDB.getItem("allTickets"));
  // [{}, {}, {}, {}]
  let updatedTickets = allTickets.filter(function (ticketInfoObject) {
    if (ticketInfoObject.ticketId == ticketId) {
      ////Database vala ticketInfoobject hai
      return false;
    }
    return true; ////database vali ticketId or jo hum delete
    ///// krna chah rhe hai vo same hogi to usko updated tickets m append nhi krenge
    ///// i.e vo ticket delete ho gyi
  });
  myDB.setItem("allTickets", JSON.stringify(updatedTickets));
}

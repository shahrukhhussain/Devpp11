let allFilters = document.querySelectorAll(".filter");
// let ticketsContainer = document.querySelectorAll(".tickets-container");

let openModal = document.querySelector(".open-modal");
let closeModal = document.querySelector(".close-modal");
let ticketModalopen = false;
let isTextTyped = false;

openModal.addEventListener("click", openTicketModal);
closeModal.addEventListener("click", closeTicketModal);

for (let i = 0; i < allFilters.length; i++) {
  allFilters[i].addEventListener("click", selectFilter);
}

function selectFilter(e) {
  // console.log(e);
  // let filterSelected = e.target.classList[1];
  // // console.log(filterSelected);
  // if (ticketsContainer.classList.length > 1) {
  //     ticketsContainer.classList.remove(ticketsContainer.classList[1])
  // }
  // ticketsContainer.classList.add(filterSelected);
  if (e.target.classList.contains("active-filter")) {
    // same filter again selected

    e.target.classList.remove("active-filter");
    ticketsContainer.innerHTML = "";
    loadTickets();
  } else {
    ///filter changed...i.e new filter selected
    if (document.querySelector(".active-filter")) {
      document
        .querySelector(".active-filter")
        .classList.remove("active-filter");
    }
    // console.log(e.target.classList)
    e.target.classList.add("active-filter");
    let filterClicked = e.target.classList[1];
    ticketsContainer.innerHTML = "";
    loadSelectedTickets(filterClicked);
  }
}

function openTicketModal(e) {
  if (ticketModalopen) {
    return;
  }
  let ticketModal = document.createElement("div");
  ticketModal.classList.add("ticket-modal");
  ticketModal.innerHTML = `<div class="ticket-text" contentEditable="true" spellcheck="false" >Enter Your Text Here!!</div>
    <div class="ticket-filters">
        <div class="ticket-filter red selected-filter"></div>
        <div class="ticket-filter blue"></div>
        <div class="ticket-filter green"></div>
        <div class="ticket-filter yellow"></div>
        <div class="ticket-filter black"></div>
    </div>`;
  document.querySelector("body").append(ticketModal);
  ticketModalpen = true;

  let TicketDiv = document.querySelector(".ticket-text"); ///querySelector is also runnable an any DOM element(node)
  TicketDiv.addEventListener("keypress", handlekeyPress);
  //   console.log(TicketDiv);
  let ticketfilters = ticketModal.querySelectorAll(".ticket-filter");
  for (let i = 0; i < ticketfilters.length; i++) {
    ticketfilters[i].addEventListener("click", function (e) {
      if (e.target.classList.contains("selected-filter")) {
        return;
      }

      document
        .querySelector(".selected-filter")
        .classList.remove("selected-filter");
      e.target.classList.add("selected-filter");
    });
  }
}

function handlekeyPress(e) {
  // console.log(e.key == "Enter" && isTextTyped)
  // e.target.textContent.length

  if (!isTextTyped) {
    isTextTyped = true;
    e.target.textContent = "";
  }
  if (e.key == "Enter" && isTextTyped && e.target.textContent) {
    let filterSelected =
      document.querySelector(".selected-filter").classList[1];
    let ticketId = uuid();
    let ticketInfoObject = {
      ticketFilter: filterSelected,
      ticketValue: e.target.textContent,
      ticketId: ticketId,
    };
    appendTicket(ticketInfoObject);
    // console.log(e.key);
    closeModal.click();
    saveTicketToDB(ticketInfoObject);
  }

  // console.log(e.key);
}

function closeTicketModal(e) {
  if (ticketModalpen) {
    document.querySelector(".ticket-modal").remove();
    ticketModalopen = false;
    isTextTyped = false;
  }
}

let array = [];
let b = document.getElementById("b");

fetch("https:jsonplaceholder.typicode.com/todos")
  .then((res) => res.json())
  .then((res) => todo(res));

function todo(data) {
  data = data.slice(0, 5);
  data.forEach((item) => {
    let obj = {
      type: "Normal-Task",
      title: item.title,
      explain: item.completed ? "Completed" : "Not Completed"
    };
    create_card(obj);
  });
}

function create_card(obj) {
  let card = document.createElement("div");
  card.className = "card";

  let type = document.createElement("h2");
  let title = document.createElement("b");
  let explain = document.createElement("p");

  type.textContent = obj.type;
  title.textContent = obj.title;
  explain.textContent = obj.explain;

  let threedot = document.createElement("button");
  threedot.innerHTML = "...";
  threedot.className = "threedot_btn";
  threedot.addEventListener("click", () => edit(obj, card));

  card.appendChild(threedot);
  card.appendChild(type);
  card.appendChild(title);
  card.appendChild(explain);

  setCardStyle(card, type);

  b.appendChild(card);
  array.push(obj);
}

function setCardStyle(card, typeElement) {
  if (typeElement.textContent === "Normal-Task") {
    card.style.backgroundColor = "rgb(233, 238, 144)";
    typeElement.style.color = "rgb(130, 130, 29)";
  } else if (typeElement.textContent === "Urgent-Task") {
    card.style.backgroundColor = "#10cbbb";
    typeElement.style.color = "#1013cb";
  } else {
    card.style.backgroundColor = "red";
    typeElement.style.color = "#cb1010";
  }
}

let add_btn = document.getElementById("add");
add_btn.addEventListener("click", () => {
  document.getElementById("add_todo").style.display = "block";
  document.getElementById("overlay").className = "overlay";
});

let add_save=document.getElementById("add_save")
add_save.addEventListener("click", add_card);

function add_card() {
  let obj = {
    title: document.getElementById("inp_todo").value,
    explain: document.getElementById("textarea").value,
    type: document.getElementById("dropdown").value
  };

  if (obj.title && obj.explain) {
    let card = document.createElement("div");
    card.className = "card";

    let type = document.createElement("h2");
    let title = document.createElement("b");
    let explain = document.createElement("p");

    type.textContent = obj.type;
    title.textContent = obj.title;
    explain.textContent = obj.explain;

    let threedot = document.createElement("button");
    threedot.innerHTML = "...";
    threedot.className = "threedot_btn";
    threedot.addEventListener("click", () => edit(obj, card));

    card.appendChild(threedot);
    card.appendChild(type);
    card.appendChild(title);
    card.appendChild(explain);

    setCardStyle(card, type);

    b.appendChild(card);
    array.push(obj);

    document.getElementById("add_todo").style.display = "none";
    document.getElementById("overlay").className = "";
  } else {
    alert("Please enter both task and description!");
  }


  document.getElementById("inp_todo").value = "";
  document.getElementById("textarea").value = "";
  document.getElementById("dropdown").value = "Normal-Task";
}

function edit(obj, card) {
  let edit_pop = document.getElementById("edit_popup");
  edit_pop.style.display = "block";
  let overlay = document.getElementById("overlay");
  overlay.className = "overlay";

  let edit_title_inp = document.getElementById("edit_title_inp");
  let edit_textarea = document.getElementById("edit_textarea");
  let edit_type_select = document.getElementById("edit_type_select");

  edit_title_inp.value = obj.title;
  edit_textarea.value = obj.explain;
  edit_type_select.value = obj.type;

  let edit_save = document.getElementById("edit_save");
  edit_save.onclick = () => {
    obj.title = edit_title_inp.value;
    obj.explain = edit_textarea.value;
    obj.type = edit_type_select.value;

    let typeElement = card.querySelector("h2");
    let titleElement = card.querySelector("b");
    let explainElement = card.querySelector("p");

    if (typeElement && titleElement && explainElement) {
      typeElement.textContent = obj.type;
      titleElement.textContent = obj.title;
      explainElement.textContent = obj.explain;

      setCardStyle(card, typeElement);
    }

    let index = array.findIndex(item => item === obj);
    if (index !== -1) {
      array[index] = { ...obj };
    }

    edit_pop.style.display = "none";
    overlay.className = "";
  };

  edit_delete.onclick = () => {
    if (confirm("Are you sure you want to delete this task?")) {
      card.remove();

      let index = array.findIndex(item => item === obj);
      if (index !== -1) {
        array.splice(index, 1);
      }


      edit_pop.style.display = "none";
      overlay.className = "";
    }
  };

  let edit_close = document.getElementById("edit_close");
  edit_close.onclick = () => {
    edit_pop.style.display = "none";
    overlay.className = "";
  };
}

document.querySelector(".close-btn").addEventListener("click", () => {
  document.getElementById("add_todo").style.display = "none";
  document.getElementById("overlay").className = "";
});

document.getElementById("edit_close").addEventListener("click", () => {
  document.getElementById("edit_popup").style.display = "none";
  document.getElementById("overlay").className = "";
});

document.getElementById("search").addEventListener("input", () => {
  let searchValue = document.getElementById("search").value.toLowerCase();
  let filteredArray = array.filter(obj => obj.title.toLowerCase().includes(searchValue));
  
  b.innerHTML = "";
  filteredArray.forEach(obj => {
    let card = document.createElement("div");
    card.className = "card";

    let type = document.createElement("h2");
    let title = document.createElement("b");
    let explain = document.createElement("p");

    type.textContent = obj.type;
    title.textContent = obj.title;
    explain.textContent = obj.explain;

    let threedot = document.createElement("button");
    threedot.innerHTML = "...";
    threedot.className = "threedot_btn";
    threedot.addEventListener("click", () => edit(obj, card));

    card.appendChild(threedot);
    card.appendChild(type);
    card.appendChild(title);
    card.appendChild(explain);

    setCardStyle(card, type);

    b.appendChild(card);
  });
});

const table = document.querySelector("table");
const input = document.getElementById("tableSearch");

async function fetchData() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const data = await response.json();

  const tr = table.appendChild(document.createElement("tr"));

  for (let key in data[0]) {
    let i = 0;
    const th = tr.appendChild(document.createElement("th"));
    th.innerHTML = key;
    if (key === "id" || key === "userId") {
      th.addEventListener("click", () => sortTableById(i));
    } else {
      th.addEventListener("click", () => sortTable(i));
    }
    i++;
  }

  for (let i = 0; i < data.length; i++) {
    const tr = table.appendChild(document.createElement("tr"));
    const dataItem = data[i];
    for (let key in data[i]) {
      const td = tr.appendChild(document.createElement("td"));
      td.innerHTML = dataItem[key];
    }
  }

  const arr = [10, 12, 15, 21];

  for (var i = 0; i < arr.length; i++) {
    console.log(arr[i] > 13 ? `Good: ${arr[i]}` : `Bad: ${arr[i]}`);
  }

  input.addEventListener("keyup", () => searchTable());
}

function sortTableById(n) {
  let rows,
    switching = true,
    i,
    x,
    y,
    shouldSwitch,
    dir = "asc",
    switchcount = 0;

  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < rows.length - 1; i++) {
      shouldSwitch = false;

      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];

      if (dir == "asc") {
        if (Number(x.innerHTML) > Number(y.innerHTML)) {
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (Number(x.innerHTML) < Number(y.innerHTML)) {
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount++;
    } else {
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

function sortTable(n) {
  let rows,
    switching = true,
    i,
    x,
    y,
    shouldSwitch,
    dir = "asc",
    switchcount = 0;
  while (switching) {
    switching = false;
    rows = table.rows;
    for (i = 1; i < rows.length - 1; i++) {
      shouldSwitch = false;
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      switchcount++;
    } else {
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}

function searchTable() {
  let filter, tr, td, i, txtValue;

  filter = input.value.toUpperCase();
  tr = table.getElementsByTagName("tr");

  if (filter.length > 2) {
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[2];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }
    }
  } else if (filter.length === 0) {
    for (i = 0; i < tr.length; i++) {
      tr[i].style.display = "";
    }
  }
}

fetchData();

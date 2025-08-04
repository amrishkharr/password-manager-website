// js/password-manager.js

import { db, auth } from "./firebase-config.js";
import {
  push,
  ref,
  set,
  onValue
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const form = document.getElementById("credForm");
const website = document.getElementById("website");
const username = document.getElementById("username");
const password = document.getElementById("password");
const credTable = document.querySelector("#credTable tbody");

auth.onAuthStateChanged((user) => {
  if (user) {
    const uid = user.uid;
    const credsRef = ref(db, `users/${uid}/credentials`);

    form.onsubmit = (e) => {
      e.preventDefault();

      const newRef = push(credsRef);
      set(newRef, {
        website: website.value,
        username: username.value,
        password: password.value
      });

      form.reset();
    };

    onValue(credsRef, (snapshot) => {
      credTable.innerHTML = "";
      snapshot.forEach((child) => {
        const data = child.val();
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${data.website}</td>
          <td>${data.username}</td>
          <td>${data.password}</td>
        `;
        credTable.appendChild(row);
      });
    });
  } else {
    window.location.href = "index.html";
  }
});

window.exportToExcel = () => {
  const wb = XLSX.utils.book_new();
  const data = [];

  const rows = credTable.querySelectorAll("tr");
  rows.forEach((row) => {
    const cells = row.querySelectorAll("td");
    data.push(Array.from(cells).map((cell) => cell.innerText));
  });

  const ws = XLSX.utils.aoa_to_sheet([["Website", "Username", "Password"], ...data]);
  XLSX.utils.book_append_sheet(wb, ws, "Passwords");
  XLSX.writeFile(wb, "passwords.xlsx");
};

function updateMailLink() {
  let content = "Website\tUsername\tPassword\n";
  const rows = credTable.querySelectorAll("tr");
  rows.forEach((row) => {
    const cells = row.querySelectorAll("td");
    content += `${cells[0].innerText}\t${cells[1].innerText}\t${cells[2].innerText}\n`;
  });

  const mailtoLink = `mailto:?subject=Password Export&body=${encodeURIComponent(content)}`;
  document.getElementById("mailLink").href = mailtoLink;
}

setInterval(updateMailLink, 1000);


// js/account.js
import { auth, db } from "./firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const form = document.getElementById("account-form");
const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
const genderInput = document.getElementById("gender");
const emailInput = document.getElementById("email");

onAuthStateChanged(auth, async (user) => {
  if (user) {
    const uid = user.uid;
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      emailInput.value = data.email;
      nameInput.value = data.name || "";
      phoneInput.value = data.phone || "";
      genderInput.value = data.gender || "";
    }
  } else {
    window.location.href = "index.html"; // redirect if not logged in
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const user = auth.currentUser;
  if (!user) return;

  const docRef = doc(db, "users", user.uid);
  await updateDoc(docRef, {
    name: nameInput.value,
    phone: phoneInput.value,
    gender: genderInput.value
  });

  document.getElementById("status-msg").textContent = "Profile updated successfully!";
});

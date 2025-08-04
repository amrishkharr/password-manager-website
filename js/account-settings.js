// js/account-settings.js

import { db, auth } from "./firebase-config.js";
import {
  ref,
  set,
  get,
  update
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const form = document.getElementById("profileForm");
const status = document.getElementById("status");
const fullName = document.getElementById("fullName");
const mobile = document.getElementById("mobile");
const gender = document.getElementById("gender");

auth.onAuthStateChanged((user) => {
  if (user) {
    const uid = user.uid;
    const profileRef = ref(db, `users/${uid}/profile`);

    // Fetch existing profile
    get(profileRef).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        fullName.value = data.fullName || "";
        mobile.value = data.mobile || "";
        gender.value = data.gender || "";
      }
    });

    // Save profile
    form.onsubmit = (e) => {
      e.preventDefault();

      update(profileRef, {
        fullName: fullName.value,
        mobile: mobile.value,
        gender: gender.value
      }).then(() => {
        status.textContent = "Profile updated successfully!";
      }).catch((err) => {
        status.textContent = "Error updating profile: " + err;
      });
    };
  } else {
    alert("Please login first.");
    window.location.href = "index.html";
  }
});

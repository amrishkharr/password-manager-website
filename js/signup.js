// js/signup.js
import { auth, db } from "./firebase-config.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Password generator function
function generatePassword(length = 12) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&!";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
}

const form = document.getElementById("signup-form");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const name = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = generatePassword();

  try {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);

    // Store user profile in Firestore
    await setDoc(doc(db, "users", userCred.user.uid), {
      name,
      email,
      password, // Store as-is (you can hash it later or use Firestore rules to secure)
      gender: "",
      phone: ""
    });

    // Show password to user
    document.getElementById("signup-form").style.display = "none";
    document.getElementById("password-container").style.display = "block";
    document.getElementById("generated-password").textContent = password;

  } catch (error) {
    alert("Signup Failed: " + error.message);
  }
});

// js/generator.js

// 1. Auto Generator
function generateAutoPassword(length = 12) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&!";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  document.getElementById("auto-password").textContent = password;
}

// 2. Constraint-Based Generator
function generateCustomPassword() {
  const length = parseInt(document.getElementById("length").value);
  const includeUpper = document.getElementById("includeUpper").checked;
  const includeLower = document.getElementById("includeLower").checked;
  const includeNumbers = document.getElementById("includeNumbers").checked;
  const includeSymbols = document.getElementById("includeSymbols").checked;

  let chars = "";
  if (includeUpper) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (includeLower) chars += "abcdefghijklmnopqrstuvwxyz";
  if (includeNumbers) chars += "0123456789";
  if (includeSymbols) chars += "@#$%&!";

  if (chars.length === 0) {
    alert("Select at least one character type.");
    return;
  }

  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  document.getElementById("custom-password").textContent = password;
}

// 3. Strength Checker
function checkStrength() {
  const password = document.getElementById("strengthInput").value;
  let strength = 0;

  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[a-z]/.test(password)) strength++;
  if (/\d/.test(password)) strength++;
  if (/[@#$%&!]/.test(password)) strength++;

  let result = "";
  switch (strength) {
    case 5:
    case 4:
      result = "Strong 🔐";
      break;
    case 3:
      result = "Medium 🔧";
      break;
    case 1:
    case 2:
      result = "Weak ⚠️";
      break;
    default:
      result = "Very Weak ❌";
  }

  document.getElementById("strength-result").textContent = "Strength: " + result;
}

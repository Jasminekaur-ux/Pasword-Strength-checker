// Get references to important elements
const passwordInput = document.getElementById("password");
const togglePasswordButton = document.getElementById("togglePassword");
const strengthBar = document.getElementById("strengthBar");
const strengthText = document.getElementById("strengthText");
const tipText = document.getElementById("tipText");

// Checklist items for each rule
const lengthItem = document.getElementById("rule-length");
const lowercaseItem = document.getElementById("rule-lowercase");
const uppercaseItem = document.getElementById("rule-uppercase");
const numberItem = document.getElementById("rule-number");
const specialItem = document.getElementById("rule-special");

// Helper function: mark checklist item as valid or invalid
function updateChecklistItem(listItem, isValid) {
  const iconSpan = listItem.querySelector(".checklist__icon");

  if (isValid) {
    listItem.classList.add("checklist__item--valid");
    listItem.classList.remove("checklist__item--invalid");
    iconSpan.textContent = "✓";
  } else {
    listItem.classList.add("checklist__item--invalid");
    listItem.classList.remove("checklist__item--valid");
    iconSpan.textContent = "✗";
  }
}

// Helper function: calculate password score based on simple rules
function calculatePasswordScore(password) {
  let score = 0;

  // Rule 1: length at least 8 characters
  const hasMinLength = password.length >= 8;
  updateChecklistItem(lengthItem, hasMinLength);
  if (hasMinLength) score++;

  // Rule 2: contains lowercase letter
  const hasLowercase = /[a-z]/.test(password);
  updateChecklistItem(lowercaseItem, hasLowercase);
  if (hasLowercase) score++;

  // Rule 3: contains uppercase letter
  const hasUppercase = /[A-Z]/.test(password);
  updateChecklistItem(uppercaseItem, hasUppercase);
  if (hasUppercase) score++;

  // Rule 4: contains number
  const hasNumber = /[0-9]/.test(password);
  updateChecklistItem(numberItem, hasNumber);
  if (hasNumber) score++;

  // Rule 5: contains special character
  const hasSpecial = /[!@#$%^&*(),.?":{}|<>_\-\\/\[\];'+=]/.test(password);
  updateChecklistItem(specialItem, hasSpecial);
  if (hasSpecial) score++;

  return score;
}

// Helper function: map score to bar properties and label
function updateStrengthDisplay(score, passwordLength) {
  let widthPercent = 0;
  let color = "#ef4444"; // red
  let label = "Very Weak";

  // If no password typed, reset message
  if (passwordLength === 0) {
    strengthBar.style.width = "0%";
    strengthBar.style.backgroundColor = color;
    strengthText.textContent = "Start typing to check strength";
    tipText.textContent =
      "Tip: Use a mix of letters, numbers, and symbols to create a stronger password.";
    return;
  }

  // Score is from 0 to 5
  if (score <= 1) {
    widthPercent = 20;
    color = "#ef4444"; // red
    label = "Very Weak";
    tipText.textContent =
      "Very weak: Try adding more characters, including uppercase letters, numbers, and symbols.";
  } else if (score === 2) {
    widthPercent = 40;
    color = "#f97316"; // orange
    label = "Weak";
    tipText.textContent =
      "Weak: Add more variety (uppercase, lowercase, numbers, symbols) and increase length.";
  } else if (score === 3) {
    widthPercent = 60;
    color = "#eab308"; // yellow
    label = "Medium";
    tipText.textContent =
      "Medium: Good start! Make it longer and less predictable to improve security.";
  } else if (score === 4) {
    widthPercent = 80;
    color = "#22c55e"; // light green
    label = "Strong";
    tipText.textContent =
      "Strong: For even better security, use a long passphrase or unique words.";
  } else if (score === 5) {
    widthPercent = 100;
    color = "#16a34a"; // green
    label = "Very Strong";
    tipText.textContent =
      "Very strong: Great! Remember to use different passwords for different accounts.";
  }

  strengthBar.style.width = widthPercent + "%";
  strengthBar.style.backgroundColor = color;
  strengthText.textContent = label;
}

// Event: run strength check whenever the user types in the password field
passwordInput.addEventListener("input", function () {
  const password = passwordInput.value;
  const score = calculatePasswordScore(password);

  updateStrengthDisplay(score, password.length);
});

// Event: Show / Hide password when button is clicked
togglePasswordButton.addEventListener("click", function () {
  // If current type is password, switch to text (show), otherwise back to password (hide)
  const isHidden = passwordInput.type === "password";

  if (isHidden) {
    passwordInput.type = "text";
    togglePasswordButton.textContent = "Hide";
  } else {
    passwordInput.type = "password";
    togglePasswordButton.textContent = "Show";
  }
});


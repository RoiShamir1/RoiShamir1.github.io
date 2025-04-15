// Roi Shamir 212052047, Yuval Madmon 209377423
document.addEventListener("DOMContentLoaded", () => {
  // אתחול בסיס ברירת מחדל
  let fromBase = 10;
  let toBase = 10;

  // פונקציה המאחתלת את הבסיס בעקבות הלחיצה
  const buttons = document.querySelectorAll("button");
  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const base = btn.innerText;
      if (btn.parentElement.innerText.includes("FROM")) {
        fromBase = getBaseFromBase(base);
        highlightGroupButton(btn, "from");
      } else {
        toBase = getBaseFromBase(base);
        highlightGroupButton(btn, "to");
      }
    });
  });

  function getBaseFromBase(base) {
    if (base.includes("Binary")) return 2;
    if (base.includes("Octal")) return 8;
    if (base.includes("Decimal")) return 10;
    if (base.includes("Hexadecimal")) return 16;
    return 10;
  }

  //let errorMessage = "";

  // ערך הבסיס המומר והממיר בקטן
  function toSubscript(num) {
    const subscriptDigits = ["₀", "₁", "₂", "₃", "₄", "₅", "₆", "₇", "₈", "₉"];
    return num
      .toString()
      .split("")
      .map((d) => subscriptDigits[d] || "")
      .join("");
  }

  // בלחיצה על כפתור הכפתור מקבל את הקלאס selected
  const buttonClicked = document.querySelectorAll("button");
  buttonClicked.forEach((btn) => {
    btn.addEventListener("click", () => {
      const base = btn.innerText;
      const parent = btn.parentElement.id;

      if (parent === "from-section") {
        fromBase = getBaseFromBase(base);
        highlightGroupButton(btn, "from-section");
      } else if (parent === "to-section") {
        toBase = getBaseFromBase(base);
        highlightGroupButton(btn, "to-section");
      }
    });
  });

  function highlightGroupButton(clickedButton, groupId) {
    const groupButtons = document.querySelectorAll(`#${groupId} button`);
    groupButtons.forEach((btn) => btn.classList.remove("selected"));
    clickedButton.classList.add("selected");
  }

  // פונקציה לתקינות הקלט
  function isValidInput(input, base) {
    const patterns = {
      2: /^[01]+$/,
      8: /^[0-7]+$/,
      10: /^[0-9]+$/,
      16: /^[0-9a-fA-F]+$/,
    };
    return patterns[base].test(input);
  }

  // פונקציית ההמרה עצמה
  document
    .querySelector('input[type="submit"]')
    .addEventListener("click", () => {
      const input = document.getElementById("number").value.trim();
      const resultElement = document.getElementById("result");

      // במידה והקלט לא תקין
      if (!isValidInput(input, fromBase)) {
        //errorMessage = "Number is not valid, try again";
        alert("Number is not valid, try again");
      }

      try {
        const decimalValue = parseInt(input, fromBase);
        if (isNaN(decimalValue)) {
          resultElement.textContent = "Invalid number for selected base.";
          return;
        }

        const convertedValue = decimalValue.toString(toBase).toUpperCase();

        resultElement.textContent = `${input}${toSubscript(
          fromBase
        )} = ${convertedValue}${toSubscript(toBase)}`;

        document.getElementById("number").value = "";
      } catch (err) {
        resultElement.textContent = "Conversion error.";
      }
    });
});

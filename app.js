const box = document.getElementById("neumorphism-box");
const radiusInput = document.getElementById("radius");
const blurInput = document.getElementById("blur");
const distanceInput = document.getElementById("distance");
const colorInput = document.getElementById("color");
const intensityInput = document.getElementById("intensity");
const intensityinput2 = document.querySelector(".intensity2");

var simpleoutput = document.getElementById("sameColor").checked;
var gradient1output = document.getElementById("gradient1").checked;
var gradient2output = document.getElementById("gradient2").checked;
var insetoutput = document.getElementById("inset").checked;

let clickedButton = "";

function updateBox() {
  const radius = radiusInput.value + "px";
  const blur = blurInput.value + "px";
  const distance = distanceInput.value + "px";
  const Boxcolor = colorInput.value;
  const intensity = intensityInput.value;
  const intensity2 = intensityinput2.value;

  // Map the intensity value to a color value
  const color = interpolateColor("#dedede", "#5a5a5a", intensity);
  const color1 = interpolateColor("#ffffff", "#e2e2e2", intensity2);

  switch (clickedButton) {
    case "sameColor":
      box.style.background = Boxcolor;
      box.style.borderRadius = radius;
      box.style.boxShadow = ` ${distance} ${distance} ${blur} ${color}, -${distance} -${distance} ${blur} ${color1}`;
      break;
    case "gradient1":
      box.style.background = "linear-gradient(145deg, #cacaca, #f0f0f0)";
      box.style.borderRadius = radius;
      box.style.boxShadow = ` ${distance} ${distance} ${blur} ${color}, -${distance} -${distance} ${blur} ${color1}`;
      break;
    case "gradient2":
      box.style.background = "linear-gradient(145deg, #f0f0f0, #cacaca)";
      box.style.borderRadius = radius;
      box.style.boxShadow = ` ${distance} ${distance} ${blur} ${color}, -${distance} -${distance} ${blur} ${color1}`;
      break;
    case "inset":
      box.style.background = Boxcolor;
      box.style.borderRadius = radius;
      box.style.boxShadow = `inset ${distance} ${distance} ${blur} ${color}, inset -${distance} -${distance} ${blur} ${color1}`;
      break;
    case "insetreverse":
      box.style.background = Boxcolor;
      box.style.borderRadius = radius;
      box.style.boxShadow = `inset ${distance} ${distance} ${blur} ${color1}, inset -${distance} -${distance} ${blur} ${color}`;
      break;
    default:
      box.style.background = Boxcolor;
      box.style.borderRadius = radius;
      box.style.boxShadow = ` ${distance} ${distance} ${blur} ${color}, -${distance} -${distance} ${blur} ${color1}`;
  }

  updateCode();
}

radiusInput.addEventListener("input", updateBox);
blurInput.addEventListener("input", updateBox);
colorInput.addEventListener("input", updateBox);
intensityInput.addEventListener("input", updateBox);
intensityinput2.addEventListener("input", updateBox);
distanceInput.addEventListener("input", function () {
  // Set the blur input value to be double the distance input value
  blurInput.value = distanceInput.value * 2;
  // Trigger the updateBox function to reflect the changes
  updateBox();
});

function updateCode() {
  const radius = radiusInput.value + "px";
  const blur = blurInput.value + "px";
  const distance = distanceInput.value + "px";
  const intensity = intensityInput.value;
  const intensity2 = intensityinput2.value;
  const color = interpolateColor("#dedede", "#5a5a5a", intensity);
  const color1 = interpolateColor("#e2e2e2", "#ffffff", intensity2);

  if (clickedButton == "inset" || clickedButton == "insetreverse") {
    const codeElement = document.querySelector("pre code");
    codeElement.innerHTML = `<span class="token">border-radius</span><span class="token values">:</span> ${radius}<span class="token values">;</span>
  <span class="token">background</span><span class="token values">:</span> ${box.style.background}<span class="token values">;</span>
  <span class="token">box-shadow</span><span class="token values">:</span> inset ${distance} ${distance} ${blur} ${color}<span class="token values">,</span>
               inset -${distance} -${distance} ${blur} ${color1}<span class="token values">;</span>`;
  } else {
    const codeElement = document.querySelector("pre code");
    codeElement.innerHTML = `<span class="token">border-radius</span><span class="token values">:</span> ${radius}<span class="token values">;</span>
    <span class="token">background</span><span class="token values">:</span> ${box.style.background}<span class="token values">;</span>
    <span class="token">box-shadow</span><span class="token values">:</span>  ${distance} ${distance} ${blur} ${color}<span class="token values">,</span>
                -${distance} -${distance} ${blur} ${color1}<span class="token values">;</span>`;
  }
}

// Call updateCode whenever any input changes
radiusInput.addEventListener("input", updateCode);
blurInput.addEventListener("input", updateCode);
distanceInput.addEventListener("input", updateCode);
intensityInput.addEventListener("input", updateCode);
intensityinput2.addEventListener("input", updateCode);
colorInput.addEventListener("input", updateCode);

// Function to interpolate between two colors
function interpolateColor(color1, color2, factor) {
  let result = color1
    .slice(1)
    .match(/.{2}/g)
    .map((hex) => parseInt(hex, 16))
    .map((val, i) =>
      Math.floor(
        val + factor * (parseInt(color2.slice(1).match(/.{2}/g)[i], 16) - val)
      )
    )
    .map((val) => val.toString(16).padStart(2, "0"))
    .join("");
  return "#" + result;
}

document.addEventListener("DOMContentLoaded", function () {
  const radioButtons = document.querySelectorAll(".selector");

  radioButtons.forEach(function (radioButton) {
    radioButton.addEventListener("click", function () {
      if (radioButton.value == "simple") {
        clickedButton = "simple";
      } else if (radioButton.value == "gradient1") {
        clickedButton = "gradient1";
      } else if (radioButton.value == "gradient2") {
        clickedButton = "gradient2";
      } else if (radioButton.value == "inset0") {
        clickedButton = "inset";
      } else if (radioButton.value == "inset1") {
        clickedButton = "insetreverse";
      }
    });
  });
});

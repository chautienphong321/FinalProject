//////////////////////////////////////////////////////////////////////////
// Customize page
//////////////////////////////////////////////////////////////////////////
let color = "black";
let kind = "shirt";
let pattern = "bolt";
let patternColor = "white";
let patternPosition = "topright";
let imageElement = $("#customize-image");
let patternElement = $("#customize-pattern");

function changeColor(pColor, button) {
  color = pColor;

  imageElement.attr(
    "src",
    "/assets/img/customize/" + kind + "-" + color + ".png"
  );

  $(".btn-change-color>button").attr("class", "btn btn-outline-dark");
  button.removeClass("btn-outline-dark").addClass("btn-dark");
}

function changeKind(pKind, button) {
  kind = pKind;
  var shirtColor = ["black", "blue", "brown", "green", "purple", "red"];
  var poloColor = ["black", "brown", "green", "pink"];
  var hoodieColor = ["black", "brown", "grey", "white"];

  $(".btn-change-kind>button").attr("class", "btn btn-outline-dark");
  button.removeClass("btn-outline-dark").addClass("btn-dark");

  $(".btn-change-color>button").remove();
  if (kind == "polo") {
    for (var i = 0; i < poloColor.length; i++) {
      $(".btn-change-color").append(
        "<button type='button' class='btn btn-outline-dark' onclick='changeColor(\"" +
          poloColor[i] +
          "\", $(this))'>" +
          poloColor[i].toUpperCase() +
          "</button>"
      );
    }
  } else if (kind == "hoodie") {
    for (var i = 0; i < hoodieColor.length; i++) {
      $(".btn-change-color").append(
        "<button type='button' class='btn btn-outline-dark' onclick='changeColor(\"" +
          hoodieColor[i] +
          "\", $(this))'>" +
          hoodieColor[i].toUpperCase() +
          "</button>"
      );
    }
  } else if (kind == "shirt") {
    for (var i = 0; i < shirtColor.length; i++) {
      $(".btn-change-color").append(
        "<button type='button' class='btn btn-outline-dark' onclick='changeColor(\"" +
          shirtColor[i] +
          "\", $(this))'>" +
          shirtColor[i].toUpperCase() +
          "</button>"
      );
    }
  }

  $(".btn-change-color>button:first-child").attr("class", "btn btn-dark");

  imageElement.attr(
    "src",
    "/assets/img/customize/" + kind + "-" + color + ".png"
  );
}

function changePattern(pPattern, button) {
  pattern = pPattern;

  patternElement.attr("class", "fa-2x fa-solid fa-" + pPattern);

  $(".btn-change-pattern>button").attr("class", "btn btn-outline-dark");
  button.removeClass("btn-outline-dark").addClass("btn-dark");
}

function changePatternColor(pPatternColor, button) {
  patternColor = pPatternColor;

  patternElement.attr("style", "color:" + pPatternColor);

  $(".btn-change-pattern-color>button").attr("class", "btn btn-outline-dark");
  button.removeClass("btn-outline-dark").addClass("btn-dark");
}

function changePatternPosition(pPatternPosition, button) {
  patternPosition = pPatternPosition;
  var topRight = "top: 25%; left: 65%;";
  var topLeft = "top: 25%; left: 35%;";
  var center = "top: 40%; left: 48%;";
  var bottomRight = "top: 75%; left: 60%;";
  var bottomLeft = "top: 75%; left: 30%;";
  var position;

  switch (pPatternPosition) {
    case "topright":
      position = topRight;
      break;
    case "topleft":
      position = topLeft;
      break;
    case "center":
      position = center;
      break;
    case "bottomright":
      position = bottomRight;
      break;
    case "bottomleft":
      position = bottomLeft;
      break;
    default:
      break;
  }

  $(".pattern-container")
    .removeClass("pattern-position")
    .attr("style", position);

  $(".btn-change-pattern-position>button").attr(
    "class",
    "btn btn-outline-dark"
  );
  button.removeClass("btn-outline-dark").addClass("btn-dark");
}

function handleImageExist() {
  color = "black";
  imageElement.attr(
    "src",
    "/assets/img/customize/" + kind + "-" + color + ".png"
  );
}

//////////////////////////////////////////////////////////////////////////
// End customize page
//////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////
// Hello text
//////////////////////////////////////////////////////////////////////////
var helloUserText = $("#hello-user-text").text();
$("#hello-user-text").hover(
  function () {
    $(this).text("Logout");
  },
  function () {
    $(this).text(helloUserText);
  }
);

function logout() {
  window.location.href = "/logout";
}
//////////////////////////////////////////////////////////////////////////
// End Hello text
//////////////////////////////////////////////////////////////////////////

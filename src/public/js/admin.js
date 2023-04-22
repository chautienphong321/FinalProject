function pasteTextToNearestInput(button) {
  const input = $(button).closest(".input-group").find("input");
  navigator.clipboard.readText().then((text) => {
    input.val(text);
  });
}

function previewImage(button) {
  const input = $(button).closest(".input-group").find("input");
  $("#imagePreview").attr("src", input.val());
}

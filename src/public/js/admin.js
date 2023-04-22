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

function formatCurrency(input) {
  const numericValue = input.value.replace(/[^0-9]/g, "");

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
  const formattedValue = formatter.format(numericValue / 100);

  input.value = formattedValue;
  $('input[name="price"]').val(numericValue);
}

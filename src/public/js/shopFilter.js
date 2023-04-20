let shopFilterEle = $(".shop-filter-container>div");
var dataFilter = "*";
var priceFilter = 4000;

$(document).ready(function () {
  if (shopFilterEle) {
    let shopFilters = $("#shop-flters li");

    shopFilters.on("click", function (e) {
      e.preventDefault();
      shopFilters.each(function () {
        $(this).removeClass("filter-active");
      });
      $(this).addClass("filter-active");

      dataFilter = $(this).attr("data-filter");
      handleFilter();
    });

    //////////////////////////////////////////////////////////////////////////
    // Input range change
    //////////////////////////////////////////////////////////////////////////
    const range = document.getElementById("price-range");
    const rangeValue = document.querySelector(".range-value");

    range.addEventListener("input", (event) => {
      priceFilter = event.target.value * 50;

      // Handle value on input range
      const value =
        "$" +
        parseFloat(priceFilter).toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
      rangeValue.textContent = value;
      rangeValue.style.left = `calc(${event.target.value} * 1%)`;
      rangeValue.style.setProperty("--value", `'${value}'`);

      handleFilter();
    });

    //////////////////////////////////////////////////////////////////////////
    // Input range change
    //////////////////////////////////////////////////////////////////////////
  }
});

function handleFilter() {
  var items = $(".shop-filter-item");

  for (var i = 0; i < items.length; i++) {
    if (
      dataFilter == "*" &&
      items.eq(i).find(".item-price").attr("value") < priceFilter
    ) {
      $(items[i]).show();
      $(items[i]).removeClass(function (index, className) {
        return className
          .split(" ")
          .filter((c) => c.includes("w-"))
          .join(" ");
      });
      $(items[i]).addClass("w-25");
    } else if (
      $(items[i]).hasClass(dataFilter) &&
      items.eq(i).find(".item-price").attr("value") < priceFilter
    ) {
      $(items[i]).show();
      $(items[i]).removeClass(function (index, className) {
        return className
          .split(" ")
          .filter((c) => c.includes("w-"))
          .join(" ");
      });
      $(items[i]).addClass("w-25");
    } else {
      $(items[i]).hide();
      $(items[i]).removeClass(function (index, className) {
        return className
          .split(" ")
          .filter((c) => c.includes("col-"))
          .join(" ");
      });
    }
  }
}

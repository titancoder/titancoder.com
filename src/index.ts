import * as dotenv from "dotenv";
import * as path from "path";
dotenv.config();
require("./images/favicon.png");
//@ts-ignore
import { Loading } from "notiflix";
import "../src/styles.scss";

Loading.Init({
  svgColor: "#8A2BE2",
});

$("#nav_menu").hide();
$("#toggle_menu").click(function () {
  $("#nav_menu").slideToggle();
});

{
  let length = document.querySelectorAll("#quotes span").length;
  let index = 1;

  const displayQuotes = () => {
    $(`#quotes span:nth-child(${index})`)
      .fadeIn(2000)
      .delay(10000)
      .fadeOut(2000, () => {
        index === length ? (index = 1) : index++;
        displayQuotes();
      });
  };

  setTimeout(() => {
    displayQuotes();
  }, 3000);
}

$("#contact-form").on("submit", async (e) => {
  e.preventDefault();
  const name = $('[name="name"]').val();
  const email = $('[name="email"]').val();
  const message = $('[name="message"]').val();

  Loading.Arrows("Sending...");
  fetch(
    "https://ha6jmvmwk2.execute-api.ap-south-1.amazonaws.com/live/contact",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": "x4uSeTeYAw3VStG6EvYXi18p6JkCTv0U8eW9nPW7",
      },
      body: JSON.stringify({ name, email, message }),
    }
  )
    .then((response) => response.json())
    .then((data) => {
      Loading.Remove();
      $("#contact-form")
        .trigger("reset")
        .hide(0, function () {
          $("#submit-message").removeClass("hide");
        });
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

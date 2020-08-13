import * as dotenv from "dotenv";
import * as path from "path";
dotenv.config({ path: path.resolve("/.env") });
import "../src/styles.scss";

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
  fetch(process.env.CONTACT_API!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Api-Key": process.env.API_KEY!,
    },
    body: JSON.stringify({ name, email, message }),
  })
    .then((response) => response.json())
    .then((data) => {
      $("#contact-form").trigger("reset");
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

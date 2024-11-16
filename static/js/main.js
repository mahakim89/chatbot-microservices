$(document).ready(function () {
    // Single message sending function
    function sendMessage(userInput) {
        if (!userInput || userInput.trim() === "") {
            return;
        }

        addMessage("User", userInput);
        $("#user-input").val("");

        $("#typing-indicator").show();
        let loadingAnimation = showLoadingAnimation();

        $.ajax({
            type: "POST",
            url: "/chat",
            data: JSON.stringify({
                message: userInput.trim(),
                model: $("#modelSelect").val(),
            }),
            contentType: "application/json",
            success: function (data) {
                clearInterval(loadingAnimation);
                $("#typing-indicator").hide();
                addMessage("Bot", data.response);
            },
            error: function (jqXHR) {
                clearInterval(loadingAnimation);
                $("#typing-indicator").hide();
                console.log("Error:", jqXHR.responseJSON);
                addMessage(
                    "Bot",
                    "Error: " +
                    (jqXHR.responseJSON
                        ? jqXHR.responseJSON.error
                        : "Unknown error occurred")
                );
            },
        });
    }

    // ONLY these two event handlers for sending messages
    // Button click handler
    $("#send-btn").click(function () {
        const userInput = $("#user-input").val().trim();
        if (userInput) {
            sendMessage(userInput);
        }
    });

    // Enter key handler
    $("#user-input").keydown(function (e) {
        if (e.keyCode === 13 && !e.shiftKey) {
            e.preventDefault();
            const userInput = $(this).val().trim();
            if (userInput) {
                sendMessage(userInput);
            }
        }
    });
});

// Keep addMessage function outside document.ready
function addMessage(sender, message) {
    const isUser = sender === "User";
    const messageHtml = `
        <div class="d-flex flex-row justify-content-${isUser ? "end" : "start"
        } mb-4">
          ${!isUser
            ? `<img src="/static/images/bot-avatar.png" alt="bot" class="rounded-circle me-2" style="width: 40px; height: 40px;">`
            : ""
        }
          <div class="message-bubble ${isUser ? "bg-primary text-white" : "bg-white"
        }">
            <p class="mb-0">${message}</p>
            <small class="text-${isUser ? "light" : "muted"
        } d-block mt-1">${new Date().toLocaleTimeString()}</small>
          </div>
          ${isUser
            ? `<img src="/static/images/user-avatar.png" alt="user" class="rounded-circle ms-2" style="width: 40px; height: 40px;">`
            : ""
        }
        </div>
      `;
    $("#chat-area").append(messageHtml);
    $("#chat-area").scrollTop($("#chat-area")[0].scrollHeight);
}

// Add this loading animation function
function showLoadingAnimation() {
    const dots = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
    let i = 0;

    return setInterval(() => {
        $("#typing-indicator").text(`Bot is thinking ${dots[i]} `);
        i = (i + 1) % dots.length;
    }, 80);
}

// Theme handling
$("#themeSelect").change(function () {
    const theme = $(this).val();
    if (theme === "dark") {
        $("body").addClass("dark-theme");
        $(".card").css("background-color", "#1a1a1a");
        $(".message-bubble:not(.bg-primary)").css(
            "background-color",
            "#2d2d2d"
        );
        $(".message-bubble:not(.bg-primary)").css("color", "#ffffff");
    } else {
        $("body").removeClass("dark-theme");
        $(".card").css("background-color", "#ffffff");
        $(".message-bubble:not(.bg-primary)").css(
            "background-color",
            "#f8f9fa"
        );
        $(".message-bubble:not(.bg-primary)").css("color", "#212529");
    }
    // Save theme preference
    localStorage.setItem("chatTheme", theme);
});

// Font size handling
$("#fontSize").change(function () {
    const size = $(this).val();
    $("#chat-area").css("font-size", size + "px");
    $(".message-bubble").css("font-size", size + "px");
    // Save font size preference
    localStorage.setItem("chatFontSize", size);
});

// Load saved preferences
const savedTheme = localStorage.getItem("chatTheme");
const savedFontSize = localStorage.getItem("chatFontSize");

if (savedTheme) {
    $("#themeSelect").val(savedTheme).trigger("change");
}
if (savedFontSize) {
    $("#fontSize").val(savedFontSize).trigger("change");
}

// Add a close button to the modal
$(".modal-footer").html(`
    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
    <button type="button" class="btn btn-primary" data-dismiss="modal">Save changes</button>
  `);

// Update gear icon click handler
$(".fa-cog")
    .parent()
    .click(function () {
        $("#settingsModal").modal("show");
    });

// Handle settings changes
$("#themeSelect").change(function () {
    const theme = $(this).val();
    $("body").toggleClass("dark-theme", theme === "dark");
});

$("#fontSize").change(function () {
    const size = $(this).val();
    $("#chat-area").css("font-size", size + "px");
});

// Model selection handling
$("#modelSelect").change(function () {
    const model = $(this).val();
    // Store the selected model in localStorage
    localStorage.setItem("chatModel", model);
});

// Load saved model preference
const savedModel = localStorage.getItem("chatModel");
if (savedModel) {
    $("#modelSelect").val(savedModel);
}
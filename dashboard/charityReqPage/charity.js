let minimize_chat = document.querySelector(".minimize-chat");
let chat_minimized = false;

minimize_chat.addEventListener("click", () => {
    if(chat_minimized == false) {
        chat_minimized = true
        document.querySelector(".miniChatWidget").style.bottom = "-38.25%";
    } else {
        chat_minimized = false
        document.querySelector(".miniChatWidget").style.bottom = "0%";
    }
});
const firebaseConfig = {
//hidden
};

firebase.initializeApp(firebaseConfig);

function fetchAndDisplayChats() {
    const database = firebase.database();
    const chatsRef = database.ref('chats');

    chatsRef.once('value', function(snapshot) {
        const chats = snapshot.val();
        const chatContainer = document.querySelector('.chat-container');

        for (const chatId in chats) {
            if (chats.hasOwnProperty(chatId)) {
                const chat = chats[chatId];

                const chatWidget = document.createElement('div');
                chatWidget.className = 'miniChatWidget';

                const chatWidgetHeader = document.createElement('div');
                chatWidgetHeader.className = 'chatWidgetHeader';
                chatWidgetHeader.innerHTML = `
                    <h2>Chat</h2>
                    <i style="margin-left: 10px;" class="fa-solid fa-comment"></i>
                `;
                chatWidget.appendChild(chatWidgetHeader);

                const chatWidgetContent = document.createElement('div');
                chatWidgetContent.className = 'miniChatWidgetContent';

                const chatMessages = document.createElement('div');
                chatMessages.id = `chat-messages-${chatId}`;
                chatMessages.className = 'chat-messages';
                chatWidgetContent.appendChild(chatMessages);

                const inputContainer = document.createElement('div');
                inputContainer.className = 'input-container';
                inputContainer.innerHTML = `
                    <input type="text" class="message-input" placeholder="Type your message...">
                    <button class="send-button"><i class="fa-solid fa-paper-plane"></i></button>
                `;
                chatWidgetContent.appendChild(inputContainer);

                chatWidget.appendChild(chatWidgetContent);

                chatContainer.appendChild(chatWidget);

function displayMessages() {
    const chatMessagesElement = document.getElementById(`chat-messages-${chatId}`);
    chatMessagesElement.innerHTML = ''; // Clear previous messages

    let messages = chat.messages || [];
    if (!Array.isArray(messages)) {
        messages = Object.values(messages);
    }

    messages.forEach((message) => {
        const messageElement = document.createElement('div');
        messageElement.textContent = `[${message.sender}] ${message.text}`;
        chatMessagesElement.appendChild(messageElement);
    });
}

                const messageInput = chatWidgetContent.querySelector('.message-input');
                const sendButton = chatWidgetContent.querySelector('.send-button');
                sendButton.addEventListener('click', function () {
                    const messageText = messageInput.value;
                    const sender = "admin"; 

                    if (messageText.trim() !== '') {
                        const newMessage = {
                            sender: sender,
                            text: messageText,
                            timestamp: firebase.database.ServerValue.TIMESTAMP,
                        };

                        database.ref(`chats/${chatId}/messages`).push(newMessage);
                    }

                    messageInput.value = '';
                });

                database.ref(`chats/${chatId}/messages`).on('child_added', function () {
                    displayMessages();
                });

                displayMessages();
            }
        }
    });
}

fetchAndDisplayChats();

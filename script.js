const chatInput=document.querySelector(".chat-input textarea");
const sendChatBtn=document.querySelector(".chat-input span");
const chatbox=document.querySelector(".chatbox");
const chatbotToggler=document.querySelector(".chatbot-toggler");
const API_KEY="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";
let userMesasage;

const createChatLi=(message,className)=>{
    const chatLi=document.createElement("li");
    chatLi.classList.add("chat",className);
    let chatContent=className==="outgoing"? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span> <p></p>`;
    chatLi.innerHTML=chatContent;
    chatLi.querySelector("p").textContent=message;
    return chatLi;

}
const generateResponse=(incomingchatLI)=>{
    const API_URL="https://api.openai.com/v1/chat/completions";
    const messageElement=incomingchatLI.querySelector("p");
    const requestOption={
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "Authorization":`Bearer${API_KEY}`
        },
        body:JSON.stringify({
            model:"gpt-3,5-turbo",
            messages:[{role:"user",content:userMesasage}]
        })
    }
    fetch(API_URL, requestOption).then(res =>res.json()).then(data=>{
        messageElement.textContent=data.choices[0].message.content;
    }).catch((error)=>{
        messageElement.textContent="Oops! something went wrong.Please try again";
        
    }).finally(()=>chatbox.scrollTo(0,chatbox,scrollHeight));
}

const handleChat=()=>{
    userMesasage=chatInput.value.trim();
    if(!userMesasage)return;
    chatbox.appendChild(createChatLi(userMesasage,"outgoing"));
    chatbox.scrollTo(0,chatbox.scrollHeight);
    setTimeout(()=>{
        const incomingchatLI=createChatLi("Thinking...","incoming")
        chatbox.appendChild(incomingchatLI);
        generateResponse(incomingchatLI);
    },600);
}
sendChatBtn.addEventListener("click", handleChat);
chatbotToggler.addEventListener("click",()=>document.body.classList.toggle("show-chatbot"));

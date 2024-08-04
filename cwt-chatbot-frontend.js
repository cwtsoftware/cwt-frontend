document.addEventListener("DOMContentLoaded", function() {
  const isLoaded = document.getElementById("seaspaceai-agent")
  if(isLoaded){
    return
  }

  function generateCacheBuster() {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const milliseconds = now.getMilliseconds().toString().padStart(3, '0');

    return `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}`;
  }

  const cacheBuster = generateCacheBuster();

  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = `https://cdn.jsdelivr.net/gh/cwtsoftware/cwt-frontend@latest/cwt-chatbot-styles.css?cb=${cacheBuster}`;
  document.head.appendChild(link);

  const fontLink = 'https://fonts.googleapis.com/css?family=Inter' 
  const fontLinkElement = document.createElement('link');
  fontLinkElement.rel = 'stylesheet';
  fontLinkElement.href = fontLink;
  document.head.appendChild(fontLinkElement);

  function generateUUID() {
    let d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
      d += performance.now(); // Use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = (d + Math.random()*16)%16 | 0;
      d = Math.floor(d/16);
      return (c === 'x' ? r : (r&0x3|0x8)).toString(16);
    });
  }

  // start creating agent in dom
  var outerDiv = document.createElement('div');
  outerDiv.id = 'seaspaceai-agent';

  var div1 = document.createElement('div');

  var div2 = document.createElement('div');
  div2.id = 'seaspaceai-agent-container';
  div2.className = 'active';

  var div3 = document.createElement('div');
  div3.id = 'seaspaceai-agent-header';

  var divHeaderLeft = document.createElement('div');
  divHeaderLeft.id = 'seaspaceai-agent-header-left';

  var divHeaderLeftIcon = document.createElement('div');
  divHeaderLeftIcon.id = 'seaspaceai-agent-header-left-icon';

  var svgLeft = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svgLeft.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  svgLeft.setAttribute('fill', '#1D252B');
  svgLeft.setAttribute('viewBox', '0 0 256 256');
  svgLeft.setAttribute('width', '22');
  svgLeft.setAttribute('height', '22');

  var pathLeft = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  pathLeft.setAttribute('d', 'M216,80H184V48a16,16,0,0,0-16-16H40A16,16,0,0,0,24,48V176a8,8,0,0,0,13,6.22L72,154V184a16,16,0,0,0,16,16h93.59L219,230.22a8,8,0,0,0,5,1.78,8,8,0,0,0,8-8V96A16,16,0,0,0,216,80ZM66.55,137.78,40,159.25V48H168v88H71.58A8,8,0,0,0,66.55,137.78ZM216,207.25l-26.55-21.47a8,8,0,0,0-5-1.78H88V152h80a16,16,0,0,0,16-16V96h32Z');

  svgLeft.appendChild(pathLeft);
  divHeaderLeftIcon.appendChild(svgLeft);
  divHeaderLeft.appendChild(divHeaderLeftIcon);

  function getLanguage(){
    if(localStorage.getItem('seaspaceai-agent-language')){
      return localStorage.getItem('seaspaceai-agent-language')
    } else {
      return 'Croatian'
    }
  }

  var selectLanguage = document.createElement('select');
  selectLanguage.id = 'seaspaceai-agent-language';
  var values = ['Croatian', 'English', 'German', 'Italian'];
  var options = ['HR', 'EN', 'DE', 'IT'];

  for (var i = 0; i < options.length; i++) {
    var option = document.createElement('option');
    option.className = 'seaspaceai-agent-language-option';
    option.value = values[i];
    option.textContent = options[i];
    selectLanguage.appendChild(option);

    if (values[i] === getLanguage()) {
      option.selected = true;
    }
  }
  divHeaderLeft.appendChild(selectLanguage);

  var divHeaderRight = document.createElement('div');
  divHeaderRight.id = 'seaspaceai-agent-header-right';

  var svgDelete = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svgDelete.id = 'seaspaceai-delete';
  svgDelete.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  svgDelete.setAttribute('fill', '#ffffff');
  svgDelete.setAttribute('viewBox', '0 0 256 256');
  svgDelete.setAttribute('stroke-width', '1.5');
  svgDelete.setAttribute('height', '20');
  svgDelete.setAttribute('width', '20');

  var pathDelete = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  pathDelete.setAttribute('d', 'M216,48H176V40a24,24,0,0,0-24-24H104A24,24,0,0,0,80,40v8H40a8,8,0,0,0,0,16h8V208a16,16,0,0,0,16,16H192a16,16,0,0,0,16-16V64h8a8,8,0,0,0,0-16ZM96,40a8,8,0,0,1,8-8h48a8,8,0,0,1,8,8v8H96Zm96,168H64V64H192ZM112,104v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm48,0v64a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Z');

  svgDelete.appendChild(pathDelete);
  divHeaderRight.appendChild(svgDelete);

  var divDeleteMessage = document.createElement('div');
  divDeleteMessage.id = 'seaspaceai-delete-message';

  function getDeleteMessagesText(){
    const lang = getLanguage()
    switch (lang){
      case 'English':
        return 'Delete messages';
        break;

      case 'Italian':
        return 'Elimina messaggi';
        break;

      case 'German':
        return 'Nachrichten löschen';
        break

      default:
        return 'Izbriši poruke';
    }
  }

  var pDeleteMessage = document.createElement('p');
  pDeleteMessage.id = 'seaspaceai-delete-message-text';
  pDeleteMessage.innerHTML = getDeleteMessagesText();

  divDeleteMessage.appendChild(pDeleteMessage);
  divHeaderRight.appendChild(divDeleteMessage);

  var svgArrowDown = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svgArrowDown.id = 'seaspaceai-arrow-down';
  svgArrowDown.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  svgArrowDown.setAttribute('fill', '#FFFFFF');
  svgArrowDown.setAttribute('viewBox', '0 0 256 256');
  svgArrowDown.setAttribute('width', '18');
  svgArrowDown.setAttribute('height', '18');
  svgArrowDown.setAttribute('stroke', '#ffffff');
  svgArrowDown.setAttribute('stroke-width', '7px');

  var pathArrowDown = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  pathArrowDown.setAttribute('d', 'M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z');

  svgArrowDown.appendChild(pathArrowDown);
  divHeaderRight.appendChild(svgArrowDown);

  div3.appendChild(divHeaderLeft);
  div3.appendChild(divHeaderRight);

  var div4 = document.createElement('div');
  div4.id = 'seaspaceai-agent-body';

  var div5 = document.createElement('div');
  div5.id = 'seaspaceai-messages-body';

  var div6 = document.createElement('form');
  div6.id = 'seaspaceai-agent-form';

  var inputForm = document.createElement('input');
  inputForm.type = 'text';
  inputForm.id = 'seaspaceai-agent-form-input';
  inputForm.placeholder = inputFieldLangText();
  inputForm.autocomplete = 'off';

  var svgSendIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svgSendIcon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  svgSendIcon.setAttribute('width', '24');
  svgSendIcon.setAttribute('height', '24');
  svgSendIcon.setAttribute('fill', '#63686A');
  svgSendIcon.setAttribute('viewBox', '0 0 256 256');

  var pathSendIcon = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  pathSendIcon.setAttribute('d', 'M231.87,114l-168-95.89A16,16,0,0,0,40.92,37.34L71.55,128,40.92,218.67A16,16,0,0,0,56,240a16.15,16.15,0,0,0,7.93-2.1l167.92-96.05a16,16,0,0,0,.05-27.89ZM56,224a.56.56,0,0,0,0-.12L85.74,136H144a8,8,0,0,0,0-16H85.74L56.06,32.16A.46.46,0,0,0,56,32l168,95.83Z');

  svgSendIcon.appendChild(pathSendIcon);

  div6.appendChild(inputForm);
  div6.appendChild(svgSendIcon);

  div4.appendChild(div5);
  div4.appendChild(div6);

  div2.appendChild(div3);
  div2.appendChild(div4);

  var div7 = document.createElement('div');
  div7.id = 'seaspaceai-agent-button';

  var div8 = document.createElement('div');
  div8.id = 'seaspaceai-agent-icon';

  var svgChatIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svgChatIcon.id = 'seaspaceai-chat-icon';
  svgChatIcon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  svgChatIcon.setAttribute('fill', '#FFFFFF');
  svgChatIcon.setAttribute('viewBox', '0 0 256 256');
  svgChatIcon.setAttribute('width', '28');
  svgChatIcon.setAttribute('height', '28');

  var pathChatIcon = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  pathChatIcon.setAttribute('d', 'M216,48H40A16,16,0,0,0,24,64V224a15.84,15.84,0,0,0,9.25,14.5A16.05,16.05,0,0,0,40,240a15.89,15.89,0,0,0,10.25-3.78l.09-.07L83,208H216a16,16,0,0,0,16-16V64A16,16,0,0,0,216,48ZM40,224h0ZM216,192H80a8,8,0,0,0-5.23,1.95L40,224V64H216Z');

  svgChatIcon.appendChild(pathChatIcon);
  div8.appendChild(svgChatIcon);

  div7.appendChild(div8);

  outerDiv.appendChild(div2);
  outerDiv.appendChild(div7);
  document.body.appendChild(outerDiv);

  // end creating agent in dom

  const header = document.getElementById('seaspaceai-agent-header');
  const container = document.getElementById('seaspaceai-agent-container');
  const agentIcon = document.getElementById('seaspaceai-agent-icon');
  const chatIcon = document.getElementById('seaspaceai-chat-icon');
  const deleteIcon = document.getElementById('seaspaceai-delete');
  const deleteMessage = document.getElementById('seaspaceai-delete-message');
  const arrowDown = document.getElementById('seaspaceai-arrow-down');
  const cwtForm = document.getElementById('seaspaceai-agent-form');
  const cwtFormInput = document.getElementById('seaspaceai-agent-form-input');
  const body = document.getElementById('seaspaceai-messages-body');
  const language = document.getElementById('seaspaceai-agent-language');

  function inputFieldLangText(){
    const lang = getLanguage()
    switch (lang){
      case 'English':
        return 'Type a Message'
        break;

      case 'Italian':
        return 'Scrivi un messaggio';
        break;

      case 'German':
        return 'Geben Sie eine Nachricht ein';
        break

      default:
        return 'Unesite pitanje';
    }
  }

  function changeInputFieldLangText(){
    const text = inputFieldLangText()
    cwtFormInput.placeholder = text
  }

  container.style.opacity = '0';
  container.style.visibility = 'hidden';
  agentIcon.style.opacity = '1';
  agentIcon.style.visibility = 'visible';
  header.style.pointerEvents = 'none';

  header.addEventListener('click', function() {
    container.classList.toggle('active');
    container.style.opacity = container.style.opacity === '1' ? '0' : '1';
    container.style.visibility = container.style.visibility === 'visible' ? 'hidden' : 'visible';
    this.style.pointerEvents = this.style.pointerEvents === 'auto' ? 'none' : 'auto';
    agentIcon.style.opacity = agentIcon.style.opacity === '1' ? '0' : '1';
    agentIcon.style.visibility = agentIcon.style.visibility === 'visible' ? 'hidden' : 'visible';
  });

  agentIcon.addEventListener('click', function() {
    container.classList.toggle('active');
    container.style.opacity = container.style.opacity === '1' ? '0' : '1';
    container.style.visibility = container.style.visibility === 'visible' ? 'hidden' : 'visible';
    header.style.pointerEvents = header.style.pointerEvents === 'auto' ? 'none' : 'auto';
    agentIcon.style.opacity = agentIcon.style.opacity === '1' ? '0' : '1';
    agentIcon.style.visibility = agentIcon.style.visibility === 'visible' ? 'hidden' : 'visible';
  });
  
  deleteIcon.addEventListener('mouseover', function() {
    deleteMessage.style.pointerEvents = 'auto';
    deleteMessage.style.opacity = '1';
  });

  deleteIcon.addEventListener('mouseout', function() {
    deleteMessage.style.pointerEvents = 'none';
    deleteMessage.style.opacity = '0';
  });

  deleteIcon.addEventListener('click', function(e) {
    e.stopPropagation();
    body.innerHTML = '';

    localStorage.setItem('seaspaceai-agent', '{"messages":[]}')
    localStorage.setItem('seaspaceai-agent-conversation-id', generateUUID());
  });

  language.addEventListener('click', function(e) {
    e.stopPropagation();
  });

  // start local storage
  function storeAgentMessage(message){
    const localStorageArray = JSON.parse(localStorage.getItem('seaspaceai-agent'));

    const json = {
      "role": "assistant",
      "content": message
    };
    
    localStorageArray.messages.push(json);
    
    const string = JSON.stringify(localStorageArray);
    localStorage.setItem('seaspaceai-agent', string);
  }

  function storeUserMessage(message){
    const localStorageArray = JSON.parse(localStorage.getItem('seaspaceai-agent'));

    const json = {
      "role": "user",
      "content": message
    };
    
    localStorageArray.messages.push(json);
    
    const string = JSON.stringify(localStorageArray);
    localStorage.setItem('seaspaceai-agent', string);
  }

  function get_starting_message(language){
    let starting_message = ""

    switch (language) {
      case 'English':
        starting_message = 'Welcome to the website of the SeaspaceAI, I am your assistant. If you need additional or specific information, feel free to ask me.'
        break;
        
      case 'German':
        starting_message = "Willkommen auf der Website des SeaspaceAI, ich bin Ihr Assistent. Wenn Sie zusätzliche oder spezifische Informationen benötigen, fragen Sie mich gerne."
        break;
        
      case 'Italian':
        starting_message = "Benvenuti nel sito web SeaspaceAI, sono il vostro assistente. Se hai bisogno di informazioni aggiuntive o specifiche, non esitare a chiedermelo."
        break;
        
      default:
        starting_message = 'Dobrodošli na stranicu SeaspaceAI, ja sam vaš asistent. Ako trebate dodatne ili specifične informacije slobodno me pitajte.'
    }

    return starting_message;
  }

  let localStorageValue = localStorage.getItem('seaspaceai-agent');
  
  if(!localStorageValue || localStorageValue === '{"messages":[]}'){
    localStorage.setItem('seaspaceai-agent', '{"messages":[]}');
    localStorage.setItem('seaspaceai-agent-conversation-id', generateUUID());
    const startingMessage = get_starting_message(language)
    storeAgentMessage(startingMessage)
  } 
  
  localStorageValue = JSON.parse(localStorage.getItem('seaspaceai-agent')).messages

  localStorageValue.forEach((item, i) => {
    if(item.role === 'assistant'){
      // agent
      const newOutputDiv = document.createElement('div');
      newOutputDiv.className = 'seaspaceai-agent-message-agent'
      
      const newOutput = document.createElement('p');
      newOutput.className = 'seaspaceai-agent-output'

      let startingMessage = ""
      if(i == 0){
        newOutput.id = 'seaspaceai-agent-assistant-hello-message'
      }

      body.appendChild(newOutputDiv);
      newOutputDiv.appendChild(newOutput)
      newOutput.innerHTML += item.content

    } else if (item.role === 'user') {
      //user
      const newInputDiv = document.createElement('div');
      newInputDiv.className = 'seaspaceai-agent-message-user'
    
      const newInput = document.createElement('p');
      newInput.className = 'seaspaceai-agent-input'
    
      body.appendChild(newInputDiv);
      newInputDiv.appendChild(newInput)
      newInput.innerHTML += item.content
    }

    body.scrollTop = body.scrollHeight;
  });

  const helloMessage = document.getElementById('seaspaceai-agent-assistant-hello-message');

  language.addEventListener('change', (e) => {
    e.preventDefault();
    body.innerHTML = '';
    localStorage.setItem('seaspaceai-agent', '{"messages":[]}');
    localStorage.setItem('seaspaceai-agent-language', e.target.value);
    localStorage.setItem('seaspaceai-agent-conversation-id', generateUUID());
    
    const startingMessage = get_starting_message(e.target.value)

    const newOutputDiv = document.createElement('div');
    newOutputDiv.className = 'seaspaceai-agent-message-agent'
    
    const newOutput = document.createElement('p');
    newOutput.className = 'seaspaceai-agent-output'
    newOutput.id = 'seaspaceai-agent-assistant-hello-message'

    body.appendChild(newOutputDiv);
    newOutputDiv.appendChild(newOutput)
    newOutput.innerHTML += startingMessage

    storeAgentMessage(startingMessage)

    changeInputFieldLangText()
  });

  setTimeout(() => {
    body.scrollTop = body.scrollHeight;
  },500)

  // end local storage

  const currentUrl = window.location.href;
  const localUrl = 'http://localhost:8000/api/chat';
  const prodUrl = 'https://cwtchatbot.cwtai.co/api/chat'

  const apiUrl = currentUrl.includes("seaspace.ai") || currentUrl.includes("chatbotconsole.seaspace.ai") ? prodUrl : localUrl;

  function submitForm(e) {
    e.preventDefault();
    e.stopPropagation();

    cwtFormInput.disabled = true;

    if (e.target[0].value === '' || e.target[0].value.length < 2) {
      console.error('Input value cannot be empty');
      
      cwtFormInput.disabled = false;
      cwtFormInput.focus();
      return;
    }

    const newInputDiv = document.createElement('div');
    newInputDiv.className = 'seaspaceai-agent-message-user'

    const newInput = document.createElement('p');
    newInput.className = 'seaspaceai-agent-input'

    body.appendChild(newInputDiv);
    newInputDiv.appendChild(newInput)
    newInput.innerHTML += e.target[0].value

    const newOutputDiv = document.createElement('div');
    newOutputDiv.className = 'seaspaceai-agent-message-agent'

    const newOutput = document.createElement('p');
    newOutput.className = 'seaspaceai-agent-output streaming'
    newOutput.style.setProperty('--shouldDisplay', 'inline-block')

    body.appendChild(newOutputDiv);
    newOutputDiv.appendChild(newOutput)

    body.scrollTop = body.scrollHeight;

    cwtForm.reset()

    const memory = JSON.parse(localStorage.getItem('seaspaceai-agent')).messages.slice(-2);

    memory.push({
      "role": "user",
      "content": newInput.innerHTML
    })

    const json_data = {
      "messages": memory,
      "chatbot_name": "cwtsoftware_chatbot",
      "conversation_id": localStorage.getItem('seaspaceai-agent-conversation-id') ? localStorage.getItem('seaspaceai-agent-conversation-id') : null
    }

    let resultArray = [];

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Seaspaceai-Language': getLanguage(),
      },
      body: JSON.stringify(json_data),
    })
    .then(response => {
      responseHeaders = response.headers;
      
      if (!response.ok) {
        if (response.status === 429) {
          console.error('Too many requests. Please try again later.');
          // Handle 429 error here, such as displaying a message to the user
        } else {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      }
      
      return response.body.getReader();
    })
    .then(reader => {
      return new ReadableStream({
        start(controller) {
          function pump() {
            return reader.read().then(({ done, value }) => {
              if (!done) {
                const decodedValue = new TextDecoder('utf-8').decode(value);
                newOutput.innerHTML += decodedValue;
                resultArray.push(decodedValue);
                body.scrollTop = body.scrollHeight;
                pump();
              } else {
                const finalResult = resultArray.join('');

                const streamingElement = document.getElementsByClassName('streaming')
                streamingElement[0].style.setProperty('--shouldDisplay', 'none')
                streamingElement[0].classList.remove('streaming')
                
                storeUserMessage(newInput.innerHTML)
                storeAgentMessage(finalResult)
                cwtFormInput.disabled = false;
                cwtFormInput.focus();
              }
            });
          }

          pump();
        },
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

  cwtForm.addEventListener('submit', submitForm);

  svgSendIcon.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();

    cwtForm.dispatchEvent(new Event('submit'));
  });
  
  cwtForm.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {      
      e.preventDefault();
      cwtForm.dispatchEvent(new Event('submit'));
    }
  });
})
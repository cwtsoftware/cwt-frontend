document.addEventListener("DOMContentLoaded", function() {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = 'https://cdn.jsdelivr.net/gh/cwtsoftware/cwt-frontend@main/chatbot-styles.css';
  document.head.appendChild(link);

  var outerDiv = document.createElement('div');
  outerDiv.id = 'cwt-agent';

  var div1 = document.createElement('div');

  var div2 = document.createElement('div');
  div2.id = 'cwt-agent-container';
  div2.className = 'active';

  var div3 = document.createElement('div');
  div3.id = 'cwt-agent-header';

  var divHeaderLeft = document.createElement('div');
  divHeaderLeft.id = 'cwt-agent-header-left';

  var divHeaderLeftIcon = document.createElement('div');
  divHeaderLeftIcon.id = 'cwt-agent-header-left-icon';

  var svgLeft = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svgLeft.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  svgLeft.setAttribute('fill', 'none');
  svgLeft.setAttribute('viewBox', '0 0 24 24');
  svgLeft.setAttribute('stroke-width', '1.5');
  svgLeft.setAttribute('stroke', '#535353');
  svgLeft.setAttribute('height', '1.8em');
  svgLeft.setAttribute('width', '1.8em');

  var pathLeft = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  pathLeft.setAttribute('stroke-linecap', 'round');
  pathLeft.setAttribute('stroke-linejoin', 'round');
  pathLeft.setAttribute('d', 'M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155');

  svgLeft.appendChild(pathLeft);
  divHeaderLeftIcon.appendChild(svgLeft);
  divHeaderLeft.appendChild(divHeaderLeftIcon);

  function getLanguage(){
    if(localStorage.getItem('cwt-agent-language')){
      return localStorage.getItem('cwt-agent-language')
    } else {
      return 'Croatian'
    }
  }

  var selectLanguage = document.createElement('select');
  selectLanguage.id = 'cwt-agent-language';
  var values = ['Croatian', 'English', 'German', 'Italian'];
  var options = ['HR', 'EN', 'DE', 'IT'];

  for (var i = 0; i < options.length; i++) {
    var option = document.createElement('option');
    option.className = 'cwt-agent-language-option';
    option.value = values[i];
    option.textContent = options[i];
    selectLanguage.appendChild(option);

    if (values[i] === getLanguage()) {
      option.selected = true;
    }
  }
  divHeaderLeft.appendChild(selectLanguage);

  var divHeaderRight = document.createElement('div');
  divHeaderRight.id = 'cwt-agent-header-right';

  var svgDelete = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svgDelete.id = 'cwt-delete';
  svgDelete.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  svgDelete.setAttribute('fill', 'none');
  svgDelete.setAttribute('viewBox', '0 0 24 24');
  svgDelete.setAttribute('stroke-width', '1.5');
  svgDelete.setAttribute('stroke', '#f5f5f5');
  svgDelete.setAttribute('height', '1.8em');
  svgDelete.setAttribute('width', '1.8em');

  var pathDelete = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  pathDelete.setAttribute('stroke-linecap', 'round');
  pathDelete.setAttribute('stroke-linejoin', 'round');
  pathDelete.setAttribute('d', 'm14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0');

  svgDelete.appendChild(pathDelete);
  divHeaderRight.appendChild(svgDelete);

  var divDeleteMessage = document.createElement('div');
  divDeleteMessage.id = 'cwt-delete-message';

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
  pDeleteMessage.id = 'cwt-delete-message-text';
  pDeleteMessage.innerHTML = getDeleteMessagesText();

  divDeleteMessage.appendChild(pDeleteMessage);
  divHeaderRight.appendChild(divDeleteMessage);

  var svgArrowDown = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svgArrowDown.id = 'cwt-arrow-down';
  svgArrowDown.setAttribute('stroke', 'currentColor');
  svgArrowDown.setAttribute('fill', '#f5f5f5');
  svgArrowDown.setAttribute('stroke-width', '0');
  svgArrowDown.setAttribute('viewBox', '0 0 24 24');
  svgArrowDown.setAttribute('height', '2em');
  svgArrowDown.setAttribute('width', '2em');

  var pathArrowDown = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  pathArrowDown.setAttribute('fill', 'none');
  pathArrowDown.setAttribute('d', 'M0 0h24v24H0V0z');

  var pathArrowDown2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  pathArrowDown2.setAttribute('d', 'M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41');

  svgArrowDown.appendChild(pathArrowDown);
  svgArrowDown.appendChild(pathArrowDown2);
  divHeaderRight.appendChild(svgArrowDown);

  div3.appendChild(divHeaderLeft);
  div3.appendChild(divHeaderRight);

  var div4 = document.createElement('div');
  div4.id = 'cwt-agent-body';

  var div5 = document.createElement('div');
  div5.id = 'cwt-messages-body';

  var div6 = document.createElement('form');
  div6.id = 'cwt-agent-form';

  var inputForm = document.createElement('input');
  inputForm.type = 'text';
  inputForm.id = 'cwt-agent-form-input';
  inputForm.placeholder = 'Type a Message';
  inputForm.autocomplete = 'off';

  div6.appendChild(inputForm);

  div4.appendChild(div5);
  div4.appendChild(div6);

  div2.appendChild(div3);
  div2.appendChild(div4);

  var div7 = document.createElement('div');
  div7.id = 'cwt-agent-button';

  var div8 = document.createElement('div');
  div8.id = 'cwt-agent-icon';

  var svgChatIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  svgChatIcon.id = 'cwt-chat-icon';
  svgChatIcon.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  svgChatIcon.setAttribute('fill', '#f5f5f5');
  svgChatIcon.setAttribute('viewBox', '0 0 24 24');
  svgChatIcon.setAttribute('stroke-width', '1');
  svgChatIcon.setAttribute('stroke', '#202020');
  svgChatIcon.setAttribute('height', '3.5em');
  svgChatIcon.setAttribute('width', '3.5em');

  var pathChatIcon = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  pathChatIcon.setAttribute('stroke-linecap', 'round');
  pathChatIcon.setAttribute('stroke-linejoin', 'round');
  pathChatIcon.setAttribute('d', 'M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155');

  svgChatIcon.appendChild(pathChatIcon);
  div8.appendChild(svgChatIcon);

  div7.appendChild(div8);

  outerDiv.appendChild(div2);
  outerDiv.appendChild(div7);
  document.body.appendChild(outerDiv);

  var form = document.createElement('form');
  form.className = 'cwt-agent-reservation-widget';

  var div1 = document.createElement('div');

  var select = document.createElement('select');
  select.className = 'cwt-agent-input-select';

  function dateOptionsText(){
    const lang = getLanguage()
    switch (lang){
      case 'English':
        return 'All rooms';
        break;

      case 'Italian':
        return 'Tutte le camere';
        break;

      case 'German':
        return 'Alle Zimmer';
        break

      default:
        return 'Sve sobe';
    }
  }

  var options = ['Sve sobe', 'Comfort Double Room', 'Superior Double Room', 'President Double Room', 'President Double Room with sofa', 'Deluxe Studio - Pet Friendly'];
  for (var i = 0; i < options.length; i++) {
    var option = document.createElement('option');
    if (i == 0){
      option.value = 'Sve sobe';
      option.textContent = dateOptionsText();
      option.className = 'cwt-agent-room-select-first-option'
    } else {
      option.value = options[i];
      option.textContent = options[i];
    }
    select.appendChild(option);
  }
  div1.appendChild(select);

  function arrivalText(){
    const lang = getLanguage()
    switch (lang){
      case 'English':
        return 'Arrival'
        break;

      case 'Italian':
        return 'Arrivo';
        break;

      case 'German':
        return 'Ankunft';
        break

      default:
        return 'Dolazak';
    }
  }

  function departureText(){
    const lang = getLanguage()
    switch (lang){
      case 'English':
        return 'Departure'
        break;

      case 'Italian':
        return 'Partenza';
        break;

      case 'German':
        return 'Abflug';
        break

      default:
        return 'Odlazak';
    }
  }

  var datePickerContainer = document.createElement('div');
  datePickerContainer.className = 'cwt-agent-date-picker-container';

  var divLabels = document.createElement('div');
  divLabels.className = 'cwt-agent-date-picker-labels-container'
  var divInnerContainer = document.createElement('div');
  divInnerContainer.className = 'cwt-agent-date-picker-inner-container';

  var labelArrival = document.createElement('p');
  labelArrival.className = 'cwt-agent-date-picker-label-arrival';
  labelArrival.textContent = arrivalText();

  var labelDeparture = document.createElement('p');
  labelDeparture.className = 'cwt-agent-date-picker-label-departure';
  labelDeparture.textContent = departureText();

  divLabels.appendChild(labelArrival);
  divLabels.appendChild(labelDeparture);

  var inputDatePickerArrival = document.createElement('input');
  inputDatePickerArrival.id = 'cwt-agent-date-picker-arrival';
  inputDatePickerArrival.className = 'cwt-agent-date-picker-arrival';
  inputDatePickerArrival.name = 'date-picker';
  inputDatePickerArrival.autocomplete = 'off';

  var dash = document.createElement('div');
  dash.textContent = '-';
  dash.className = 'cwt-agent-date-picker-to';
  
  var inputDatePickerDeparture = document.createElement('input');
  inputDatePickerDeparture.id = 'cwt-agent-date-picker-departure';
  inputDatePickerDeparture.className = 'cwt-agent-date-picker-departure';
  inputDatePickerDeparture.name = 'date-picker';
  inputDatePickerDeparture.autocomplete = 'off';

  divInnerContainer.appendChild(inputDatePickerArrival);
  divInnerContainer.appendChild(dash);
  divInnerContainer.appendChild(inputDatePickerDeparture);

  datePickerContainer.appendChild(divLabels);
  datePickerContainer.appendChild(divInnerContainer);

  div1.appendChild(datePickerContainer);

  form.appendChild(div1);

  var div3 = document.createElement('div');

  var div4 = document.createElement('div');

  function adultsText(){
    const lang = getLanguage()
    switch (lang){
      case 'English':
        return 'Adults'
        break;

      case 'Italian':
        return 'Adulti';
        break;

      case 'German':
        return 'Erwachsene';
        break

      default:
        return 'Odrasli';
    }
  }

  var labelAdults = document.createElement('label');
  labelAdults.className = 'cwt-agent-input-number-adults-label';
  labelAdults.htmlFor = 'adults';
  labelAdults.textContent = adultsText();
  div4.appendChild(labelAdults);

  var inputAdults = document.createElement('input');
  inputAdults.type = 'number';
  inputAdults.className = 'cwt-agent-input-number-adults';
  inputAdults.max = '3';
  inputAdults.min = '0';
  inputAdults.value = '1';
  inputAdults.autocomplete = 'off';
  
  div4.appendChild(inputAdults);

  div3.appendChild(div4);

  var div5 = document.createElement('div');

  function childrenText(){
    const lang = getLanguage()
    switch (lang){
      case 'English':
        return 'Children'
        break;

      case 'Italian':
        return 'Bambini';
        break;

      case 'German':
        return 'Kinder';
        break

      default:
        return 'Djeca';
    }
  }

  var labelChildren = document.createElement('label');
  labelChildren.htmlFor = 'children';
  labelChildren.textContent = childrenText();
  labelChildren.className = 'cwt-agent-input-number-children-label';
  div5.appendChild(labelChildren);

  var inputChildren = document.createElement('input');
  inputChildren.type = 'number';
  inputChildren.name = 'children';
  inputChildren.className = 'cwt-agent-input-number-children';
  inputChildren.max = '2';
  inputChildren.min = '0';
  inputChildren.value = '0';
  inputChildren.autocomplete = 'off';
  div5.appendChild(inputChildren);

  div3.appendChild(div5);

  form.appendChild(div3);

  var div6 = document.createElement('div');

  function dateSubmitButtonText(){
    const lang = getLanguage()
    switch (lang){
      case 'English':
        return 'Submit'
        break;

      case 'Italian':
        return 'Invia';
        break;

      case 'German':
        return 'Einreichen';
        break

      default:
        return 'Unesi';
    }
  }

  var button = document.createElement('button');
  button.className = 'cwt-agent-input-button';
  button.textContent = dateSubmitButtonText();
  button.type = 'submit';
  div6.appendChild(button);

  form.appendChild(div6);

  var outerDiv = document.createElement('div');
  outerDiv.className = 'cwt-agent-reservation-widget-background';

  outerDiv.appendChild(form);

  // end creating agent in dom

  const header = document.getElementById('cwt-agent-header');
  const container = document.getElementById('cwt-agent-container');
  const agentIcon = document.getElementById('cwt-agent-icon');
  const chatIcon = document.getElementById('cwt-chat-icon');
  const deleteIcon = document.getElementById('cwt-delete');
  const deleteMessage = document.getElementById('cwt-delete-message');
  const arrowDown = document.getElementById('cwt-arrow-down');
  const cwtForm = document.getElementById('cwt-agent-form');
  const cwtFormInput = document.getElementById('cwt-agent-form-input');
  const body = document.getElementById('cwt-messages-body');
  const language = document.getElementById('cwt-agent-language');

  container.appendChild(outerDiv)

  function datePickerLangText(){
    const lang = getLanguage()
    switch (lang){
      case 'English':
        return 'en'
        break;

      case 'Italian':
        return 'it';
        break;

      case 'German':
        return 'de';
        break

      default:
        return 'hr';
    }
  }

  const datePicker = new Litepicker({
    element: document.getElementById('cwt-agent-date-picker-arrival'),
    elementEnd: document.getElementById('cwt-agent-date-picker-departure'),
    singleMode: false,
    allowRepick: true,
    showTooltip: false,
    tooltipNumber: (totalDays) => {
      return totalDays - 1;
    },
    maxDate: new Date().setFullYear(new Date().getFullYear() + 1),
    lang: datePickerLangText(),
    format: "DD.MM.YYYY"
  })

  const litepicker = document.getElementsByClassName('litepicker')

  function changeDatePickerText(){
    const dateSubmitButton = document.getElementsByClassName('cwt-agent-input-button')
    const inputNumberAdults = document.getElementsByClassName('cwt-agent-input-number-adults-label')
    const inputNumberChildren = document.getElementsByClassName('cwt-agent-input-number-children-label')
    const datePickerLabelArrival = document.getElementsByClassName('cwt-agent-date-picker-label-arrival')
    const datePickerLabelDeparture = document.getElementsByClassName('cwt-agent-date-picker-label-departure')
    const selectFirstOption = document.getElementsByClassName('cwt-agent-room-select-first-option')
    const deleteMessagesText = document.getElementById('cwt-delete-message-text')
    
    const dateSubmitButtonTextChange = dateSubmitButtonText()
    const childrenTextChange = childrenText()
    const adultsTextChange = adultsText()
    const arrivalTextChange = arrivalText()
    const departureTextChange = departureText()
    const dateOptionsTextChange = dateOptionsText()
    const deleteMessagesTextChange = getDeleteMessagesText()

    for(const item of dateSubmitButton){
      item.innerHTML = dateSubmitButtonTextChange
    }

    for(const item of inputNumberAdults){
      item.innerHTML = adultsTextChange
    }

    for(const item of inputNumberChildren){
      item.innerHTML = childrenTextChange
    }
    
    for(const item of datePickerLabelArrival){
      item.innerHTML = arrivalTextChange
    }

    for(const item of datePickerLabelDeparture){
      item.innerHTML = departureTextChange
    }

    for(const item of selectFirstOption){
      item.innerHTML = dateOptionsTextChange
    }

    deleteMessagesText.innerHTML = deleteMessagesTextChange

    const datePicker = new Litepicker({
      element: document.getElementById('cwt-agent-date-picker-arrival'),
      elementEnd: document.getElementById('cwt-agent-date-picker-departure'),
      singleMode: false,
      allowRepick: true,
      showTooltip: false,
      tooltipNumber: (totalDays) => {
        return totalDays - 1;
      },
      maxDate: new Date().setFullYear(new Date().getFullYear() + 1),
      lang: datePickerLangText(),
      format: "DD.MM.YYYY"
    })

    litepicker[0].remove();
  }

  container.style.opacity = '1';
  container.style.visibility = 'visible';
  agentIcon.style.opacity = '0';
  agentIcon.style.visibility = 'hidden';
  header.style.pointerEvents = 'auto';

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

    localStorage.setItem('cwt-agent', '{"messages":[]}')
  });

  language.addEventListener('click', function(e) {
    e.stopPropagation();
  });

  // start local storage
  function storeAgentMessage(message){
    const localStorageArray = JSON.parse(localStorage.getItem('cwt-agent'));

    const json = {
      "role": "assistant",
      "content": message
    };
    
    localStorageArray.messages.push(json);
    
    const string = JSON.stringify(localStorageArray);
    localStorage.setItem('cwt-agent', string);
  }

  function storeUserMessage(message){
    const localStorageArray = JSON.parse(localStorage.getItem('cwt-agent'));

    const json = {
      "role": "user",
      "content": message
    };
    
    localStorageArray.messages.push(json);
    
    const string = JSON.stringify(localStorageArray);
    localStorage.setItem('cwt-agent', string);
  }

  function get_starting_message(language){
    let starting_message = ""

    switch (language) {
      case 'English':
        starting_message = 'Welcome to the website of the Vela Vrata hotel, I am your assistant. If you need additional or specific information, feel free to ask me.'
        break;
        
      case 'German':
        starting_message = "Willkommen auf der Website des Hotels Vela Vrata, ich bin Ihr Assistent. Wenn Sie zusätzliche oder spezifische Informationen benötigen, fragen Sie mich gerne."
        break;
        
      case 'Italian':
        starting_message = "Benvenuti nel sito web dell'hotel Vela Vrata, sono il vostro assistente. Se hai bisogno di informazioni aggiuntive o specifiche, non esitare a chiedermelo."
        break;
        
      default:
        starting_message = 'Dobrodošli na stranicu hotela Vela Vrata, ja sam vaš asistent. Ako trebate dodatne ili specifične informacije slobodno me pitajte.'
    }

    return starting_message;
  }

  let localStorageValue = localStorage.getItem('cwt-agent');
  
  if(!localStorageValue || localStorageValue === '{"messages":[]}'){
    localStorage.setItem('cwt-agent', '{"messages":[]}');
    const startingMessage = get_starting_message(language)
    storeAgentMessage(startingMessage)
  } 
  
  localStorageValue = JSON.parse(localStorage.getItem('cwt-agent')).messages

  localStorageValue.forEach((item, i) => {
    if(item.role === 'assistant'){
      // agent
      const newOutputDiv = document.createElement('div');
      newOutputDiv.className = 'cwt-agent-message-agent'
      
      const newOutput = document.createElement('p');
      newOutput.className = 'cwt-agent-output'

      let startingMessage = ""
      if(i == 0){
        newOutput.id = 'cwt-agent-assistant-hello-message'
      }

      body.appendChild(newOutputDiv);
      newOutputDiv.appendChild(newOutput)
      newOutput.innerHTML += item.content

    } else if (item.role === 'user') {
      //user
      const newInputDiv = document.createElement('div');
      newInputDiv.className = 'cwt-agent-message-user'
    
      const newInput = document.createElement('p');
      newInput.className = 'cwt-agent-input'
    
      body.appendChild(newInputDiv);
      newInputDiv.appendChild(newInput)
      newInput.innerHTML += item.content

    }

    body.scrollTop = body.scrollHeight;
  });

  const helloMessage = document.getElementById('cwt-agent-assistant-hello-message');

  language.addEventListener('change', (e) => {
    body.innerHTML = '';
    localStorage.setItem('cwt-agent', '{"messages":[]}');
    localStorage.setItem('cwt-agent-language', e.target.value);
    
    const startingMessage = get_starting_message(e.target.value)

    const newOutputDiv = document.createElement('div');
    newOutputDiv.className = 'cwt-agent-message-agent'
    
    const newOutput = document.createElement('p');
    newOutput.className = 'cwt-agent-output'
    newOutput.id = 'cwt-agent-assistant-hello-message'

    body.appendChild(newOutputDiv);
    newOutputDiv.appendChild(newOutput)
    newOutput.innerHTML += startingMessage

    storeAgentMessage(startingMessage)

    changeDatePickerText()
  });

  // end local storage

  const apiUrl = 'http://localhost:8000/api/chat_steps_json';

  let eventListenerAdded = false

  function addDatePickerButton(newOutputDiv){
    const dateContainer = document.createElement('div');
    dateContainer.className = 'cwt-agent-date-button-container'

    newOutputDiv.appendChild(dateContainer)

    const dateButton = document.createElement('button');
    dateButton.className = 'cwt-agent-date-button'

    function dateButtonText(){
      const lang = getLanguage()
      switch (lang){
        case 'English':
          return 'Choose date'
          break;

        case 'Italian':
          return 'Scegli una data';
          break;

        case 'German':
          return 'Wählen Sie ein Datum';
          break

        default:
          return 'Izaberi datum';
      }
    }

    dateButton.innerHTML = dateButtonText()
    dateContainer.appendChild(dateButton)

    const dateWidgetBackgrounds = document.getElementsByClassName('cwt-agent-reservation-widget-background');
    const dateWidgets = document.getElementsByClassName('cwt-agent-reservation-widget');
    const dateWidgetButtons = document.getElementsByClassName('cwt-agent-input-button');
    const dateWidgetForms = document.getElementsByClassName('cwt-agent-reservation-widget');

    dateButton.addEventListener('click', function(e) {
      e.preventDefault();

      for (const dateWidgetBackground of dateWidgetBackgrounds) {
        dateWidgetBackground.style.visibility = dateWidgetBackground.style.visibility === 'hidden' || dateWidgetBackground.style.visibility === '' ? 'visible' : 'hidden';
        dateWidgetBackground.style.pointerEvents = dateWidgetBackground.style.pointerEvents === 'none' || dateWidgetBackground.style.pointerEvents === '' ? 'auto' : 'none';
        dateWidgetBackground.style.opacity = dateWidgetBackground.style.opacity === '0' || dateWidgetBackground.style.opacity === '' ? '1' : '0';
      }
    });
    
    for (const dateWidgetBackground of dateWidgetBackgrounds) {
      if(!eventListenerAdded){
        dateWidgetBackground.addEventListener('click', function(e) {
          dateWidgetBackground.style.visibility = dateWidgetBackground.style.visibility === 'hidden' || dateWidgetBackground.style.visibility === '' ? 'visible' : 'hidden';
          dateWidgetBackground.style.pointerEvents = dateWidgetBackground.style.pointerEvents === 'none' || dateWidgetBackground.style.pointerEvents === '' ? 'auto' : 'none';
          dateWidgetBackground.style.opacity = dateWidgetBackground.style.opacity === '0' || dateWidgetBackground.style.opacity === '' ? '1' : '0';
        });
      }
    }
    
    for (const dateWidget of dateWidgets) {
      if(!eventListenerAdded){
        dateWidget.addEventListener('click', function(e) {
          e.stopPropagation();
        });
      }
    }

    for (const dateWidgetForm of dateWidgetForms) {
      if(!eventListenerAdded){
        dateWidgetForm.addEventListener('submit', function(e) {
          e.preventDefault();

          cwtFormInput.disabled = true;
          
          const room = e.target[0].value
          const [startDateString, endDateString] = e.target[1].value.split(" - ");
          const arrival = e.target[1].value.replace(/\./g, '/');
          const departure = e.target[2].value.replace(/\./g, '/');
          const adults = "2"
          const children = "0"

          for (const dateWidgetBackground of dateWidgetBackgrounds) {
            dateWidgetBackground.style.visibility = dateWidgetBackground.style.visibility === 'hidden' || dateWidgetBackground.style.visibility === '' ? 'visible' : 'hidden';
            dateWidgetBackground.style.pointerEvents = dateWidgetBackground.style.pointerEvents === 'none' || dateWidgetBackground.style.pointerEvents === '' ? 'auto' : 'none';
            dateWidgetBackground.style.opacity = dateWidgetBackground.style.opacity === '0' || dateWidgetBackground.style.opacity === '' ? '1' : '0';
          }

          const newInputDiv = document.createElement('div');
          newInputDiv.className = 'cwt-agent-message-user'
    
          const newInput = document.createElement('p');
          newInput.className = 'cwt-agent-input'
    
          body.appendChild(newInputDiv);
          newInputDiv.appendChild(newInput)
          newInput.innerHTML += e.target[1].value + " - " + e.target[2].value 
    
          const newOutputDiv = document.createElement('div');
          newOutputDiv.className = 'cwt-agent-message-agent'
    
          const newOutput = document.createElement('p');
          newOutput.className = 'cwt-agent-output streaming'
          newOutput.style.setProperty('--shouldDisplay', 'inline-block')
    
          body.appendChild(newOutputDiv);
          newOutputDiv.appendChild(newOutput)
    
          body.scrollTop = body.scrollHeight;

          const json_data = {
            "messages": [
              {
                "role": "user",
                "content": "selenium script room:" + room + " arrival:" + arrival + " departure:" + departure + " adult:" + adults + " children:" + children
              }
            ]
          }
    
          let resultArray = [];
    
          fetch(apiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept-Language': getLanguage(),
            },
            body: JSON.stringify(json_data),
          })
          .then(response => {
            responseHeaders = response.headers;
            
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            return response.body.getReader();
          })
          .then(reader => {
            return new ReadableStream({
              start(controller) {
                let shouldStream = true
                function pump() {
                  return reader.read().then(({ done, value }) => {
                    if (!done) {
                      const decodedValue = new TextDecoder('utf-8').decode(value);
                      const indexOfBracket = decodedValue.indexOf('[');
                      if(shouldStream){
                        if(indexOfBracket !== -1){
                          shouldStream = false
                          resultArray.push(decodedValue);
                        } else {
                          newOutput.innerHTML += decodedValue;
                          resultArray.push(decodedValue);
                          body.scrollTop = body.scrollHeight;
                        }
                      } else {
                        resultArray.push(decodedValue);
                      }
                      pump();
                    } else {
                      const finalResult = resultArray.join('');

                      const linkRegex = /\[([^\]]*)\]\((.*?)\)/;
                      const linkMatch = linkRegex.exec(finalResult);
                      
                      const linkText = linkMatch ? linkMatch[1] : null;
                      const linkURL = linkMatch ? linkMatch[2] : null;
                      
                      if(linkText != null){
                        newOutput.innerHTML += ' <a href="' + linkURL + '" target="_blank" class="cwt-agent-reservation-link">' + linkText + '</a>.';
                      }
                      body.scrollTop = body.scrollHeight;
                      
                      const streamingElement = document.getElementsByClassName('streaming')
                      streamingElement[0].style.setProperty('--shouldDisplay', 'none')
                      streamingElement[0].classList.remove('streaming')
                      storeUserMessage(newInput.innerHTML)
                      storeAgentMessage(newOutput.innerHTML)
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
        });
      }
    }

    eventListenerAdded = true
  }

  cwtForm.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();

      cwtFormInput.disabled = true;

      const newInputDiv = document.createElement('div');
      newInputDiv.className = 'cwt-agent-message-user'

      const newInput = document.createElement('p');
      newInput.className = 'cwt-agent-input'

      body.appendChild(newInputDiv);
      newInputDiv.appendChild(newInput)
      newInput.innerHTML += e.target.value

      const newOutputDiv = document.createElement('div');
      newOutputDiv.className = 'cwt-agent-message-agent'

      const newOutput = document.createElement('p');
      newOutput.className = 'cwt-agent-output streaming'
      newOutput.style.setProperty('--shouldDisplay', 'inline-block')

      body.appendChild(newOutputDiv);
      newOutputDiv.appendChild(newOutput)

      body.scrollTop = body.scrollHeight;

      cwtForm.reset()
      

      const memory = JSON.parse(localStorage.getItem('cwt-agent')).messages.slice(-2);
      
      memory.push({
        "role": "user",
        "content": newInput.innerHTML
      })

      const json_data = {
        "messages": memory
      }

      let resultArray = [];

      fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': getLanguage(),
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
                  
                  const header = JSON.parse(responseHeaders.get('X-Additional-Metadata'));
                  if(header && header.show_date_picker){
                    addDatePickerButton(newOutputDiv)
                    body.scrollTop = body.scrollHeight;
                  }
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
  });
});
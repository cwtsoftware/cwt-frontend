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
  link.href = `https://cdn.jsdelivr.net/gh/cwtsoftware/cwt-frontend@latest/grand-hotel-chatbot-styles.css?cb=${cacheBuster}`;
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

  function addScriptToBody(scriptUrl, callback) {
    const litepickerScript = document.createElement('script');
    litepickerScript.src = scriptUrl;
    litepickerScript.onload = callback;
    document.head.appendChild(litepickerScript);
  }

  function initializeLitepicker() {
    const datePicker = new Litepicker({
      element: document.getElementById('seaspaceai-agent-date-picker-arrival'),
      elementEnd: document.getElementById('seaspaceai-agent-date-picker-departure'),
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
  }

  // Call the function with the script URL and callback
  addScriptToBody('https://cdn.jsdelivr.net/npm/litepicker/dist/litepicker.js', initializeLitepicker);

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

  var form = document.createElement('form');
  form.className = 'seaspaceai-agent-reservation-widget';

  var div1 = document.createElement('div');

  var select = document.createElement('select');
  select.className = 'seaspaceai-agent-input-select';

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

  var options = ['Sve sobe', 'Standard', 'Comfort', 'President'];
  for (var i = 0; i < options.length; i++) {
    var option = document.createElement('option');
    if (i == 0){
      option.value = 'Sve sobe';
      option.textContent = dateOptionsText();
      option.className = 'seaspaceai-agent-room-select-first-option'
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
  datePickerContainer.className = 'seaspaceai-agent-date-picker-container';

  var divLabels = document.createElement('div');
  divLabels.className = 'seaspaceai-agent-date-picker-labels-container'
  var divInnerContainer = document.createElement('div');
  divInnerContainer.className = 'seaspaceai-agent-date-picker-inner-container';

  var labelArrival = document.createElement('p');
  labelArrival.className = 'seaspaceai-agent-date-picker-label-arrival';
  labelArrival.textContent = arrivalText();

  var labelDeparture = document.createElement('p');
  labelDeparture.className = 'seaspaceai-agent-date-picker-label-departure';
  labelDeparture.textContent = departureText();

  divLabels.appendChild(labelArrival);
  divLabels.appendChild(labelDeparture);

  var inputDatePickerArrival = document.createElement('input');
  inputDatePickerArrival.id = 'seaspaceai-agent-date-picker-arrival';
  inputDatePickerArrival.className = 'seaspaceai-agent-date-picker-arrival';
  inputDatePickerArrival.name = 'date-picker';
  inputDatePickerArrival.autocomplete = 'off';

  var dash = document.createElement('div');
  dash.textContent = '-';
  dash.className = 'seaspaceai-agent-date-picker-to';
  
  var inputDatePickerDeparture = document.createElement('input');
  inputDatePickerDeparture.id = 'seaspaceai-agent-date-picker-departure';
  inputDatePickerDeparture.className = 'seaspaceai-agent-date-picker-departure';
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
  labelAdults.className = 'seaspaceai-agent-input-number-adults-label';
  labelAdults.htmlFor = 'adults';
  labelAdults.textContent = adultsText();
  div4.appendChild(labelAdults);

  var inputAdults = document.createElement('input');
  inputAdults.type = 'number';
  inputAdults.className = 'seaspaceai-agent-input-number-adults';
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
  labelChildren.className = 'seaspaceai-agent-input-number-children-label';
  div5.appendChild(labelChildren);

  var inputChildren = document.createElement('input');
  inputChildren.type = 'number';
  inputChildren.name = 'children';
  inputChildren.className = 'seaspaceai-agent-input-number-children';
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
  button.className = 'seaspaceai-agent-input-button';
  button.textContent = dateSubmitButtonText();
  button.type = 'submit';
  div6.appendChild(button);

  form.appendChild(div6);

  var outerDiv = document.createElement('div');
  outerDiv.className = 'seaspaceai-agent-reservation-widget-background';

  outerDiv.appendChild(form);

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

  // const datePicker = new Litepicker({
  //   element: document.getElementById('seaspaceai-agent-date-picker-arrival'),
  //   elementEnd: document.getElementById('seaspaceai-agent-date-picker-departure'),
  //   singleMode: false,
  //   allowRepick: true,
  //   showTooltip: false,
  //   tooltipNumber: (totalDays) => {
  //     return totalDays - 1;
  //   },
  //   maxDate: new Date().setFullYear(new Date().getFullYear() + 1),
  //   lang: datePickerLangText(),
  //   format: "DD.MM.YYYY"
  // })

  function changeInputFieldLangText(){
    const text = inputFieldLangText()
    cwtFormInput.placeholder = text
  }

  
  function changeDatePickerText(){
    const litepicker = document.getElementsByClassName('litepicker')
    const dateSubmitButton = document.getElementsByClassName('seaspaceai-agent-input-button')
    const inputNumberAdults = document.getElementsByClassName('seaspaceai-agent-input-number-adults-label')
    const inputNumberChildren = document.getElementsByClassName('seaspaceai-agent-input-number-children-label')
    const datePickerLabelArrival = document.getElementsByClassName('seaspaceai-agent-date-picker-label-arrival')
    const datePickerLabelDeparture = document.getElementsByClassName('seaspaceai-agent-date-picker-label-departure')
    const selectFirstOption = document.getElementsByClassName('seaspaceai-agent-room-select-first-option')
    const deleteMessagesText = document.getElementById('seaspaceai-delete-message-text')
    
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
      element: document.getElementById('seaspaceai-agent-date-picker-arrival'),
      elementEnd: document.getElementById('seaspaceai-agent-date-picker-departure'),
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
        starting_message = 'Welcome to the website of the Grand hotel, I am your assistant. If you need additional or specific information, feel free to ask me.'
        break;
        
      case 'German':
        starting_message = "Willkommen auf der Website des Hotels Grand, ich bin Ihr Assistent. Wenn Sie zusätzliche oder spezifische Informationen benötigen, fragen Sie mich gerne."
        break;
        
      case 'Italian':
        starting_message = "Benvenuti nel sito web dell'hotel Grand, sono il vostro assistente. Se hai bisogno di informazioni aggiuntive o specifiche, non esitare a chiedermelo."
        break;
        
      default:
        starting_message = 'Dobrodošli na stranicu hotela Grand, ja sam vaš asistent. Ako trebate dodatne ili specifične informacije slobodno me pitajte.'
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

    changeDatePickerText()
    changeInputFieldLangText()
  });

  // end local storage

  const currentUrl = window.location.href;
  const localUrl = 'http://localhost:8000/api/chat';
  const prodUrl = 'https://demohotelchat.cwtai.co/api/chat'

  const apiUrl = currentUrl.includes("demohotelweb.seaspace.ai") || currentUrl.includes("chatbotconsole.seaspace.ai") ? prodUrl : localUrl;

  let eventListenerAdded = false

  function addDatePickerButton(newOutputDiv){
    const dateContainer = document.createElement('div');
    dateContainer.className = 'seaspaceai-agent-date-button-container'

    newOutputDiv.appendChild(dateContainer)

    const dateButton = document.createElement('button');
    dateButton.className = 'seaspaceai-agent-date-button'

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

    const dateWidgetBackgrounds = document.getElementsByClassName('seaspaceai-agent-reservation-widget-background');
    const dateWidgets = document.getElementsByClassName('seaspaceai-agent-reservation-widget');
    const dateWidgetButtons = document.getElementsByClassName('seaspaceai-agent-input-button');
    const dateWidgetForms = document.getElementsByClassName('seaspaceai-agent-reservation-widget');

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
          const adults = e.target[3].value
          const children = e.target[4].value

          for (const dateWidgetBackground of dateWidgetBackgrounds) {
            dateWidgetBackground.style.visibility = dateWidgetBackground.style.visibility === 'hidden' || dateWidgetBackground.style.visibility === '' ? 'visible' : 'hidden';
            dateWidgetBackground.style.pointerEvents = dateWidgetBackground.style.pointerEvents === 'none' || dateWidgetBackground.style.pointerEvents === '' ? 'auto' : 'none';
            dateWidgetBackground.style.opacity = dateWidgetBackground.style.opacity === '0' || dateWidgetBackground.style.opacity === '' ? '1' : '0';
          }

          const newInputDiv = document.createElement('div');
          newInputDiv.className = 'seaspaceai-agent-message-user'
    
          const newInput = document.createElement('p');
          newInput.className = 'seaspaceai-agent-input'
    
          body.appendChild(newInputDiv);
          newInputDiv.appendChild(newInput)
          newInput.innerHTML += e.target[1].value + " - " + e.target[2].value 
    
          const newOutputDiv = document.createElement('div');
          newOutputDiv.className = 'seaspaceai-agent-message-agent'
    
          const newOutput = document.createElement('p');
          newOutput.className = 'seaspaceai-agent-output streaming'
          newOutput.style.setProperty('--shouldDisplay', 'inline-block')
    
          body.appendChild(newOutputDiv);
          newOutputDiv.appendChild(newOutput)
    
          body.scrollTop = body.scrollHeight;

          const json_data = {
            "messages": [
              {
                "role": "user",
                "content": "check_booking_and_availability room:" + room + " arrival:" + arrival + " departure:" + departure + " adult:" + adults + " children:" + children + ". Format links in the following manner: [link]."
              }
            ],
            "chatbot_name": "grand_hotel_chatbot",
            "conversation_id": localStorage.getItem('seaspaceai-agent-conversation-id') ? localStorage.getItem('seaspaceai-agent-conversation-id') : null 
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
                      let finalResult = resultArray.join('');
                      
                      const urlRegex = /(https?:\/\/[^\s]+)/;
                      const urlMatch = urlRegex.exec(finalResult);
                      
                      let linkURL = urlMatch[0];

                      const indexOfBracket = linkURL.indexOf(')');
                      if(indexOfBracket !== -1){
                        linkURL = linkURL.substring(0, indexOfBracket);
                      }

                      if (linkURL != null) {
                        const linkText = "booking";
                        newOutput.innerHTML += ' <a href="' + linkURL + '" target="_blank" class="seaspaceai-agent-reservation-link">' + linkText + '</a>.';
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

  function submitForm(e){
    if (e.target[0].value === '' || e.target[0].value.length < 2) {
      console.error('Input value cannot be empty');
      
      cwtFormInput.disabled = false;
      cwtFormInput.focus();
      return;
    }

    cwtFormInput.disabled = true;

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
      "chatbot_name": "grand_hotel_chatbot",
      "conversation_id": localStorage.getItem('seaspaceai-agent-conversation-id') ? localStorage.getItem('seaspaceai-agent-conversation-id') : null 
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
});
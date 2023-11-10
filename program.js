
const optionUpper = document.querySelector('#upper');
const optionLower = document.querySelector('#lower');
const optionNumbers = document.querySelector('#numbers');
const optionSymbols = document.querySelector('#symbols');
const passWord = document.getElementById('password');
const passLength = document.querySelector('#length');
const lengthPreview = document.querySelector('#length-preview');
const passwordConatiner = document.querySelector('.password-output');

///////////////////////////////// slider input ///////////////////////////

passLength.addEventListener('input', function() {
  lengthPreview.textContent = passLength.value
  
});

///////////////////////////////// form doesn't refresh ///////////////////////////

let form = document.querySelector('#myForm');
const handleForm = (event) => { event.preventDefault(); } 
form.addEventListener('submit', handleForm);



  const savePassword = document.querySelector("#save-pass")
  const choices = document.querySelector("#choices")

  const errorMessage = document.createElement('span');
  errorMessage.style.color = 'red';
  const passwordName = document.createElement("input");
  passwordName.type = "text";
  passwordName.placeholder = "Enter Password Name";
  passwordName.checked = false


  savePassword.addEventListener('change', function() {
    if (savePassword.checked) {
      passwordName.style.display = "block"
      errorMessage.style.display = "block"
        // Append the password name input to the choices element
      choices.appendChild(passwordName);
      choices.appendChild(errorMessage);
      
    } else {
      passwordName.style.display = "none"
      errorMessage.style.display = "none"
    }
  });




////////////////////////////////////// password generator program //////////////////////////

const passGenerator = () => {
    
  const upper = "QWERTYUIOPASDFGHJKLZXCVBNM";
  const lower = "qwertyuiopasdfghjklzxcvbnm";
  const num = "123456789";
  const symbols = "!@#$%^&*()_+-=[]{}|;:,.<>/?~";

  let charArr = [];
  const lenGth = passLength.value;

  if (optionUpper.checked) {
      charArr.push(upper);
    }

  if (optionLower.checked) {
      charArr.push(lower);
    }

  if (optionNumbers.checked) {
      charArr.push(num);
    }

  if (optionSymbols.checked) {
      charArr.push(symbols);
    }



  let choiceContribiution = lenGth / charArr.length;
  let result = "";
  let remainder = 0;

  charArr.forEach(element => {
  let countChar = Math.floor(choiceContribiution + remainder);
  remainder = choiceContribiution + remainder - countChar;
  

  for (let i = 0; i < countChar; i++) {
      let randomIndex = Math.floor(Math.random() * element.length);
      result += element[randomIndex];
  }
  });

  // Randomize the index of characters in the generated string
  let randomizedString = '';
  while (result.length > 0) {
  let randomIndex = Math.floor(Math.random() * result.length);
  randomizedString += result[randomIndex];
  result = result.slice(0, randomIndex) + result.slice(randomIndex + 1);
  }

  passWord.value = randomizedString;

  ////////////////////////////////// save password //////////////////////////////////////

  if (savePassword.checked) {

      const inputValue = passwordName.value;
      const localStorageKeys = Object.keys(localStorage);



    
      if (localStorageKeys.includes(inputValue)) {

          errorMessage.textContent = 'Password name already exists.';
          
        
      } else {

        errorMessage.textContent = ""

        // Store the updated entries in local storage
        localStorage.setItem(passwordName.value, randomizedString);


         
    };

  }
  

  
  
}



///////////////////////////////////// copy password /////////////////////////////////

form.addEventListener('submit', passGenerator);

function copyPassword() {
  const copyOutput = document.getElementById("copy-output")
  passWord.select();
  document.execCommand('copy');
  passWord.blur();
  copyOutput.innerText = "Password Copied Successfully"
  setTimeout(() => {
    copyOutput.innerText = "";
  } , "1500")
}

passwordConatiner.addEventListener('click', copyPassword);


///////////////////////////////////////// reveal history passwords /////////////////////////////

const revealHistory = () => {
  const keys = Object.keys(localStorage);

  // Clear the existing content
  const main = document.querySelector("#savedhistory");
  main.innerHTML = '';


  // Iterate over the keys and get the corresponding values
  keys.forEach(key => {
    const value = localStorage.getItem(key);

    // Access the password value within the object
    const passwordValue = value;


    // Create the template
    const template = `
      <div class="password-history">
        <span class="passwordKey" data-value="${passwordValue}">${key}</span>
        <svg class="remove" data-key="${key}" xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
          <!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
          <style>svg{fill:#00ff62}</style>
          <path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z"/>
        </svg>
      </div>`;

    // Append the template to the main element
    main.insertAdjacentHTML('beforeend', template);
  });
};

// Call the function to reveal the history
revealHistory();


const storageContainer = document.querySelector("#savedhistory");
storageContainer.style.display = 'none';

function toggleStorage() {
  if (storageContainer.style.display === 'none') {
    // Show the storage container
    storageContainer.style.display = 'block';
    revealHistory(); // Call a function to populate the container with key-value pairs
  } else {
    // Hide the storage container
    storageContainer.style.display = 'none';
  }
}

const history = document.querySelector("#history");
history.addEventListener('click', toggleStorage);



const passwordKey = document.querySelectorAll('.passwordKey');


const copyDataValue = (event) => {
  if (event.target.classList.contains('passwordKey')) {
    const dataValue = event.target.getAttribute('data-value');
    
    navigator.clipboard.writeText(dataValue)
    .then(() => {
      // Provide some feedback to the user
      console.log('Data copied to clipboard:', dataValue);
    })
    .catch((error) => {
      // Handle any errors that occur while copying
      console.error('Failed to copy:', error);
    });
  }
};

storageContainer.addEventListener('click', copyDataValue);







const removeButtonHandler = (event) => {
  if (event.target.classList.contains('remove')) {
    const key = event.target.getAttribute('data-key');
    localStorage.removeItem(key);

    // Remove the corresponding password history element from the DOM
    const passwordHistory = event.target.closest('.password-history');
    passwordHistory.remove();
  }
};


storageContainer.addEventListener('click', removeButtonHandler);


const passTool = document.getElementById('pass-tool');

const revealPassTool = () => {

  if (form.style.visibility === 'hidden') {
    // Show the storage container
    form.style.visibility = 'visible';
  } else {
    // Hide the storage container
    form.style.visibility = 'hidden';
  }

}

// passTool.addEventListener('click', revealPassTool);
export async function submitForm(event) {
  event.preventDefault();

  const name = event.target.name.value;
  const subject = event.target.subject.value;
  const email = event.target.email.value;
  const message = event.target.message.value;

  let validForm = true;

  const formData = {
    name,
    subject,
    email,
    message,
  };

  if (!name) {
    document.getElementById('name').classList.add('is-invalid');
    validForm = false;

    setTimeout(() => {
      document.getElementById('name').classList.remove('is-invalid');
    }, 3000);
  }

  if (!subject) {
    document.getElementById('subject').classList.add('is-invalid');
    validForm = false;

    setTimeout(() => {
      document.getElementById('subject').classList.remove('is-invalid');
    }, 3000);
  }

  if (!email || !validEmail(email)) {
    document.getElementById('email').classList.add('is-invalid');
    validForm = false;

    setTimeout(() => {
      document.getElementById('email').classList.remove('is-invalid');
    }, 3000);
  }

  if (!message) {
    validForm = false;
  }

  if (!validForm) {
    return;
  }

  showSpinnerOnSubmitButton();
  disableSubmitButton();

  try {
    const result = await sendEmailRequest(formData);

    if (result.status === 'ok') {
      disableFormInputs();
      alert(result.message);
    } else if (result.status === 429) {
      disableFormInputs();
      alert(result.message);
    } else {
      alert(result.message);
      enableSubmitButton();
    }

    hideSpinnerOnSubmitButton();
  } catch (error) {
    alert(error);

    enableSubmitButton();
    hideSpinnerOnSubmitButton();
  }
}

const sendEmailRequest = (payload) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('http://localhost:5000/send-mail', {
        // Adding method type
        method: 'POST',

        // Adding body or contents to send
        body: JSON.stringify(payload),

        // Adding headers to the request
        headers: {
          'Content-Type': 'application/json',
          'Authorization-Key':
            'e213e014b74445418461848abc6f706be059ec9ed96cfb3b9e79f939b7177ed4',
        },
      });

      if (response.status === 429) {
        resolve({ status: response.status, message: response.statusText });
      }

      const json = await response.json();
      resolve(json);
    } catch (err) {
      if (!err.message) {
        reject('An Error Occurred !');
      }
      reject(err.message);
    }
  });
};

const validEmail = (email) => {
  return /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
    email
  );
};

const disableFormInputs = () => {
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const subject = document.getElementById('subject');
  const message = document.getElementById('message');

  const inputs = [name, email, subject, message];

  setDisabledAttributesAndStyles(inputs);
};

const setDisabledAttributesAndStyles = (inputs) => {
  inputs.forEach((input) => {
    input.setAttribute('disabled', true);
    input.style.background = 'none';
    input.style.color = 'white';
    input.style.fontWeight = 'lighter';
  });
};

const clearInputs = (inputs) => {
  inputs.forEach((element) => {
    element.value = '';
  });
};

const disableSubmitButton = () => {
  document.getElementById('formSubmitBtn').setAttribute('disabled', true);
};

const enableSubmitButton = () => {
  document.getElementById('formSubmitBtn').removeAttribute('disabled');
};

const showSpinnerOnSubmitButton = () => {
  const spinner = document.getElementById('loading-spinner');
  spinner.classList.remove('spinner-hide');
};

const hideSpinnerOnSubmitButton = () => {
  const spinner = document.getElementById('loading-spinner');
  spinner.classList.add('spinner-hide');
};

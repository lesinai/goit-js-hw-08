import throttle from 'lodash.throttle';
import storeService from './json.js';

const formRef = document.querySelector('.feedback-form');

if (localStorage.getItem("feedback-form-state")) {
    const savedInputs = storeService.load("feedback-form-state")
     for (const input in savedInputs) {
        if (savedInputs[input]) {
            formRef[input].value = savedInputs[input];
        }
    }
}


formRef.addEventListener('input', throttle(onInputForm, 500))
formRef.addEventListener('submit', onSubmitForm)


let inputHolder = {};

function onInputForm(e) {
    inputHolder[e.target.name] = e.target.value;
    storeService.save("feedback-form-state", inputHolder);
}

function onSubmitForm(e) {
    e.preventDefault();
    localStorage.removeItem("feedback-form-state");
    formRef.reset();
}

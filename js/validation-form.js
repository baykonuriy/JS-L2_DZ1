//поменял логику: валидация поля происходит по focusout,
//кнопка разблокируется если все поля заполнены и валидны

class Form {
    constructor() {
        this.allForm = document.forms.myForm;
        this.fName = this.allForm.fName;
        this.eMail = this.allForm.eMail;
        this.tPhone = this.allForm.tPhone;
        this.btn = this.allForm.btn;
        this.text = this.allForm.text;
        this.regExp = {
            name: /^[А-ЯЁа-яёA-Za-z]+\-[А-ЯЁа-яёA-Za-z]+$|^[А-ЯЁа-яёA-Za-z\s]+$/gm,
            email: /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/,
            phone: /^\+7(\d{3}|\(\d{3}\))(\d{7}|\d{4}(\-|\–)\d{3})$/g,
            text: /./g,
        }
    }
    check(elem, regExp) {
        let checkElem = () => { return regExp.test(elem.value) };
        if (checkElem() == false && elem.value !== '') {
            elem.style.backgroundColor = 'red';
            elem.style.color = '#fff';
            this.alerts(elem.name);
        }
        else {
            elem.style.backgroundColor = 'white';
            elem.style.color = '#000';
        }
        this.validBtn();
    }
    validName() {
        this.fName.addEventListener('focusout', (e) => {
            this.check(e.target, this.regExp.name);
        })
    }
    validEmail() {
        this.eMail.addEventListener('focusout', (e) => {
            this.check(e.currentTarget, this.regExp.email);
        })
    }
    validPhone() {
        this.tPhone.addEventListener('focusout', (e) => {
            this.check(e.currentTarget, this.regExp.phone);
        })
    }
    validTextArea() {
        this.text.addEventListener('focusout', (e) => {
            this.check(e.currentTarget, this.regExp.text);
        })
    }
    validBtn() {
        let inValidForms = () => {
            let inValidForms = false;
            for (let i = 0; i < this.allForm.elements.length; i++) {
                if (this.allForm.elements[i].style.backgroundColor == 'red') {
                    return inValidForms = false;
                }
                else if (this.allForm.elements[i].style.backgroundColor !== 'red') {
                    inValidForms = true;
                }
            }
            return inValidForms;
        }
        let emptyFields = () => {
            let emptyFields = false;
            for (let j = 0; j < this.allForm.elements.length; j++) {
                if (this.allForm.elements[j].value == '') {
                    return emptyFields = false;
                }
                else if (this.allForm.elements[j].value !== '') {
                    emptyFields = true;
                }
            }
            return emptyFields;
        }

        if (inValidForms() && emptyFields()) {
            this.btn.removeAttribute('disabled');
            document.querySelector('#span').style.display = 'none';
        }
        else {
            this.btn.setAttribute('disabled', '');
            document.querySelector('#span').style.display = 'block';
        }
    }

    alerts(elemtName) {
        switch (elemtName) {
            case 'fName': alert('Ошибка! Напишите имя, используя буквы русского и латинского афавита. Двойные фамилии можно разделять дефисом');
                break;
            case 'eMail': alert('Текст про валидность email');
                break;
            case 'tPhone': alert('Текст про валидность телефона');
                break;
        }
    }
    validAll() {
        this.validEmail();
        this.validName();
        this.validPhone();
        this.validTextArea();
    }
}
let form = new Form();
form.validAll();



import {closeModal, openModal} from "./modal";
import {postData} from '../services/services';


function forms(formSelector, modalTimerId) {
    // Forms JSON

    const forms = document.querySelectorAll(formSelector);

    const mess = {
        loading: 'img/form/spinner.svg',
        success: 'Thank you!',
        failure: 'Upsss...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    // 59.Получение данных с сервер. Async/Await


    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();                         // Отключаем стандартное поведение браузера 

            const statusMess = document.createElement('img');
            statusMess.src = mess.loading;
            statusMess.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            form.insertAdjacentElement('afterend', statusMess); 
            // Добавляем спинер под форму 

            

            const formData = new FormData(form);

            // const object = {};
            // formData.forEach(function(value, key) {
            //     object[key] = value;
            // });

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            // заменяем уроком 59
            // fetch('server.php', {
            //     method: "POST", 
            //     headers: {
            //         'Content-type': 'application/json'
            //     },
            //     body: JSON.stringify(object)   
            // });

            postData('http://localhost:3000/requests', json) //JSON.stringify(object)
            // .then(data => data.text())
            .then(data => {
                console.log(data);
                showThanksModal(mess.success);
                statusMess.remove();
            }).catch (() => {
                showThanksModal(mess.failure);
            }).finally(() => {
                form.reset();
            });
        });     
    }   

    function showThanksModal(mess) {
        const prevModal = document.querySelector('.modal__dialog');

        prevModal.classList.add('hide');
        openModal('.modal', modalTimerId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${mess}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModal.classList.add('show');
            prevModal.classList.remove('hide');
            closeModal('.modal');
        }, 3000);
    }
}

export default forms;
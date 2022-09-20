document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form-id')
    form.addEventListener('submit', formSend)
    async function formSend(e) {
        e.preventDefault()

        let error = formValidate(form)
        let formData = new FormData(form)

        if (error === 0) {
            let response = await fetch('https://jsonplaceholder.typicode.com/users', {
                method: 'POST',
                body: formData
            })
            if (response.ok) {
                let result = await response.json()
                console.log(result.message)
                form.reset()
            } else {
                alert('Error')
            }
        } else {
            alert('Заполните обязательные поля')
        }
    }

    const formValidate = () => {
        let error = 0;
        let formInput = document.querySelectorAll('._req')

        for (let index = 0; index < formInput.length; index++) {
            let input = formInput[index]

            formRemoveError(input)
            if (input.classList.contains('_email')) {
                if (emailTest(input)) {
                    formAddError(input)
                    error++
                }
            } else if (input.classList.contains('_phone')) {
                if (phoneTest(input)) {
                    formAddError(input)
                    error++
                }
            } else if (input.getAttribute('type') === 'checkbox' && input.checked === false) {
                formAddError(input)
                error++
            } else {
                if (input.value === '') {
                    formAddError(input)
                    error++
                }
            }
        }
        return error
    }
    const formAddError = (input) => {
        // input.parentElement.classList.add('_error')
        input.classList.add('_error')
    }
    const formRemoveError = (input) => {
        // input.parentElement.classList.remove('_error')
        input.classList.remove('_error')

    }
    const emailTest = (input) => {
        return !/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/.test(input.value)
    }
    const phoneTest = (input) => {
        return !/^[\d\+][\d\(\)\ -]{4,14}\d$/.test(input.value)
}


})









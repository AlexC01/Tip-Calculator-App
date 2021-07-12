const bill = document.getElementById('bill');
const buttons = document.querySelectorAll('.button_tip');
const people = document.getElementById('people');
const warning = document.querySelector('.warning');
const warning_people = document.querySelector('.warning_people');
const customTip = document.getElementById('custom');
const tip_amount = document.querySelector('.tip_amount');
const total = document.querySelector('.total');
const form = document.getElementById('form-bill');
const reset = document.querySelector('.reset');

const cuenta = {
    bill: 0,
    tip: 0,
    people: 0,
}

const amount = () =>{
    if(cuenta.bill && cuenta.tip && cuenta.people){
        let result = (cuenta.bill * cuenta.tip) / cuenta.people
        let result_2 = (cuenta.bill / cuenta.people) + result
        tip_amount.textContent = `$${result.toFixed(2)}`;
        total.textContent = `$${result_2.toFixed(2)}`;
    }   
}

const boton_reset = () => {
    if(cuenta.bill || cuenta.tip || cuenta.people){
         reset.classList.remove('reset_button_disabled');
         reset.classList.remove('cursor-default');
         reset.removeAttribute('disabled');
         reset.classList.add('reset_button');
    }
}


bill.addEventListener('change', e => {
    if(e.target.value < 0 || e.target.value == 0){
        warning.textContent = `Insert a valid bill`;
        bill.classList.add('warning_style');
        cuenta.bill = 0;
        boton_reset();
    }else{
        warning.textContent = "";
        bill.classList.remove('warning_style');
        cuenta.bill = e.target.value;
        boton_reset();
        amount()
    }
});

const check_class = () => {
    buttons.forEach(elem => {
        if (elem.classList.contains('button_press')){
            elem.classList.remove('button_press');
        }
    })
}
buttons.forEach(elem => {
    elem.addEventListener('click', e => {
        check_class();
        elem.classList.toggle('button_press');
        cuenta.tip = parseInt(e.target.textContent)/100;
        boton_reset();
        e.preventDefault()
        amount()
    })
});

customTip.addEventListener('change', e => {
    check_class();
    let result = e.target.value;
    cuenta.tip = result/100;
    boton_reset();
    amount()
})

people.addEventListener('change', e => {
    if(e.target.value < 0 || e.target.value == 0){
        warning_people.textContent = `Can't be zero`;
        cuenta.people = 0;
        people.classList.add('warning_style');
        boton_reset();
    }else{
        warning_people.textContent = "";
        people.classList.remove('warning_style');
        cuenta.people = e.target.value;
        boton_reset();
        amount()
    }
})

reset.addEventListener('click', e => {
    form.reset();
    warning.textContent = "";
    check_class();
    bill.classList.remove('warning_style');
    warning_people.textContent = "";
    people.classList.remove('warning_style');
    tip_amount.textContent = "$0.00"
    total.textContent = "$0.00"
    reset.classList.remove('reset_button');
    reset.setAttribute('disabled', 'true');
    reset.classList.add('reset_button_disabled');
    reset.classList.add('cursor-default');
    e.preventDefault();
})

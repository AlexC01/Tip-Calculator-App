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
        tip_amount.textContent = result.toFixed(2);
        total.textContent = result_2.toFixed(2);
    }   
}

bill.addEventListener('change', e => {
    if(e.target.value < 0 || e.target.value == 0){
        warning.textContent = `Insert a valid bill`;
    }else{
        warning.textContent = "";
        cuenta.bill = e.target.value;
        amount()
    }
});

buttons.forEach(elem => {
    elem.addEventListener('click', e => {
        cuenta.tip = parseInt(e.target.textContent)/100;
        e.preventDefault()
        amount()
    })
});

customTip.addEventListener('change', e => {
    let result = e.target.value;
    cuenta.tip = result/100;
    amount()
})

people.addEventListener('change', e => {
    if(e.target.value < 0 || e.target.value == 0){
        warning_people.textContent = `Can't be zero`;
    }else{
        warning_people.textContent = "";
        cuenta.people = e.target.value;
        amount()
    }
})

reset.addEventListener('click', e => {
    form.reset();
    tip_amount.textContent = "$0.00"
    total.textContent = "$0.00"
    e.preventDefault();
})

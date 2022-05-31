
// console.log(calendar())
console.log(getCatAgeObject(33))

// const leftButton = document.querySelectorAll(`.leftButton`)
// const rightButton = document.querySelectorAll(`.rightButton`)

// leftButton.addEventListener(`click`, reduceInputValue)

// function reduceInputValue() {
//     const target = event.target
//     target.nextElementSibling.value = Number(target.previousElementSibling.value) - 1;
// }

// rightButton.addEventListener(`click`, increaseInputValue)

// function increaseInputValue() {
//     const target = event.target
//     target.previousElementSibling.value = Number(target.previousElementSibling.value) + 1;
// }

// let yearValue = document.querySelector(`.yearValue`)
// let mounthValue = document.querySelector(`.mounthValue`) 

const calendarYearContainer = document.querySelector(`.calendarYearContainer`)
const yearValue = document.querySelector(`.yearValue`)
const monthValue = document.querySelector(`#select`)
const calendarContainer = document.querySelector(`.calendarContainer`) 
calendarYearContainer.addEventListener(`click`, changeYearValue)
calendarYearContainer.addEventListener(`input`, yearRules)
const acceptContainerButton = document.querySelector(`.acceptContainerButton`)
let humanAge;

function changeYearValue() {
    let target = event.target
    if (event.target.className == `leftButton`) {
        target.nextElementSibling.value = Number(target.nextElementSibling.value) - 1;
        if (Number(target.nextElementSibling.value) < 0) {
            target.nextElementSibling.value = 0
        }
    } 
    if (event.target.className == `rightButton`) {
        target.previousElementSibling.value = Number(target.previousElementSibling.value) + 1;
    }

    makeCalendar(Number(yearValue.value), Number(monthValue.value))
}

function yearRules() {
    let reg = /[0-9]/g
    if (!event.target.value[event.target.value.length - 1].match(reg)) {
        event.target.value = event.target.value.replace(`${event.target.value[event.target.value.length - 1]}`, ``)
    }
    event.target.value = event.target.value.substring(0,4)   
    makeCalendar(Number(yearValue.value), Number(monthValue.value))
} 

const calendarMounthContainer = document.querySelector(`.calendarMounthContainer`)

calendarMounthContainer.addEventListener(`click`, changeMounth)

function changeMounth() {
    let target = event.target
    if (event.target.className == `leftButton`) {
        if (Number(target.nextElementSibling.value) == 0) {
            target.nextElementSibling.value = 11;
            makeCalendar(Number(yearValue.value), Number(monthValue.value))
            return
        }
        target.nextElementSibling.value = Number(target.nextElementSibling.value) - 1;
    } 

    if (event.target.className == `rightButton`) {
        if (Number(target.previousElementSibling.value) == 11) {
            target.previousElementSibling.value = 0;
            makeCalendar(Number(yearValue.value), Number(monthValue.value))
            return
        }
        target.previousElementSibling.value = Number(target.previousElementSibling.value) + 1;

    }

    makeCalendar(Number(yearValue.value), Number(monthValue.value))
}

function makeCalendar(year, month, day) {
    const calendarRows = calendarContainer.querySelectorAll(`.calendarRow`)

    const calendarArr = calendar().of(year, month)[`calendar`]
    let j = 0;

    for (let i = 1; i < calendarRows.length; i++) {
        let cells = calendarRows[i].querySelectorAll(`.calendarTd`)
        for (cell of cells) {
            cell.classList.remove("empty")
        }
        for (let i = 0; i < cells.length; i++) {
            if(calendarArr[j]) {
                if (calendarArr[j][i] == 0) {
                    cells[i].innerHTML = ``
                    cells[i].classList.add("empty")
                } else {
                    cells[i].innerHTML = calendarArr[j][i];
                }
            } else {    
                cells[i].innerHTML = ``
                cells[i].classList.add("empty")
            }    
        }
        j += 1;
    }
    const birthDateContainer = document.querySelector(`.birthDateContainer`)
    let yearDate = year
    if (Math.abs(year) < 1000) {
        yearDate = `0` + year
    }
    if (Math.abs(year) < 100) {
        yearDate = `00` + year
    }
    if (Math.abs(year) < 10) {
        yearDate = `000` + year
    }
    let monthDate = month + 1;
    if (monthDate < 10) {
        monthDate = `0` + monthDate
    }
    let dayDate = `00`;
    if (day) {
        dayDate = day
        if (dayDate < 10) {
            dayDate = `0` + dayDate
        }
    }
    
    if(dayDate != `00`) {
        birthDateContainer.innerHTML = `${dayDate}.${monthDate}.${yearDate}`
        birthDateContainer.classList.add(`complete`)
        document.querySelector(`.calendarBottom`).add(`complete`)
    }
    humanAge = new Date().getFullYear() - year 
    birthDateContainer.innerHTML = `${dayDate}.${monthDate}.${yearDate}`
}

calendarContainer.addEventListener(`click`, addDay)

function addDay() {
    if(!event.target.classList.contains(`num`)) {
        return
    } else {
        if(event.target.innerHTML == ``) {
            return
        }
        console.log(`1sa`)
        makeCalendar(Number(yearValue.value), Number(monthValue.value), Number(event.target.innerHTML))
    }
}

acceptContainerButton.addEventListener(`click`, catAge) 

function catAge() {
    console.log(event.target.innerHTML)
    if (event.target.innerHTML == `Fill Date`) {
        alert(`Please indicate your birthday`)
    } else {
        let message = `You are a `
        if (getCatAgeObject(humanAge)[`years`] && getCatAgeObject(humanAge)[`months`]) {
            message += getCatAgeObject(humanAge)[`years`] + ` year(s)`
            message += ` and `
            message += getCatAgeObject(humanAge)[`months`] + ` month(s)`
            alert(message + ` old cat`)
            return
        }
        if (getCatAgeObject(humanAge)[`years`]) {
            message += getCatAgeObject(humanAge)[`years`] + ` year(s)`
            alert(message + ` old cat`)
            return
        }
        if (getCatAgeObject(humanAge)[`months`]) {
            message += getCatAgeObject(humanAge)[`months`] + ` months`
            alert(message + ` old cat`)
            return
        }
    }
}

acceptContainerButton.classList.add(`ready`)
yearValue.value = 2000;
makeCalendar(2000, 0)
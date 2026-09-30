// ========================================
// ПРИЧИНЫ
// ========================================

const reasons = [

    "даже за своей сдержанностью ты умеешь быть очень тёплым.",

    "ты умеешь делать обычные дни особенными.",

    "с тобой мне спокойно.",

    "ты умеешь заботиться, даже когда не говоришь об этом.",

    "ты тот человек, которому хочется рассказывать обо всём.",

    "даже на расстоянии ты остаёшься мне близким.",

    "ты умеешь быть открытым с людьми и легко находишь общий язык практически с каждым.",

    "ты человек слова: если ты что-то сказал, на твои слова можно опереться.",

    "с тобой хочется строить планы.",

    "ты умеешь заставить меня улыбаться.",

    "твоя доброта проявляется не в красивых словах, а в поступках.",

    "ты стал частью моих самых тёплых воспоминаний.",

    "обычное «скучаю» стало значить намного больше.",

    "в тебе есть та самая надёжность, которую невозможно сыграть.",

    "ты внимателен к деталям и запоминаешь всё, что я могу забыть.",

    "ты мой лучший друг и тот мужчина, которым я восхищаюсь."

];


let lastReason = -1;


// ========================================
// ПЕРВЫЙ ЭКРАН → ВТОРОЙ
// ========================================

function openSite() {

    document
        .getElementById("welcome")
        .classList
        .add("hidden");


    document
        .getElementById("main")
        .classList
        .remove("hidden");

}


// ========================================
// НОВАЯ ПРИЧИНА
// ========================================

function newReason() {

    let randomNumber;


    do {

        randomNumber =
            Math.floor(
                Math.random() * reasons.length
            );

    } while (
        randomNumber === lastReason &&
        reasons.length > 1
    );


    lastReason = randomNumber;


    document
        .getElementById("reason")
        .textContent =
        reasons[randomNumber];

}


// ========================================
// ВТОРОЙ ЭКРАН → ВОСПОМИНАНИЯ
// ========================================

function openMemories() {

    document
        .getElementById("main")
        .classList
        .add("hidden");


    document
        .getElementById("memories")
        .classList
        .remove("hidden");

}


// ========================================
// ВОСПОМИНАНИЯ → БЛИЗОСТЬ
// ========================================

function openCloseness() {

    document
        .getElementById("memories")
        .classList
        .add("hidden");


    document
        .getElementById("closeness")
        .classList
        .remove("hidden");

}


// ========================================
// TELEGRAM
// ========================================

async function sendTelegram(action) {

    try {

        const response = await fetch(
            "/api/send",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    action: action
                })
            }
        );


        const data =
            await response.json();


        if (data.success) {

            alert(
                "🤍 сообщение отправлено."
            );

        } else {

            alert(
                "не получилось отправить сообщение 😔"
            );

            console.error(data);

        }


    } catch (error) {

        alert(
            "не получилось связаться с сервером 😔"
        );

        console.error(error);

    }

}
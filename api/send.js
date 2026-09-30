export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({
            error: "Method not allowed"
        });
    }

    try {
        const { action } = req.body;

        if (!action) {
            return res.status(400).json({
                error: "Не указано действие"
            });
        }

        const token = process.env.TELEGRAM_BOT_TOKEN;
        const chatId = process.env.TELEGRAM_CHAT_ID;

        if (!token || !chatId) {
            return res.status(500).json({
                error: "Telegram не настроен"
            });
        }

        let message;

        if (action === "обнять") {
            message = "🤍 олег хочет тебя обнять";
        } else if (action === "поцеловать") {
            message = "💋 олег хочет поцелуйчик";
        } else {
            message = "🤍 олег нажал кнопку на сайте: " + action;
        }

        const telegramResponse = await fetch(
            `https://api.telegram.org/bot${token}/sendMessage`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    chat_id: chatId,
                    text: message
                })
            }
        );

        const telegramData = await telegramResponse.json();

        if (!telegramResponse.ok) {
            return res.status(500).json({
                error: "Telegram не смог отправить сообщение"
            });
        }

        return res.status(200).json({
            success: true
        });

    } catch (error) {
        return res.status(500).json({
            error: "Ошибка сервера"
        });
    }
}

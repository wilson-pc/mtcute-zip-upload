import { TelegramClient } from '@mtcute/node';
import { Dispatcher, filters } from '@mtcute/dispatcher';
import 'dotenv/config';
const apiId = Number(process.env.API_ID);
const apiHash = process.env.API_HASH;
const token = process.env.BOT_KEY || '';
const tg = new TelegramClient({
    apiId: apiId,
    apiHash: apiHash ?? ''
});
(async () => {
    await tg.start({
        botToken: token
    });
    const dp = Dispatcher.for(tg);
    dp.onNewMessage(filters.text, async (msg) => {
        const userId = msg?.sender?.id;
        console.log(userId);
        const chatId = msg.chat.id;
        const filePath = `./archives.zip`;
        const media = await tg.uploadFile({
            file: filePath,
            fileMime: 'application/zip',
        });
        await tg.sendMedia(msg.chat.id, {
            file: media,
            type: 'document',
            fileMime: 'application/zip',
            fileName: `archives.zip`
        });
    });
})();

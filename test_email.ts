import { sendEmail } from "./src/lib/mailer"; console.log(await sendEmail({to: "accessnestbd@gmail.com", subject: "Test", html: "<h1>Test Data</h1>"}));

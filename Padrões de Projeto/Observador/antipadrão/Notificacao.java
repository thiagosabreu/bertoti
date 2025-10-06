class NotifierBad {
    public void send(String message) {
        EmailService email = new EmailService();
        SmsService sms = new SmsService();

        email.update(message);
        sms.update(message);
    }
}

class EmailService {
    public void update(String msg) {
        System.out.println("📧 Email enviado: " + msg);
    }
}

class SmsService {
    public void update(String msg) {
        System.out.println("📱 SMS enviado: " + msg);
    }
}

public class Notificacao {
    public static void main(String[] args) {
        NotifierBad notifier = new NotifierBad();
        notifier.send("Promoção relâmpago!");
    }
}

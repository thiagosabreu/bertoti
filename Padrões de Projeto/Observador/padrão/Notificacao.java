import java.util.ArrayList;
import java.util.List;

interface Observer {
    void update(String message);
}

class Notifier {
    private final List<Observer> observers = new ArrayList<>();

    public void subscribe(Observer observer) {
        observers.add(observer);
    }

    public void notifyAll(String message) {
        for (Observer o : observers) {
            o.update(message);
        }
    }
}

class EmailService implements Observer {
    public void update(String msg) {
        System.out.println("📧 Email enviado: " + msg);
    }
}

class SmsService implements Observer {
    public void update(String msg) {
        System.out.println("📱 SMS enviado: " + msg);
    }
}

public class Notificacao {
    public static void main(String[] args) {
        Notifier notifier = new Notifier();
        notifier.subscribe(new EmailService());
        notifier.subscribe(new SmsService());

        notifier.notifyAll("Promoção relâmpago!");
    }
}

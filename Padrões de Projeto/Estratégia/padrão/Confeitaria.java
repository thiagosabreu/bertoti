interface Doce {
    void preparar();
}

class Bolo implements Doce {
    public void preparar() {
        System.out.println("Preparando bolo...");
    }
}

class Confeitaria {
    public Doce criarDoce() {
        return new Bolo();
    }
}

public class Confeitaria {
    public static void main(String[] args) {
        Confeitaria confeitaria = new Confeitaria();
        Doce doce = confeitaria.criarDoce();
        doce.preparar();
    }
}

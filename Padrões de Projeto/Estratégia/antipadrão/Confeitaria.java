
class Confeitaria {
    public void fazerBolo() {
        System.out.println("Fazendo bolo...");
    }
    public void venderDoce() {
        System.out.println("Vendendo doce...");
    }
    public void limparLoja() {
        System.out.println("Limpando confeitaria...");
    }
}

public class Confeitaria {
    public static void main(String[] args) {
        Confeitaria c = new Confeitaria();
        c.fazerBolo();
        c.venderDoce();
        c.limparLoja();
    }
}
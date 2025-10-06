package antipadrao;

import java.util.ArrayList;
import java.util.List;

class Menu {
    protected String nome;
    protected List<Menu> itens = new ArrayList<>();

    public Menu(String nome) {
        this.nome = nome;
    }

    public void adicionar(Menu item) {
        itens.add(item);
    }

    public void mostrar() {
        System.out.println("Item: " + nome);
    }

}

class Prato extends Menu {
    private double preco;

    public Prato(String nome, double preco) {
        super(nome);
        this.preco = preco;
    }

    @Override
    public void mostrar() {
        System.out.printf("Prato: %s - R$ %.2f%n", nome, preco);
    }

}

class PratoComposto extends Menu {
    private double preco;

    public PratoComposto(String nome, double preco) {
        super(nome);
        this.preco = preco;
    }

    @Override
    public void mostrar() {
        System.out.printf("Prato composto: %s - R$ %.2f%n", nome, preco);
        for (Menu item : itens) {
            item.mostrar();
        }
    }

}

class Restaurante {
    private String nome;

    public Restaurante(String nome) {
        this.nome = nome;
    }

    public void mostrarExemploAntipadrao() {
        System.out.println("\n🍴 Restaurante: " + nome + " (Exemplo Anti-Padrão)");

        PratoComposto pizza = new PratoComposto("Pizza Gigante", 60);
        pizza.adicionar(new Prato("Mini Pizza", 15));

        pizza.mostrar();
    }

}

public class Restaurante {
    public static void main(String[] args) {
        Restaurante restaurante = new Restaurante("FastFood X");
        restaurante.mostrarExemploAntipadrao();
    }
}

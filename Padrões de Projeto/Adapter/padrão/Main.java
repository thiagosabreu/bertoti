
interface TomadaAmericana {
    void conectarNaTomadaAmericana();
}

class PlugEuropeu {
    void conectarNaTomadaEuropeia() {
        System.out.println("Plug europeu conectado 🇪🇺");
    }
}

class AdapterEuropeuParaAmericano implements TomadaAmericana {
    private PlugEuropeu plug;

    AdapterEuropeuParaAmericano(PlugEuropeu plug) {
        this.plug = plug;
    }

    @Override
    public void conectarNaTomadaAmericana() {
        plug.conectarNaTomadaEuropeia();
    }
}

public class Main {
    public static void main(String[] args) {
        PlugEuropeu plug = new PlugEuropeu();
        TomadaAmericana tomada = new AdapterEuropeuParaAmericano(plug);
        tomada.conectarNaTomadaAmericana();
    }
}
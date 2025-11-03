class MainErrado {
    public static void main(String[] args) {
        // Tentando conectar direto (sem adaptação)
        PlugEuropeu plug = new PlugEuropeu();
        // Erro conceitual: a TomadaAmericana espera outro método
        // plug.conectarNaTomadaAmericana(); // Não existe!
    }
}
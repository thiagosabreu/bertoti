Atividade 1: Comentário sobre trecho do livro "Software Engineering at Google" - 09/08/2024

  Concordo com o que foi dito no trecho do livro, a Engenharia de Software envolve muito mais planejamento e prevenção de problemas do que o ato de programar.
As decisões precisam ser tomadas pensando no futuro, como seria a manutenção, se vale a pena, e quais são os riscos por exemplo.

Atividade 2: Citar 3 trade-offs - 12/08/2024
  1. Desempenho x Segurança
  2. Facilidade de manutenção x Tempo de desenvolvimento
  3. Qualidade x Velocidade

Atividade 3: Java - 19/09/2024
```bash
public class Pet {
    
    private String nome;
    private String tipo;
    
    public Pet(String nome, String tipo) { 
        this.nome = nome;
        this.tipo = tipo;
    }
    
    public String getNome() {
        return nome;
    }
    
    public void setNome(String nome) {
        this.nome = nome;
    }
    
    public String getTipo() {
        return tipo;
    }
    
    public void setTipo(String tipo) {
        this.tipo = tipo;
    }
}
```
```bash
import java.util.List;
import java.util.LinkedList;
public class PetShop {
    private List<Pet> pets = new LinkedList<Pet>();
    
    public void cadastrarPet(Pet pet) {
        pets.add(pet);
    }
    
    public List<Pet> buscarPetPorNome(String nome){
        List<Pet> petsEncontrados = new LinkedList<Pet>();
        for(Pet pet : pets) {
            if(pet.getNome().equals(nome)) 
                petsEncontrados.add(pet);
        }
        return petsEncontrados;
    }
    
    public List<Pet> getPets(){
        return pets;
    }
}
```
```bash
import static org.junit.jupiter.api.Assertions.*;
import java.util.List;
import org.junit.jupiter.api.Test;
class TestePetShop {
    @Test
    void test() {
        
        PetShop petShop = new PetShop();
        
        Pet aguacomGas = new Pet("Agua com gas", "Leao");
        Pet aguaSemGas = new Pet("Agua sem gas", "Gato");
        
        petShop.cadastrarPet(AguaComGas);
        petShop.cadastrarPet(aguaSemGas);
        
        assertEquals(petShop.getPets().size(), 2);
        
        List<Pet> aguaPets = petShop.buscarPetPorNome("AguaComGas");
        assertEquals(aguaPets.get(0).getTipo(), aguaComGas.getTipo());
    }
}

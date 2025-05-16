package com.thehecklers.sburrestdemo;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.UUID;

@Entity
public class Tenis {
    @Id
    private String id;

    private String nome;

    @Column(name = "imagem_url")
    private String imagemUrl;

    @Column(name = "preco")
    private Double  preco;

    public Tenis() {}

    public Tenis(String id, String nome, String imagemUrl, Double  preco) {
        this.id = id;
        this.nome = nome;
        this.imagemUrl = imagemUrl;
        this.preco = preco;
    }

    public Tenis(String nome, String imagemUrl, Double  preco) {
        this(UUID.randomUUID().toString(), nome, imagemUrl, preco);
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getImagemUrl() { return imagemUrl; }
    public void setImagemUrl(String imagemUrl) { this.imagemUrl = imagemUrl; }

    public Double  getPreco() { return preco; }
    public void setPreco(Double  preco) { this.preco = preco; }
}

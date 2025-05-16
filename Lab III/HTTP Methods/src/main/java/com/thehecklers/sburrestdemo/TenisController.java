package com.thehecklers.sburrestdemo;

import java.util.Collection;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/tenis")
public class TenisController {

    private final TenisRepository tenisRepository;

    @Autowired
    public TenisController(TenisRepository tenisRepository) {
        this.tenisRepository = tenisRepository;
    }

    @GetMapping
    public Collection<Tenis> getTenis() {
        return tenisRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Tenis> getTenisById(@PathVariable String id) {
        Optional<Tenis> tenis = tenisRepository.findById(id);
        return tenis.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Tenis> postTenis(@RequestBody Tenis tenis) {
        if (tenis.getId() == null || tenis.getId().isEmpty()) {
            tenis.setId(UUID.randomUUID().toString());
        }
        Tenis savedTenis = tenisRepository.save(tenis);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedTenis);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Tenis> putTenis(@PathVariable String id, @RequestBody Tenis tenis) {
        if (!tenisRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        tenis.setId(id);
        Tenis updatedTenis = tenisRepository.save(tenis);
        return ResponseEntity.ok(updatedTenis);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTenis(@PathVariable String id) {
        if (!tenisRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        tenisRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}

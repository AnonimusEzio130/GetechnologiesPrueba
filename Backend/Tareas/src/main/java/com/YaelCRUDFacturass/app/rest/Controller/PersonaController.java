package com.YaelCRUDFacturass.app.rest.Controller;

import com.YaelCRUDFacturass.app.rest.Model.Persona;
import com.YaelCRUDFacturass.app.rest.Service.PersonaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("app/personas")
public class PersonaController {
    private final PersonaService personaService;

    public PersonaController(PersonaService personaService) {
        this.personaService = personaService;
    }

    @GetMapping("/todaslaspersonas")
    public ResponseEntity<List<Persona>> obtenerTodasLasPersonas() {
        List<Persona> personas = personaService.obtenerTodasLasPersonas();
        return ResponseEntity.ok(personas);
    }

    @GetMapping("/persona/{id}")
    public ResponseEntity<Persona> obtenerPersonaPorId(@PathVariable Long id) {
        Persona persona = personaService.obtenerPersonaPorId(id);
        if (persona != null) {
            return ResponseEntity.ok(persona);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("persona/identificacion/{identificacion}")
    public ResponseEntity<Persona> obtenerPersonaPorIdentificacion(@PathVariable String identificacion) {
        Persona persona = personaService.obtenerPersonaPorIdentificacion(identificacion);
        if (persona != null) {
            return ResponseEntity.ok(persona);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/nueva/persona")
    public ResponseEntity<Persona> guardarPersona(@RequestBody Persona persona) {
        Persona personaGuardada = personaService.guardarPersona(persona);
        return ResponseEntity.ok(personaGuardada);
    }

    @DeleteMapping("/eliminar/persona/id/{id}")
    //No elimina facturas, solo es demostracion de funcionamiento.
    public ResponseEntity<Void> eliminarPersona(@PathVariable Long id) {
        personaService.eliminarPersona(id);
        return ResponseEntity.noContent().build();
    }
    @DeleteMapping("eliminar/persona/identificacion/{identificacion}")
    public ResponseEntity<Void> eliminarPersonaConFacturas(@PathVariable String identificacion) {
        personaService.eliminarPersonaConFacturas(identificacion);
        return ResponseEntity.noContent().build();
    }
}
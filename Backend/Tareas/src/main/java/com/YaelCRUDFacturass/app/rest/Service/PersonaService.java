package com.YaelCRUDFacturass.app.rest.Service;

import com.YaelCRUDFacturass.app.rest.Model.Persona;
import com.YaelCRUDFacturass.app.rest.Repository.PersonaRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class PersonaService {
    private final PersonaRepository personaRepository;

    public PersonaService(PersonaRepository personaRepository) {
        this.personaRepository = personaRepository;
    }

    public Persona guardarPersona(Persona persona) {
        return personaRepository.save(persona);
    }

    public List<Persona> obtenerTodasLasPersonas() {
        return personaRepository.findAll();
    }

    public Persona obtenerPersonaPorId(Long id) {
        return personaRepository.findById(id).orElse(null);
    }

    public Persona obtenerPersonaPorIdentificacion(String identificacion) {
        return personaRepository.findByIdentificacion(identificacion);
    }

    public void eliminarPersona(Long id) {
        personaRepository.deleteById(id);
    }

    public void eliminarPersona(String identificacion) {
        personaRepository.deleteByIdentificacion(identificacion);
    }

    @Transactional
    public void eliminarPersonaConFacturas(String identificacion) {
        Persona persona = personaRepository.findByIdentificacion(identificacion);
        if (persona != null) {
            personaRepository.delete(persona);
        }
    }
}
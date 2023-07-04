package com.YaelCRUDFacturass.app.rest.Service;

import com.YaelCRUDFacturass.app.rest.Model.Factura;
import com.YaelCRUDFacturass.app.rest.Model.Persona;
import com.YaelCRUDFacturass.app.rest.Repository.FacturaRepository;
import com.YaelCRUDFacturass.app.rest.Repository.PersonaRepository;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class FacturaService {
    private final FacturaRepository facturaRepository;
    PersonaRepository personaRepository;
    public List<Factura> obtenerFacturasPorPersona(Persona persona) {
        return facturaRepository.findByPersona(persona);
    }

    public FacturaService(FacturaRepository facturaRepository) {
        this.facturaRepository = facturaRepository;
    }

    public Factura guardarFactura(Factura factura) {
        return facturaRepository.save(factura);
    }

    public List<Factura> obtenerTodasLasFacturas() {
        return facturaRepository.findAll();
    }

    public Factura obtenerFacturaPorId(Long id) {
        return facturaRepository.findById(id).orElse(null);
    }
    public List<Factura> obtenerFacturasPorPersona(Long personaId) {
        return facturaRepository.findByPersonaId(personaId);
    }
    public Factura actualizarFactura(Long id, Factura factura) {
        Factura facturaExistente = facturaRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Factura no encontrada"));

        // Actualizar los datos de la factura existente
        facturaExistente.setFecha(factura.getFecha());
        facturaExistente.setMonto(factura.getMonto());

        // Actualizar la relación con la entidad "Persona"

        Persona persona = personaRepository.findById(factura.getPersona().getId()).orElseThrow(() -> new EntityNotFoundException("Persona no encontrada"));
        facturaExistente.setPersona(persona);

        return facturaRepository.save(facturaExistente);
    }

    public void eliminarFactura(Long id) {
        facturaRepository.deleteById(id);
    }
}
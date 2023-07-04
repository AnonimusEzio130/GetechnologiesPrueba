package com.YaelCRUDFacturass.app.rest.Repository;

import com.YaelCRUDFacturass.app.rest.Model.Factura;
import com.YaelCRUDFacturass.app.rest.Model.Persona;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FacturaRepository extends JpaRepository<Factura, Long> {
    // Aquí puedes agregar consultas personalizadas si es necesario
    List<Factura> findByPersona(Persona persona);
    List<Factura> findByPersonaId(Long personaId);

}
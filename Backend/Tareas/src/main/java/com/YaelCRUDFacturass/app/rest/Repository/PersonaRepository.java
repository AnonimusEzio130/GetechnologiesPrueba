package com.YaelCRUDFacturass.app.rest.Repository;

import com.YaelCRUDFacturass.app.rest.Model.Persona;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonaRepository extends JpaRepository<Persona, Long> {
    Persona findByIdentificacion(String identificacion);
    void deleteByIdentificacion(String identificacion);

}
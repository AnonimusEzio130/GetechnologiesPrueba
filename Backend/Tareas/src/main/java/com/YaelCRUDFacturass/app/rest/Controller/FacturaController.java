package com.YaelCRUDFacturass.app.rest.Controller;

import com.YaelCRUDFacturass.app.rest.Model.Factura;
import com.YaelCRUDFacturass.app.rest.Model.Persona;
import com.YaelCRUDFacturass.app.rest.Service.FacturaService;
import com.YaelCRUDFacturass.app.rest.Service.PersonaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("app/facturas")
public class FacturaController {
    private final FacturaService facturaService;
    @Autowired

    PersonaService personaService;
    public FacturaController(FacturaService facturaService) {
        this.facturaService = facturaService;
    }

    @GetMapping("/todas")
    public List<Factura> obtenerTodasLasFacturas() {
        return facturaService.obtenerTodasLasFacturas();
    }

    @GetMapping("factura/{id}")
    public ResponseEntity<Factura> obtenerFacturaPorId(@PathVariable Long id) {
        Factura factura = facturaService.obtenerFacturaPorId(id);
        if (factura != null) {
            return ResponseEntity.ok(factura);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @PostMapping("/nueva")
    public ResponseEntity<Factura> crearFactura(@RequestBody Factura factura) {
        Factura facturaCreada = facturaService.guardarFactura(factura);
        return ResponseEntity.ok(facturaCreada);
    }
    @GetMapping("/factura/persona/{identificacion}")
    public ResponseEntity<List<Factura>> obtenerFacturasPorPersona(@PathVariable String identificacion) {
        Persona persona = personaService.obtenerPersonaPorIdentificacion(identificacion);
        if (persona != null) {
            Long personaId = persona.getId(); // Obtener el ID de la persona
            List<Factura> facturas = facturaService.obtenerFacturasPorPersona(personaId);
            return ResponseEntity.ok(facturas);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @PutMapping("actualizar/factura/{id}")
    public ResponseEntity<Factura> actualizarFactura(@PathVariable Long id, @RequestBody Factura factura) {
        Factura facturaActualizada = facturaService.actualizarFactura(id, factura);
        return ResponseEntity.ok(facturaActualizada);
    }
    @DeleteMapping("/eliminar/factura/{id}")
    public ResponseEntity<Void> eliminarFactura(@PathVariable Long id) {
        facturaService.eliminarFactura(id);
        return ResponseEntity.noContent().build();
    }
}
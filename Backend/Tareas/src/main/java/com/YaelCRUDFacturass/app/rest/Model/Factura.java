package com.YaelCRUDFacturass.app.rest.Model;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;
import com.fasterxml.jackson.annotation.JsonInclude;

// ...

@JsonInclude(JsonInclude.Include.NON_NULL)

@Entity
@Getter
@Setter
public class Factura {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Date fecha;
    @PrePersist
    protected void onCreate() {
        fecha = new Date();
    }
    private BigDecimal monto;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "persona_id")
    private Persona persona;

    // Constructor, getters y setters
}
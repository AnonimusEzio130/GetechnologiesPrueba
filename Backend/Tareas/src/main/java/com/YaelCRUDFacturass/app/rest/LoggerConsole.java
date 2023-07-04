package com.YaelCRUDFacturass.app.rest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class LoggerConsole {
    private static final Logger logger = LoggerFactory.getLogger(LoggerConsole.class);

    // Resto de tu código

    public void Log() {
        logger.info("Mensaje de información");
        logger.error("Mensaje de error");
        // ...
    }
}
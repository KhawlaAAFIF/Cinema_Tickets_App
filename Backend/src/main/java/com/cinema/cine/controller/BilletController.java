package com.cinema.cine.controller;

import com.cinema.cine.entity.Billet;
import com.cinema.cine.entity.Projection;
import com.cinema.cine.service.BilletService;
import com.cinema.cine.service.ProjectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/billet")
@CrossOrigin
public class BilletController {

    @Autowired
    private BilletService billetService;

    @Autowired
    private ProjectionService projectionService;

    @PostMapping("/add")
    public ResponseEntity<Billet> addBillet(@RequestBody Billet billet) {
        Projection projection = projectionService.getProjectionById(billet.getIdProjection().getId());
        if (projection == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        billet.setIdProjection(projection);

        Billet addedBillet = billetService.addBillet(billet);
        return new ResponseEntity<>(addedBillet, HttpStatus.CREATED);
    }

    @GetMapping("/getAll")
    public ResponseEntity<List<Billet>> getAllBillets() {
        List<Billet> billets = billetService.getAllBillets();
        return new ResponseEntity<>(billets, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Billet> getBilletById(@PathVariable Integer id) {
        Billet billet = billetService.getBilletById(id);
        if (billet == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(billet, HttpStatus.OK);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Billet> updateBillet(@PathVariable Integer id, @RequestBody Billet updatedBillet) {
        Billet billet = billetService.updateBillet(id, updatedBillet);
        if (billet == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(billet, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteBillet(@PathVariable Integer id) {
        billetService.deleteBillet(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}

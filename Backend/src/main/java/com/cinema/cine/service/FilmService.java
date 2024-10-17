package com.cinema.cine.service;

import com.cinema.cine.entity.Film;
import com.cinema.cine.repository.FilmRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@Service
public class FilmService {

    @Autowired
    private FilmRepository filmRepository;

    public Film addFilm(Film film) {
        return filmRepository.save(film);
    }

    public List<Film> getAllFilms() {
        return filmRepository.findAll();
    }

    public Film getFilmById(Integer id) {
        return filmRepository.findById(id).orElse(null);
    }

    public Film updateFilm(Integer id, Film updatedFilm) {
        Film existingFilm = filmRepository.findById(id).orElse(null);
        if (existingFilm != null) {
            updatedFilm.setId(id);
            return filmRepository.save(updatedFilm);
        }
        return null; // or throw an exception
    }

    public Film uploadImage(Integer id, MultipartFile file) throws IOException {
        String baseUrl = "..\\Assets\\";
        String filename = StringUtils.cleanPath(file.getOriginalFilename());

        Path storageDirectory = Paths.get("C:\\Users\\Khawl\\Desktop\\cinem\\Cinema_Tickets_App\\Frontend\\web\\cinema_front\\src\\Assets");
        if (!Files.exists(storageDirectory)) {
            Files.createDirectories(storageDirectory);
        }

        Path destinationPath = storageDirectory.resolve(Path.of(filename));
        file.transferTo(destinationPath);

        Film film =filmRepository.findById(id).orElse(null);
        if (film != null) {
            film.setPoster(baseUrl + filename);  // Save the URL instead of the path
            filmRepository.save(film);
        }
        return film;
    }
    public void deleteFilm(Integer id) {
        filmRepository.deleteById(id);
    }
    public long getFilmCount() {
        return filmRepository.count();
    }
}

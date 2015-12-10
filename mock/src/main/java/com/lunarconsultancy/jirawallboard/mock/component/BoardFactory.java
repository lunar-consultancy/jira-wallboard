package com.lunarconsultancy.jirawallboard.mock.component;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.lunarconsultancy.jirawallboard.mock.model.BoardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.io.File;
import java.io.IOException;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.toSet;

@Component
public class BoardFactory {

    @Autowired
    private ResourceLoader resourceLoader;
    @Autowired
    private ObjectMapper objectMapper;

    private BoardResponse allBoards;

    @PostConstruct
    public void init() throws IOException {
        Resource resource = resourceLoader.getResource("classpath:json/all_boards.json");
        allBoards = objectMapper.readValue(resource.getURL(), BoardResponse.class);
    }

    public BoardResponse getAllBoards() {
        return allBoards;
    }

    public BoardResponse getBoard(final String name) {
        BoardResponse response = new BoardResponse();
        response.setMaxResults(allBoards.getMaxResults());
        response.setStartAt(allBoards.getStartAt());
        response.setIsLast(allBoards.getIsLast());
        response.setValues(allBoards.getValues().stream()
                .filter(b -> b.getName().equals(name))
                .collect(toSet()));
        return response;
    }
}

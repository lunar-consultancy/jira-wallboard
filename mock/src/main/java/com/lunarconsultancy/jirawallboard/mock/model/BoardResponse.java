package com.lunarconsultancy.jirawallboard.mock.model;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.util.Collection;

@JsonInclude(JsonInclude.Include.NON_NULL)
public final class BoardResponse extends Response {

    private Collection<Board> values;

    public Collection<Board> getValues() {
        return values;
    }

    public void setValues(Collection<Board> values) {
        this.values = values;
    }
}

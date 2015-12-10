package com.lunarconsultancy.jirawallboard.mock.model;

import com.fasterxml.jackson.annotation.JsonInclude;

import java.util.Collection;

@JsonInclude(JsonInclude.Include.NON_NULL)
public final class IssueResponse extends Response {

    private String expand;
    private Collection<Issue> issues;
    private Integer total;

    public String getExpand() {
        return expand;
    }

    public void setExpand(String expand) {
        this.expand = expand;
    }

    public Collection<Issue> getIssues() {
        return issues;
    }

    public void setIssues(Collection<Issue> issues) {
        this.issues = issues;
    }

    public Integer getTotal() {
        return total;
    }

    public void setTotal(Integer total) {
        this.total = total;
    }

    @Override
    public Boolean getIsLast() {
        if (getStartAt() == null || issues == null || total == null) {
            return Boolean.TRUE;
        }
        return getStartAt() + issues.size() >= total;
    }
}

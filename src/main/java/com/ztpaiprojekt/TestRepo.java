package com.ztpaiprojekt;

import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class TestRepo {
    private static final List<TestObject> LOCAL_REPO = new ArrayList<>();

    static {
        LOCAL_REPO.add(new TestObject("Oliver",1,"Sparsky"));
        LOCAL_REPO.add(new TestObject("Max",2,"Kolanko"));
    }

    public List<TestObject> getLocalRepo() {
        return LOCAL_REPO;
    }
}

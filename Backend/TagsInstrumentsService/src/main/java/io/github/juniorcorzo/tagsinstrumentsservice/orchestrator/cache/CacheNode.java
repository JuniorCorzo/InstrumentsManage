package io.github.juniorcorzo.tagsinstrumentsservice.orchestrator.cache;

import lombok.Data;

import java.sql.Timestamp;
import java.time.Instant;


@Data
class CacheNode<T> {
    private T item;
    private Timestamp timestamp;

    public CacheNode (T item){
        this.item = item;
        this.timestamp = Timestamp.from(Instant.now());
    }

    public T getItem () {
        this.timestamp = Timestamp.from(Instant.now());
        return item;
    }


    public CacheNode<T> setItem(T item) {
        this.item = item;
        return this;
    }
}

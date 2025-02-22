package io.github.juniorcorzo.tagsinstrumentsservice.orchestrator.cache;

import lombok.Data;

import java.time.Instant;

@Data
public class CacheNode<T> {
    private T item;
    private Long timestamp;

    public CacheNode(T item) {
        this.item = item;
        this.timestamp = Instant.now().getEpochSecond();
    }

    public T getItem() {
        this.timestamp = Instant.now().getEpochSecond();
        return item;
    }

    public CacheNode<T> setItem(T item) {
        this.item = item;
        return this;
    }
}

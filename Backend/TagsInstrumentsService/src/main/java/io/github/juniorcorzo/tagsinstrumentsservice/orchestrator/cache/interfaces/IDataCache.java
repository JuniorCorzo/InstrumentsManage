package io.github.juniorcorzo.tagsinstrumentsservice.orchestrator.cache.interfaces;

import io.github.juniorcorzo.tagsinstrumentsservice.orchestrator.cache.CacheNode;

import java.util.Map;

public interface IDataCache<T> {

    T get(String key);

    void refreshContext();

    void refreshValue(String key);

    Map<String, CacheNode<T>> getCache();
}

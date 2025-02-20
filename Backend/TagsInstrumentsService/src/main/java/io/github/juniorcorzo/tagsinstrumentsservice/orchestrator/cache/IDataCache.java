package io.github.juniorcorzo.tagsinstrumentsservice.orchestrator.cache;

public interface IDataCache<T> {

    T get(String key);

    void refreshContext();

    void refreshValue(String key);

}

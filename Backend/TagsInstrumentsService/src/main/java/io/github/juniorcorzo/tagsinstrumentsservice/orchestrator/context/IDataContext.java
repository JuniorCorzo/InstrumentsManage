package io.github.juniorcorzo.tagsinstrumentsservice.orchestrator.context;

public interface IDataContext<T> {

    T get(String key);

    void refreshContext();

    void refreshValue(String key);

}

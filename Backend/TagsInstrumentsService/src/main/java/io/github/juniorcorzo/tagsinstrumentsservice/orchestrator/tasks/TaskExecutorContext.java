package io.github.juniorcorzo.tagsinstrumentsservice.orchestrator.tasks;

import io.github.juniorcorzo.tagsinstrumentsservice.orchestrator.cache.interfaces.IDataCache;

import java.util.concurrent.Callable;

public class TaskExecutorContext <D, T extends Object & IDataCache<D>> implements Callable<D> {
    private final T dataContext;
    private final String key;

    public TaskExecutorContext(T dataContext, String key) {
        this.dataContext = dataContext;
        this.key = key;
    }

    @Override
    public D call() {
        return dataContext.get(this.key);
    }
}
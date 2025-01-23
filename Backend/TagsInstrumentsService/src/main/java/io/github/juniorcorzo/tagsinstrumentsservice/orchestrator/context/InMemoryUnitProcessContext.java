package io.github.juniorcorzo.tagsinstrumentsservice.orchestrator.context;

import io.github.juniorcorzo.tagsinstrumentsservice.orchestrator.dtos.UnitProcessDTO;
import io.github.juniorcorzo.tagsinstrumentsservice.orchestrator.services.UnitProcessService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.locks.ReentrantReadWriteLock;

public class InMemoryUnitProcessContext implements IDataContext<UnitProcessDTO> {
    private static final Object LOCK = new Object();
    private static final Logger LOGS = LoggerFactory.getLogger(InMemoryUnitProcessContext.class);
    private static volatile InMemoryUnitProcessContext instance;
    private final UnitProcessService unitProcessService;
    private final Map<String, UnitProcessDTO> unitProcessContext;
    private ReentrantReadWriteLock lock;

    private InMemoryUnitProcessContext(UnitProcessService unitProcessService) {
        this.unitProcessService = unitProcessService;
        this.unitProcessContext = new ConcurrentHashMap<>();
    }

    public synchronized static InMemoryUnitProcessContext getInstance(UnitProcessService unitProcessService) {
        InMemoryUnitProcessContext result = null;
        if (instance == null) {
            synchronized (LOCK) {
                result = instance;
                if (result == null) {
                    instance = result = new InMemoryUnitProcessContext(unitProcessService);
                    LOGS.info("InMemoryUnitProcessContext instance initialized");
                }
            }
        }

        return result;
    }

    @Override
    public UnitProcessDTO get(String key) {
        lock.readLock().lock();
        try {
            if (!this.unitProcessContext.containsKey(key)) {
                this.refreshValue(key);
            }

            return this.unitProcessContext.get(key);
        } finally {
            lock.readLock().unlock();
        }
    }

    @Override
    public void refreshContext() {
        lock.writeLock().lock();
        try {
            this.unitProcessContext.clear();
            this.unitProcessService
                    .getAllUnitProcess()
                    .forEach(unitProcess -> this.unitProcessContext.put(unitProcess.id(), unitProcess));
        } finally {
            lock.writeLock().unlock();
        }
    }

    @Override
    public void refreshValue(String key) {
        lock.writeLock().lock();
        try {
            UnitProcessDTO unitProcess = this.unitProcessService.getUnitProcessById(key);
            this.unitProcessContext.put(unitProcess.id(), unitProcess);
        } catch (RuntimeException e) {
            LOGS.error(e.getMessage());
        } finally {
            lock.writeLock().unlock();
        }
    }
}

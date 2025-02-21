package io.github.juniorcorzo.tagsinstrumentsservice.orchestrator.cache;

import io.github.juniorcorzo.tagsinstrumentsservice.orchestrator.cache.interfaces.IDataCache;
import io.github.juniorcorzo.tagsinstrumentsservice.orchestrator.dtos.UnitProcessDTO;
import io.github.juniorcorzo.tagsinstrumentsservice.orchestrator.services.UnitProcessService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.locks.ReentrantReadWriteLock;

public class InMemoryUnitProcessCache implements IDataCache<UnitProcessDTO> {
    private static final Logger LOGS = LoggerFactory.getLogger(InMemoryUnitProcessCache.class);
    private static volatile InMemoryUnitProcessCache instance;
    private final UnitProcessService unitProcessService;
    private final Map<String, CacheNode<UnitProcessDTO>> unitProcessCache;
    private final ReentrantReadWriteLock lock;

    private InMemoryUnitProcessCache(UnitProcessService unitProcessService) {
        this.unitProcessService = unitProcessService;
        this.unitProcessCache = new ConcurrentHashMap<>();
        this.lock = new ReentrantReadWriteLock();
    }

    public synchronized static InMemoryUnitProcessCache getInstance(UnitProcessService unitProcessService) {
        InMemoryUnitProcessCache result = null;
        if (instance == null) {
            synchronized (InMemoryUnitProcessCache.class) {
                result = instance;
                if (result == null) {
                    instance = result = new InMemoryUnitProcessCache(unitProcessService);
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
            if (!this.unitProcessCache.containsKey(key)) {
                UnitProcessDTO unitProcessResponse = this.unitProcessService.getUnitProcessById(key);
                this.unitProcessCache.put(key, new CacheNode<>(unitProcessResponse));
            }
            return this.unitProcessCache.get(key).getItem();
        } finally {
            lock.readLock().unlock();
        }
    }

    @Override
    public void refreshContext() {
        lock.writeLock().lock();
        try {
            this.unitProcessCache.clear();
            for (UnitProcessDTO unitProcess: this.unitProcessService.getAllUnitProcess()){
                if (this.unitProcessCache.containsKey(unitProcess.id())){
                    this.unitProcessCache.replace(
                            unitProcess.id(),
                            this.unitProcessCache.get(unitProcess.id()).setItem(unitProcess)
                    );
                    continue;
                }
                this.unitProcessCache.put(unitProcess.id(), new CacheNode<>(unitProcess));
            }
        } finally {
            lock.writeLock().unlock();
        }
    }

    @Override
    public void refreshValue(String key) {
        lock.writeLock().lock();
        try {
            UnitProcessDTO unitProcess = this.unitProcessService.getUnitProcessById(key);
            this.unitProcessCache.replace(unitProcess.id(), new CacheNode<>(unitProcess));
        } catch (RuntimeException e) {
            LOGS.error(e.getMessage());
        } finally {
            lock.writeLock().unlock();
        }
    }
}

package io.github.juniorcorzo.tagsinstrumentsservice.orchestrator.context;

import io.github.juniorcorzo.tagsinstrumentsservice.orchestrator.dtos.InstrumentsDTO;
import io.github.juniorcorzo.tagsinstrumentsservice.orchestrator.services.InstrumentService;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.locks.ReentrantReadWriteLock;

/**
 * Thread-safe in-memory cache implementation for instruments using the
 * Singleton pattern.
 * This class provides a concurrent cache mechanism for storing and retrieving
 * instrument data.
 * It implements double-checked locking pattern for thread-safe singleton
 * instantiation.
 *
 * @author Junior Corzo
 */
public class InMemoryInstrumentsContext implements IDataContext<InstrumentsDTO> {
    private final static Object LOCK = new Object();
    private static volatile InMemoryInstrumentsContext instance;
    private final Map<String, InstrumentsDTO> instrumentsContext;
    private final InstrumentService instrumentService;
    private final ReentrantReadWriteLock lock;

    private InMemoryInstrumentsContext(InstrumentService instrumentService) {
        this.instrumentService = instrumentService;
        this.instrumentsContext = new ConcurrentHashMap<>();
        this.lock = new ReentrantReadWriteLock();

        refreshContext();
    }

    /**
     * Returns the singleton instance of InMemoryInstrumentsContext.
     * Uses double-checked locking pattern to ensure thread-safe lazy
     * initialization.
     *
     * @param instrumentService The service used to load instrument data
     * @return The singleton instance of InMemoryInstrumentsContext
     */
    public synchronized static InMemoryInstrumentsContext getInstance(InstrumentService instrumentService) {
        InMemoryInstrumentsContext result = instance;
        if (result == null) {
            synchronized (LOCK) {
                result = instance;
                if (result == null) {
                    instance = result = new InMemoryInstrumentsContext(instrumentService);
                }
            }
        }

        return result;
    }

    /**
     * Retrieves an instrument from the cache by its key.
     * This method is thread-safe using a read lock.
     *
     * @param key The unique identifier of the instrument
     * @return The InstrumentsDTO associated with the key, or null if not found
     */
    @Override
    public InstrumentsDTO get(String key) {
        lock.readLock().lock();
        try {
            return this.instrumentsContext.get(key);
        } finally {
            lock.readLock().unlock();
        }
    }

    /**
     * Refreshes the entire cache by clearing existing entries and reloading from
     * the instrument service.
     * This method is thread-safe using a write lock.
     */
    @Override
    public void refreshContext() {
        lock.writeLock().lock();
        try {
            this.instrumentsContext.clear();
            this.instrumentService.getAllInstruments().forEach(instrument -> {
                this.instrumentsContext.put(instrument.id(), instrument);
            });
        } finally {
            lock.writeLock().unlock();
        }
    }

    /**
     * Updates a specific instrument in the cache by fetching the latest data
     * from the instrument service.
     * <p>
     * This method is thread-safe using a write lock to ensure data consistency
     * during the update operation.
     *
     * @param key The unique identifier of the instrument to update
     * @throws IllegalArgumentException if the provided key is null
     * @throws RuntimeException         if an error occurs while fetching data from
     *                                  the service
     */
    @Override
    public void refreshValue(String key) {
        lock.writeLock().lock();
        try {
            this.instrumentsContext.replace(key, this.instrumentService.getInstrumentById(key));
        } finally {
            lock.writeLock().unlock();
        }
    }

}

import { createSignal } from "solid-js";

function getOrCreateStorage(key, defaultValue, storage = localStorage) {
    const initialValue = storage.getItem(key) ? JSON.parse(storage.getItem(key)) : defaultValue;

    const [value, setValue] = createSignal(initialValue);

    const setValueAndStore = ((newValue) => {
        const v = setValue(newValue);
        storage.setItem(key, JSON.stringify(v));
        return v;
    });

    return [value, setValueAndStore];
}

function deleteStorage(key, storage = localStorage) {
    storage.removeItem(key);
}

export { getOrCreateStorage, deleteStorage };
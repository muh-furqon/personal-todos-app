/* eslint-disable no-unused-vars */
export function get(key) {
const value = localStorage.getItem(key);
try {
    return JSON.parse(value)
} catch (e) {
    return value;
}
}

export function set(key, value) {
localStorage.setItem(key, JSON.stringify(value));
}
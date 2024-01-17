// hashset class

class HashSet {
    constructor(initialCapacity = 16, loadFactor = 0.75) {
        this.map = new HashMap(initialCapacity, loadFactor);
    }

    add(key) {
        this.map.set(key, true);
    }

    has(key) {
        return this.map.has(key);
    }

    remove(key) {
        return this.map.remove(key);
    }

    size() {
        return this.map.length();
    }

    clear() {
        this.map.clear();
    }

    keys() {
        return this.map.keys();
    }
}

// examples

const myHashSet = new HashSet();
myHashSet.add("three");
myHashSet.add("four");
console.log(myHashSet.keys());
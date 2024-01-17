class HashMap {
    constructor(initialCapacity = 16, loadFactor = 0.75) {
        this.capacity = initialCapacity;
        this.loadFactor = loadFactor;
        this.size = 0;
        this.buckets = new Array(this.capacity).fill(null).map(()=> []);
    }

    hash(key) {
        if(typeof key !== "string") {
            throw new Error("Keys must be of type string");
        }

        let hash = 0;
        const primeNumber = 31;
        for (let i =0; i < key.length; i++) {
            const char = key.charCodeAt(i);
            hash = primeNumber * hash + char;
        }
        return hash % this.capacity;
    }

    set(key, value) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
               bucket[i][1] = value;
               return;
            }
        }

        bucket.push([key, value]);
        this.size++;

        if(this.size > this.capacity * this.loadFactor) {
            this.resize();
        }

    }  

    get(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        for ( let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                return bucket[i][1];
            }
        }
        return null;
    }

    has(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                return true;
            }
        }
        return false;
    }

    remove(key) {
        const index = this.hash(key);
        const bucket = this.buckets[index];

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket.splice(i, 1);
                this.size--;
                return true;
            }
        }
        return false;
    }

    length() {
        return this.size;
    }

    clear() {
        this.capacity = 16;
        this.size = 0;
        this.buckets = new Array(this.capacity).fill(null).map(()=>[]);
    }

    keys() {
        return this.buckets.reduce((keys, bucket) => {
            return keys.concat(bucket.map(entry => entry[0]));
        }, []);
    }

    values() {
        return this.buckets.reduce((values, bucket) => {
            return values.concat(bucket.map(entry => entry[1]));
        }, []);
    }

    entries() {
        return this.buckets.reduce((entries, bucket) => {
          return entries.concat(bucket.map(entry => [entry[0], entry[1]]));
        }, []);
    }

    resize() {
        this.capacity *= 2;
        const newBuckets = new Array(this.capacity).fill(null).map(() => []);
        
        this.buckets.forEach(bucket => {
            bucket.forEach(([key, value]) => {
                const newIndex = this.hash(key);
                newBuckets[newIndex].push([key, value]);
            });
        });

        this.buckets = newBuckets;
    }
}

// examples
const myHashMap = new HashMap();

myHashMap.set("one", 1);
myHashMap.set("two", 2);
myHashMap.set("three", 3);

console.log(myHashMap.get("two"));
console.log(myHashMap.has("four"));

myHashMap.remove("one");
console.log(myHashMap.length());

console.log(myHashMap.keys());
console.log(myHashMap.values());
console.log(myHashMap.entries());


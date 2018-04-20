class HashList {
    constructor() {
        this.head = null;
    }
}

class HashNode {
    constructor(key, value) {
        this.key = key;
        this.val = value;
        this.next = null;
    }
}

class HashTable{
    constructor(size){
        this.data = new Array(size);
        this.length = 0;
        this.loadFactor = (this.length/this.data.length);
    }
    updateLoadFactor(){
        this.loadFactor = (this.length/this.data.length);
    }

    hash(key) {
        let value = 0;
        for (let i = 0; i < key.length; i++) {
            value += key.charCodeAt(i);
        }
        let hash = value % this.data.length;
        return hash;
    }

    add(key,val){
        if(!this.data[this.hash(key)]){
            let list = new HashList();
            let node = new HashNode(key, val)
            list.head = node;
            this.data[this.hash(key)] = list
            this.length++;
        }
        else{
            let node = new HashNode(key, val)
            let runner = this.data[this.hash(key)].head;
            while (runner.next) {
                runner = runner.next;
            }
            runner.next = node;
            this.length++;
        }
        this.updateLoadFactor();
        if(this.loadFactor > 3){
            this.resize();
        }
    }

    remove(key) {
        if (!this.data[this.hash(key)]) {
            return false;
        }
        else {
            let runner = this.data[this.hash(key)].head;
            if (runner.key == key) {
                this.data[this.hash(key)].head = this.data[this.hash(key)].head.next;
                this.length--;
                return true;
            }
            while (runner.next) {
                if(runner.next.key != key){
                    runner = runner.next;
                }else{
                    runner.next = runner.next.next;
                    return true;
                }
            }
        return false;
        }
    }

    contains(key) {
        if (!this.data[this.hash(key)]) {
            return false;
        }
        else {
            let runner = this.data[this.hash(key)].head;
            while (runner) {
                if (runner.key == key) {
                    return true;
                }
                else{
                    runner = runner.next
                }
            }
            return false;
        }
    }

    isEmpty() {
        if (this.length == 0) {
            return true;
        }
        return false;
    }
    
    resize(){
        let data = this.data;
        this.data = new Array(data.length*2);
        this.length = 0;
        for(let i in data){
            if(data[i]){
                let r = data[i].head;
                while(r){
                    this.add(r.key, r.val);
                    r = r.next;
                }
            }
        }
        this.updateLoadFactor()
    }
}

let newHash = new HashTable(10);

let key = "key";
let val = 1;

while(newHash.loadFactor < 3){
    newHash.add(key, val);
    key += Math.random().toString(36);
    val++;
    console.log(newHash.loadFactor)
}
console.log("hash table size: " + newHash.data.length)
console.log("items contained: " + newHash.length)
console.log("loadfactor: " + newHash.loadFactor)
newHash.add("test", "reset");
console.log("hash table size: " + newHash.data.length)
console.log("items contained: " + newHash.length)
console.log("loadfactor: " + newHash.loadFactor)

// newHash.add('name', 'devon');
// newHash.add('age', 29);
// newHash.add('food', 'tacos');
// console.log(newHash.contains('name'));
// console.log(newHash.contains('age'));
// console.log("size: " + newHash.data.length);
// console.log("length: " + newHash.length);
// newHash.resize();
// console.log("resized length: " + newHash.data.length);
// console.log("length: " + newHash.length);
// console.log(newHash.contains('name'));
// newHash.remove('name');
// console.log(newHash.contains('name'));
// console.log(newHash.isEmpty());
// console.log(newHash.loadFactor);
const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(index, timestamp, data, previousHash = '') {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        return new Block(0, "21/10/2024", "Genesis Block", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }
    isthatValid(){
        for(let i = 1;i<this.chain.length;i++){
            if (this.chain[i].hash != this.chain[i].calculateHash()){
                return false;
            }
            if (this.chain[i].previousHash != this.chain[i-1].hash){
                return false ;
            }

        }
        return true;
    }
}

let Rimcoin = new Blockchain();
Rimcoin.addBlock(new Block(1, "21/10/2024", { amount: 4 }));
Rimcoin.addBlock(new Block(2, "21/10/2024", { amount: 5 }));
console.log(JSON.stringify(Rimcoin, null, 4));
console.log(Rimcoin.isthatValid());
Rimcoin.chain[1].data= "amount : 6";
console.log(Rimcoin.isthatValid());


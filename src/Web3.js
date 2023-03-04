import abi from "./abi/abi.json" assert {type:"json"};

const polygon = new Promise((res,rej)=>{
    async function meta(){
        if(typeof window.ethereum=="undefined"){
            rej("You should install Metamask")
        }

        let web3 = new Web3(window.ethereum);
        let contract = new web3.eth.Contract(abi,"0x68df7dcd694bef21e63448c3659a5e2ba337e90b");

        let accounts = await web3.eth.requestAccounts();
        console.log("Connected account:",accounts[0]);

        let totalSupply = await contract.methods.totalSupply().call({from:accounts[0]});
        console.log("Total supply",totalSupply);
        let maxSupply = await contract.methods.maxSupply().call({from:accounts[0]});
        console.log("Max Supply",maxSupply)

        let objects = await contract.methods.getOwnerObjects().call({from:accounts[0]});
        console.log("Your objects",objects);
    

    web3.eth.requestAccounts().then((accounts)=>{
        contract.methods.totalSupply().call({from:accounts[0]}).then((supply)=>{
            contract.methods.getObjects().call({from:accounts[0]}).then((data)=>{
                res({supply:supply,nft:data})
            })
        })
    });
}

meta();
})

export default polygon;
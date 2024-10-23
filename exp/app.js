import express from "express";
import { readFile } from "node:fs";
import * as fs from "node:fs/promises";


const app = express();

app.listen(3000, () => {
    console.log("Server up and running");
  });



app.use(express.json())

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE');
  next();
});


app.post('/user', async (req,res)=> {
  const body= req.body
  let juicyData= await fs.readFile('./data.json', 'utf-8')
  juicyData=JSON.parse(juicyData)
  const index= juicyData.findIndex(obj=>body.email===obj.email)
  if (index!==-1){
    juicyData[index]=body
  }
  else {
    juicyData.push(body)
  }
  await fs.writeFile('./data.json', JSON.stringify(juicyData))
  res.json({'success':'true'})

  }) 
 


app.get('/', async (req,res)=> {
  let juicyData= await fs.readFile('./data.json', 'utf-8')
  juicyData= JSON.parse(juicyData)
  res.json(juicyData)

})



app.delete('/', async (req,res)=> {
  const body= req.body;
  let juicyData= await fs.readFile('./data.json', 'utf-8');
  juicyData=JSON.parse(juicyData);
  const index= juicyData.findIndex(obj=>body.email===obj.email)
  if (index!==-1){
    juicyData.splice(index, 1)
    res.send({update: "account marker deleted"})
    
  }
  else {
    res.send({update: 'User has no marker to delete'})
  }
  await fs.writeFile('./data.json', JSON.stringify(juicyData))
  
})
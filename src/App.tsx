import { Button} from "@mui/material"
import List from "./List"
import {useState } from "react"


  interface ObType{
    name:string,
    id:number,
    holat:boolean,
    vaqt:string
  }

 

  
 






function App() {
const [r, setR]=useState<number>(0);
const [vl, setVl]=useState<string>('');  
const [aad, setAd]=useState<boolean>(false) ;    
const [ob, setOb]=useState<ObType[]>(localStorage.getItem('mass') ? JSON.parse(localStorage.getItem('mass')!):[{name:'Salom', id:(Math.random()*10**100), holat:false, vaqt:'09:21  5/11/2024'}]);



const Qosh=()=>{
  setVl('')
  let v=new Date();
  let vq:string= v.getHours()+':'+v.getMinutes()+' '+v.getDay()+"/"+v.getMonth()+'/'+v.getFullYear()
  setOb([...ob, {name:vl, id:(Math.random()*10**100), holat:false, vaqt:vq}]);
  localStorage.setItem('mass', JSON.stringify([...ob, {name:vl, id:(Math.random()*10**100), holat:false, vaqt:vq}]));
  localStorage.setItem('all', JSON.stringify([...ob, {name:vl, id:(Math.random()*10**100), holat:false, vaqt:vq}]));
  setAd(false)
}

function filter(y:string):void{
      if(y=='all'){
        localStorage.setItem('mass', localStorage.getItem('all')!)
      };
      if (y=='true') {
        let ms=JSON.parse(localStorage.getItem('all')!);
        ms=ms.filter((el:ObType)=>el.holat)
        localStorage.setItem('mass', JSON.stringify(ms));   
      };
      if (y=='false') {
        let ms=JSON.parse(localStorage.getItem('all')!);
        ms=ms.filter((el:ObType)=>!el.holat)
        localStorage.setItem('mass', JSON.stringify(ms));  
      }
      setR(Math.random())

}


  


  return (
        <main className="main">
            <h1>TODO LIST</h1>
            <div className="btns">
              <Button sx={{display:'block'}} variant="contained" onClick={()=>setAd(true)}>Add Task</Button>
              <select name="all" id="all" onChange={e=>filter(e.target.value) } className="select">
                <option value="all">All</option>
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </div>
            <List ob={ob}/>
            <div className="modal" style={{display:`${!aad ? 'none' : 'flex'}`}} onClick={()=>setAd(false)}>
              <div className="md" onClick={e=>e.stopPropagation()}>
                <input value={vl} onChange={e=>setVl(e.target.value)} className="t" type="text" />
                <Button variant="contained" sx={{width:'250px'}} onClick={Qosh}>Add</Button>
              </div>
            </div>
        </main>
  )
}

export default App
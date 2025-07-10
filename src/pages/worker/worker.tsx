
import { useWorker } from '../../hooks'
import { Button } from 'antd'

function Worker() {
    const {runWorker} = useWorker()

    const calculate = ()=>{
        runWorker(100000)
    }
    const test = ()=>{
        console.log("rundasdasdasas");
        
    }
    
  return (
    <div>Worker
    <Button type='primary' onClick={calculate}>Calculate</Button>
    <Button type='primary' onClick={test}>run test</Button>
    </div>
  )
}

export default Worker
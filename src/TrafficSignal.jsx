import React from 'react'
import { useMachine } from '@xstate/react';
// import '@fortawesome/fontawesome-svg-core'
// import 'font-awesome/css/font-awesome.min.css';
import { ReactComponent as StandIcon } from "./resources/person-solid.svg";
import { ReactComponent as WalkIcon } from "./resources/person-walking-solid.svg";


export const TrafficSignal = ({state,send}) => {

  return (<>
  <div style={{display:'flex',flexDirection:'column',gap:'5px',padding:'5px'}}>
    { !state.matches('red') &&<div style={{backgroundColor:'black',width:'50px',height:'50px',borderRadius:'50px'}}></div>}
    { state.matches('red') &&<div style={{backgroundColor:'red',width:'50px',height:'50px',borderRadius:'50px'}}></div>}
    { !['orange','orange_reverse'].some(state.matches) &&<div style={{backgroundColor:'black',width:'50px',height:'50px',borderRadius:'50px'}}></div>}
    { ['orange','orange_reverse'].some(state.matches) &&<div style={{backgroundColor:'orange',width:'50px',height:'50px',borderRadius:'50px'}}></div>}
    { !state.matches('green') && <div style={{backgroundColor:'black',width:'50px',height:'50px',borderRadius:'50px'}}></div> }
    { state.matches('green') && <div style={{backgroundColor:'green',width:'50px',height:'50px',borderRadius:'50px'}}></div> }

  <button onClick={() => send('NEXT')}>Next Signal</button>
  </div>

  
  </>)
}

export const PedestrianTrafficSignal = ({state,send}) => {
 
//  const [crossWalk, sendCrossWalk] = useMachine(crossWalkMachine);
//  const [signal, nextSignal] = useMachine(crossWalk.context.pedLight);
  // const [signal, send] = useMachine(machine);
  // console.log(`ped.signal.value-->${signal.value}`);
//  crossWalk.context.pedLight
//  console.dir(crossWalk.context.pedLight)
 //pedLight


 return (<>

 <div style={{display:'flex',flexDirection:'column',gap:'5px',padding:'5px'}}>
   { !state.matches('red') &&
      <div style={{color:'white',backgroundColor:'black',width:'50px',height:'50px',borderRadius:'50px'}}></div>}
   { state.matches('red') &&
     <div style={{backgroundColor:'black',width:'50px',height:'50px',borderRadius:'50px'}}>
       <StandIcon style={{width:'40px',height:'40px',color:'red',marginLeft:'5px',marginTop:'5px'}} fill="red"/>
     </div>}
   { !state.matches('green') && 
     <div style={{backgroundColor:'black',width:'50px',height:'50px',borderRadius:'50px'}}></div> }
   { state.matches('green') && 
     <div style={{backgroundColor:'black',width:'50px',height:'50px',borderRadius:'50px'}}>
       <WalkIcon style={{width:'40px',height:'40px',color:'green',marginLeft:'5px',marginTop:'5px'}} fill="green"/>
     </div> }
<button onClick={() => send('NEXT')}>Next Signal</button>     
</div>
 </>)
}


export const CrossWalk = ({state,send}) => {

  const [pedState, sendPed] = useMachine(state.context.pedLight.state.machine);
  const [carState, sendCar] = useMachine(state.context.carLight.state.machine);

  console.log(`state.context.pedLight.state.id-->${state.context.pedLight.id}`)
   
  const render = () => { 
    return (<>
        <div style={{display:'flex',flexDirection:'row'}}>
          <PedestrianTrafficSignal state={pedState} send={sendPed}/>
          <TrafficSignal state={carState} send={sendCar}/>
          <PedestrianTrafficSignal state={pedState} send={sendPed}/>
        </div>

      <button onClick={() => send('NEXT')}>Next</button>     
      </>);
   }

  return render()
}

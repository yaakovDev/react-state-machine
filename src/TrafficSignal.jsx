import React from 'react'
import { createMachine } from 'xstate';
import { useMachine } from '@xstate/react';
import '@fortawesome/fontawesome-svg-core'
import 'font-awesome/css/font-awesome.min.css';
import { ReactComponent as StandIcon } from "./resources/person-solid.svg";
import { ReactComponent as WalkIcon } from "./resources/person-walking-solid.svg";


const trafficSignalMachine = createMachine({
  id:'traffic-signal',
  initial:'red',
	states:{ 
		red:{
			on:{NEXT:'orange'},
		},
		orange:{
      on: {NEXT: 'green'}
     },
		green:{
			 on: {NEXT: 'orange_reverse'},
       entry: 'alertGreen'
			},
    orange_reverse:{
        on: {NEXT: 'red'},
      },
	}//states	
},
{
  actions: {
    // action implementation
    alertGreen: (context, event) => {
      // alert('Green!');
    }
  }
}  
);


export const TrafficSignal = () => {

  const [signal, nextSignal] = useMachine(trafficSignalMachine);


  return (<>
  <div style={{display:'flex',flexDirection:'column',gap:'5px',padding:'5px'}}>
    { !signal.matches('red') &&<div style={{backgroundColor:'black',width:'50px',height:'50px',borderRadius:'50px'}}></div>}
    { signal.matches('red') &&<div style={{backgroundColor:'red',width:'50px',height:'50px',borderRadius:'50px'}}></div>}
    { !['orange','orange_reverse'].some(signal.matches) &&<div style={{backgroundColor:'black',width:'50px',height:'50px',borderRadius:'50px'}}></div>}
    { ['orange','orange_reverse'].some(signal.matches) &&<div style={{backgroundColor:'orange',width:'50px',height:'50px',borderRadius:'50px'}}></div>}
    { !signal.matches('green') && <div style={{backgroundColor:'black',width:'50px',height:'50px',borderRadius:'50px'}}></div> }
    { signal.matches('green') && <div style={{backgroundColor:'green',width:'50px',height:'50px',borderRadius:'50px'}}></div> }

  </div>

  <button onClick={() => nextSignal('NEXT')}>Next Signal</button>
  </>)
}

const pedestrianSignal = createMachine({
  id:'pedestrian-traffic-signal',
  initial:'red',
 states:{ 
   red:{
     on:{NEXT:'green'}
   },
   green:{
      on: {NEXT: 'red'}
     },
 }//states	
});


const crossWalkMachine = createMachine({
 id:'cross-walk-machine',
 initial:'stop',
 states:{ 
   stop:{
     on:{NEXT:'pedestrian_walk'}
   },
   pedestrian_walk:{
      //pedestrianSignal.send('NEXT')
      on: {NEXT: 'pedestrian_stop'}
     },
  pedestrian_stop:{
      //pedestrianSignal.send('NEXT')
      on: {NEXT: 'car_standby'}
     },
  car_standby:{
    //trafficSignalMachine.send('NEXT')
    on: {NEXT: 'car_go'}
    },
  car_go:{
      //trafficSignalMachine.send('NEXT')
      on: {NEXT: 'car_stop'}
    },
  car_stop:{
      //trafficSignalMachine.send('NEXT')
      on:{NEXT:'pedestrian_walk'}
    },

 }//states	
});


export const PedestrianTrafficSignal = () => {

 const [signal, nextSignal] = useMachine(pedestrianSignal);


 return (<>

 <div style={{display:'flex',flexDirection:'column',gap:'5px',padding:'5px'}}>
   { !signal.matches('red') &&
      <div style={{color:'white',backgroundColor:'black',width:'50px',height:'50px',borderRadius:'50px'}}></div>}
   { signal.matches('red') &&
     <div style={{backgroundColor:'black',width:'50px',height:'50px',borderRadius:'50px'}}>
       <StandIcon style={{width:'40px',height:'40px',color:'red',marginLeft:'5px',marginTop:'5px'}} fill="red"/>
     </div>}
   { !signal.matches('green') && 
     <div style={{backgroundColor:'black',width:'50px',height:'50px',borderRadius:'50px'}}></div> }
   { signal.matches('green') && 
     <div style={{backgroundColor:'black',width:'50px',height:'50px',borderRadius:'50px'}}>
       <WalkIcon style={{width:'40px',height:'40px',color:'green',marginLeft:'5px',marginTop:'5px'}} fill="green"/>
     </div> }
</div>

 <button onClick={() => nextSignal('NEXT')}>Next Signal</button>
 </>)
}
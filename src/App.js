import {createContext , useState,useEffect} from "react";
import './App.css';
import { TrafficSignal,PedestrianTrafficSignal,CrossWalk} from './TrafficSignal'
import { createMachine,send,assign,spawn } from 'xstate';
import { useMachine } from '@xstate/react';

const trafficSignalMachine = createMachine({
  id:'traffic-signal',
  initial:'red',
	states:{ 
		red:{
      after:{5000:'orange'},
			on:{NEXT:'orange'}
		},
		orange:{
      after:{1000:'green'},
      on: {NEXT: 'green'}
     },
		green:{
      after:{10000:'orange_reverse'},
			on: {NEXT: 'orange_reverse'}
 			 },
    orange_reverse:{
      after:{1000:'red'},
        on: {NEXT: 'red'}
      },
	}//states	
});


const pedestrianSignal = createMachine({
  id:'pedestrian-traffic-signal',
  initial:'red',
 states:{ 
   red:{
    on:{NEXT:'green'},
    //  entry: () => console.log(id), 
     exit: () => console.log(`red out`),
   },
   green:{
      on: {NEXT: 'red',
      actions: () => console.log(`green out`),
    },
      
     },
 }//states	
});

const crossWalkMachine = createMachine({
  id:'cross-walk-machine',
  initial:'IDLE',
context:{
    carLight:null,
    pedLight:null//spawn(pedestrianSignal)
  },
states:{
    IDLE:{
      entry: assign({
        pedLight: () => spawn(pedestrianSignal),
        carLight: () => spawn(trafficSignalMachine)
      }),
      on:{
         NEXT:{
          // actions: 'pedLightNEXT',
          // entry: 'pedLightNEXT',
          // entry: send({ type: 'NEXT' }, {to:(ctx) => ctx.pedLight}),
          actions: send({ type: 'NEXT' },{to:(ctx) => ctx.pedLight}),
          // entry: send({ type: 'NEXT' }, {to:'ped'}),
          // actions: send({ type: 'NEXT' },{to:(ctx) => ctx.pedLight}),
          target:'pedestrian_walk'
         },
       },
    },
    pedestrian_walk:{
   //     //pedestrianSignal.send('NEXT')
   //     on: {NEXT: 'pedestrian_stop'}
      },
   // pedestrian_stop:{
   //     //pedestrianSignal.send('NEXT')
   //     on: {NEXT: 'car_standby'}
   //    },
   // car_standby:{
   //   //trafficSignalMachine.send('NEXT')
   //   on: {NEXT: 'car_go'}
   //   },
   // car_go:{
   //     //trafficSignalMachine.send('NEXT')
   //     on: {NEXT: 'car_stop'}
   //   },
   // car_stop:{
   //     //trafficSignalMachine.send('NEXT')
   //     on:{NEXT:'pedestrian_walk'}
   //   },
}},
{
  actions:{
  pedLightNEXT: (ctx,e) => {
    send({ type: 'NEXT' },{to:(ctx) => ctx.pedLight})
    },
  }
}
);

let appData = createContext() // you can optionally pass it a default value // it returns a "provider" object 

function App() {

  const [crossState,sendCrossState] = useMachine(crossWalkMachine);
  // const [signal, send] = useMachine(pedestrianSignal);
  // console.dir(pedestrianSignal)
  // console.dir(twoLights?.context?.pedLight?.machine)
  // console.dir(signal)
  // const [signal, send] = useMachine(twoLights.context.pedLight.machine);
  // const state = crossWalkMachine.transition(crossWalkMachine.initialState, { type: 'IDLE' });
  // console.log(`state.value-->${state.value}`)
  // console.dir(crossState)
  return <CrossWalk state={crossState} send={sendCrossState}/>
}

export default App;

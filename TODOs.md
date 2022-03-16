
## Handle Parent-Child Bodies

Basically our physics system sees all objects in world space (it needs to!), but then when we use the physics system's locations to move objects in the real world, we have to place the objects relative to the parent. That gets pretty absurd once you start moving the parent and then needing to re-move the child to fix this. Basically, we should make all objects top-level or at least require that all top-level objects have only one body attached (to the top-level element) and any deeper objects must be relative? This gets even more interesting when you start to think about the real use-case here, such as a rag-doll with limbs. Hence why we're deciding to push this conversation until we cover joints.

## Joints

We need to build joints between objects, since it might displace a number of misused features (e.g. "Tracking") that can/should be removed if joints can accomplish the same goal. Preferably joints are used heavily in a variety of use-cases, such as with parent-child bodies above.

## Global Sync

If we ever want to have multiplayer, we need to have a global feed system that feeds commands into a reduction loop that outputs a global state and then that state can be rendered on the client and occausionally updated from the server. This will probably need a vector clock of some variety, but possibly a simple clock would work. The problem here is all of the times that we just take things at their word and change state based on that. _Everything_ needs to be run through the global decider. Luckily, Rapier has determinisitic mode and snapshots, which should make that part fairly easy to sync.

Example:

0 Event { user: tom, action: move, velocity: { ... }, id: 1, vector: [1, john: 0] } - 1 tick delay to server, 1 tick delay to clients
1 TICK
2 TICK
3 Event { user: john, action: move, velocity: { ... }, id: 1, full_id: [1, tom: 1] } - 1 tick delay to server, 1 tick delay to clients
4 Event { user: tom, action: move, velocity: { ... }, id: 2, vector: [1, tom: 0] } - 1 tick delay to server, 1 tick delay to clients
5 TICK
6 TICK

Time: 0
Server State: {phy:[],health:{}}
Tom    State: {phy:[tom+],health:{}}
John   State: {phy:[],health:{}}

Time: 1
Server State: {phy:[tom+],health:{}}
Tom    State: {phy:[tom+],health:{}}
John   State: {phy:[],health:{}}

Time: 2
Server State: {phy:[tom+],health:{}}
Tom    State: {phy:[tom+],health:{}}
John   State: {phy:[tom+],health:{}}

Time: 3
Server State: {phy:[tom+],health:{}}
Tom    State: {phy:[tom+],health:{}}
John   State: {phy:[tom+, john+],health:{}}

Time: 4
Server State: {phy:[tom+, john+],health:{}}
Tom    State: {phy:[tom+, tom+],health:{}}
John   State: {phy:[tom+, john+],health:{}}

Time: 4
Server State: {phy:[tom+, john+],health:{}}
Tom    State: {phy:[tom+, tom+],health:{}}
John   State: {phy:[tom+, john+],health:{}}

Time: 5
Server State: {phy:[tom+, john+, tom+],health:{}}
Tom    State: {phy:[tom+, john+, tom+],health:{}} -- re-order!
John   State: {phy:[tom+, john+],health:{}}

Time: 6
Server State: {phy:[tom+, john+, tom+],health:{}}
Tom    State: {phy:[tom+, john+, tom+],health:{}}
John   State: {phy:[tom+, john+, tom+],health:{}}

This is just a simple example, but if all state is maintained in the server and synced via vector clocks to the client, things can work. The hardest part is making sure _all_ state is derived from this system! Anything that isn't there will naturally desync. The other thing to worry about is whether or not this could induce all kinds of lag and problems if it's not even smarter than this. E.g. is there another system that's basically an "expected state" system that fakes events from other participants until that data can be properly synced?

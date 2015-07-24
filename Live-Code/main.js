/*
To send a creep to harvest energy, you need to use methods Creep.room.find(), Creep.moveTo(), and Creep.harvest(). 
Commands will be passed each game tick. 
The method harvest() requires that the energy is adjacent to the creep.

http://support.screeps.com/hc/en-us/articles/203013212-Creep

You give orders to a creep by its name this way: Game.creeps.Worker1.
*/

Creep.prototype.WorkerCreepHarvestCycle = function () 
{
    if(typeof this.memory.mySource === 'undefined') this.memory.mySource=this.pos.findClosestByRange(FIND_SOURCES);
    if(typeof this.memory.mySpawn  === 'undefined') this.memory.mySpawn =this.pos.findClosestByRange(FIND_MY_SPAWNS);
    if(typeof this.memory.myDest   === 'undefined') this.memory.myDest  =this.memory.mySource;
    
    var myDest   = Game.getObjectById(this.memory.myDest.id);
    var mySource = Game.getObjectById(this.memory.mySource.id);
    var mySpawn  = Game.getObjectById(this.memory.mySpawn.id);
    
    if(this.carry.energy == 0 && this.memory.myDest.id != mySource.id)
    {
        console.log(this.name + " is off to harvest from source @" + mySource.pos + " -- ID " + mySource.id);
        this.say("<< " + mySource.pos.x + ":" + mySource.pos.y);
        this.memory.myDest = mySource;
    }
    else if(this.carry.energy == this.carryCapacity && this.memory.myDest.id != mySpawn.id)
    {
        console.log(this.name + " is off to transfer energy to spawn @" + mySpawn.pos + " -- ID " + mySpawn.id);
        this.say("<< " + mySpawn.pos.x + ":" + mySpawn.pos.y);
        this.memory.myDest = mySpawn;
    }
    
    this.moveTo(myDest);
    this.harvest(myDest);
    this.transferEnergy(myDest);
}


if(typeof Game.creeps.Worker1 === 'undefined') Game.spawns.Spawn1.createCreep( [WORK, CARRY, MOVE], 'Worker1' );
else Game.creeps.Worker1.WorkerCreepHarvestCycle();

if(typeof Game.creeps.Worker2 === 'undefined') Game.spawns.Spawn1.createCreep( [WORK, CARRY, MOVE], 'Worker2' );
else Game.creeps.Worker2.WorkerCreepHarvestCycle();

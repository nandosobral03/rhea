<script lang="ts">
	import { onDestroy, onMount } from "svelte";
	import { playing, speed } from "../lib/stores";
	import Controls from "./Controls.svelte";
	import Grid from "./Grid.svelte";
    let sizes = [25, 35, 50];
    let innerWidth: number;
    $: gridWidth= innerWidth > 750 ? sizes[2] : innerWidth > 500 ? sizes[1] : sizes[0];
    $: gridHeight=  innerWidth >  750 ? sizes[2] : innerWidth > 500 ? sizes[1] : sizes[0];  
    $: grid = Array.from({ length: gridHeight }, () => Array.from({ length: gridWidth }, () => false));
    
    let currentInterval: NodeJS.Timer | undefined;
    let intervalNumber: number;
    let playingValue: boolean = false;



    speed.subscribe((value) => {
        intervalNumber = 1000 - (value * 0.95)
        if(playingValue){
            if(currentInterval) clearInterval(currentInterval);
            currentInterval = setInterval(() => {
                nextStep();
            }, value);
        }
    });

    playing.subscribe((value) => {
        playingValue = value;
        if(currentInterval) clearInterval(currentInterval);

        if (value) {
            currentInterval = setInterval(() => {
                nextStep();
            }, intervalNumber);
        } else {
            clearInterval(currentInterval);
        }
    });


    onMount(() => {
        let innerWidth: number = window.innerWidth;

		function onResize() {
			innerWidth = window.innerWidth;
		}
		window.addEventListener('resize', onResize);
        
        document.addEventListener('keydown', (e) => {
            if(e.key === 'Escape') nextStep();
        });

        document.addEventListener('keydown', (e) => {
            if(e.key === ' ') playing.set(!playingValue);
        });

	});

    onDestroy(() => {
        clearInterval(currentInterval);
    });

    const nextStep = () =>{
        let newGrid = Array.from({ length: gridHeight }, () => Array.from({ length: gridWidth }, () => false));
        for(let i = 0; i < gridHeight; i++){
            for(let j = 0; j < gridWidth; j++){
                if(grid[i][j]){
                    let neightbours = countNeighbours(i,j);
                    if(neightbours === 2 || neightbours === 3) newGrid[i][j] = true;
                }
                else{
                    let neightbours = countNeighbours(i,j);
                    if(neightbours === 3) newGrid[i][j] = true;
                }
            }
        }
        grid = newGrid;
    }


    const countNeighbours = (i:number,j:number) => {
        let aliveNeighbours = 0;
        let prevI = i > 0 ? i-1 : gridHeight-1;
        let nextI = i < gridHeight-1 ? i+1 : 0;
        let prevJ = j > 0 ? j-1 : gridWidth-1;
        let nextJ = j < gridWidth-1 ? j+1 : 0;
        let iRange = [prevI, i, nextI];
        let jRange = [prevJ, j, nextJ];

        for(let x of iRange){
            for(let y of jRange){
                if(x === i && y === j) continue;
                if(grid[x][y]) aliveNeighbours++;
            }
        }

        return aliveNeighbours;
    } 

    const generateGrid = () => {
        playing.set(false);
        let newGrid = Array.from({ length: gridHeight }, () => Array.from({ length: gridWidth }, () => false));

        return newGrid;
    }

    const generateRandomGrid = () => {
        let newGrid = Array.from({ length: gridHeight }, () => Array.from({ length: gridWidth }, () => Math.random() > 0.5));
        return newGrid;
    }

</script>

<svelte:window 
    bind:innerWidth
/>


<div class="wrapper">
    <Grid grid={grid} gridWidth={gridWidth} gridHeight={gridHeight}/>
    <Controls on:reset={() => grid = generateGrid()} on:random = {() => grid = generateRandomGrid()} on:nextStep={nextStep}/>
  
  
</div>

<style>
.wrapper {
    width: calc(100% - 20px);
    height: calc(100% - 20px);
    box-sizing: content-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    background-color: #202020;
    padding: 10px;
}
</style>
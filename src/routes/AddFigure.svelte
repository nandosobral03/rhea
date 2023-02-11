<script lang="ts">
	import { activeFigure } from "$lib/stores";
	import { createEventDispatcher, onMount } from "svelte";
    
    const dispatch = createEventDispatcher();


    let grid = Array.from({ length: 15 }, () => Array.from({ length: 15 }, () => false));
    let gridWidth = Array.from({ length: 15 }, (_, i) => i);
    let gridHeight = Array.from({ length: 15 }, (_, i) => i);
    


    const save = () => {
        reduceGrid();
        dispatch("save", JSON.parse(JSON.stringify(grid)));
        grid = Array.from({ length: 15 }, () => Array.from({ length: 15 }, () => false));
    }

    const reduceGrid = () => {
        let minCol = 15;
        let maxCol = 0;
        let minRow = 15;
        let maxRow = 0;

        for(let i = 0; i < grid.length; i++){
            for(let j = 0; j < grid[0].length; j++){
                if(grid[i][j]){
                    if(i < minRow){
                        minRow = i;
                    }
                    if(i > maxRow){
                        maxRow = i;
                    }
                    if(j < minCol){
                        minCol = j;
                    }
                    if(j > maxCol){
                        maxCol = j;
                    }
                }
            }
        }

        grid = grid.slice(minRow, maxRow + 1).map(row => row.slice(minCol, maxCol + 1));
    }

</script>

<div class="figure" 
    style="grid-template-columns: repeat({gridWidth.length}, 1fr); grid-template-rows: repeat({gridHeight.length}, 1fr);"
    >
    {#each gridWidth as i}
        {#each gridHeight as j}
            <button class="cell"
                class:alive={grid[i][j]} 
                on:click={()=>grid[i][j] = !grid[i][j]}
                
                />
            {/each}
        {/each}
</div>
<button class="save" on:click={()=> save()} > Save</button>

<style lang="scss">

    .save{
        width: fit-content;
        height: fit-content;
        padding: 10px;
        background-color: #505050;
        color: #fff;
        border: 5px solid   #303030;
        border-radius: 5px;
    }


     .figure {
        background-color: #505050;
        height: fit-content;
        color: #fff;
        padding: 1px;
        align-items: center;
        justify-content: center;
        border: 5px solid   #303030;
        border-radius: 5px;
        aspect-ratio: 1/1;
        display: grid;
        margin:10px;
    }

    .figure.active{
        border: 5px solid   #fff;
    }


    .cell{
        background-color: #505050;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid   #303030;
        border-radius: 2px;
        height: 100%;
        width: 100%;
        outline: none;
        cursor: pointer;
        transition: background-color 0.2s ease-in-out;
        padding: 1px 6px;

        &:hover{
            background-color: #fff;
            color: #505050;
        }
    }

    .alive{
        background-color: #fff;
        color: #505050;
    }
</style>

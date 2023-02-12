<script lang="ts">
	import { activeFigure } from "$lib/stores";
	import { createEventDispatcher, onMount } from "svelte";
    
    const dispatch = createEventDispatcher();


    let grid = Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => false));
    let gridWidth = Array.from({ length: 10 }, (_, i) => i);
    let gridHeight = Array.from({ length: 10 }, (_, i) => i);
    


    const save = () => {
        let isReduced = reduceGrid();
        if(isReduced){
            dispatch("save", JSON.parse(JSON.stringify(grid)));
            grid = Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => false));
        }else{
            dispatch("close");
        }
    }

    const reduceGrid = () => {
        let selected = false;
        let minCol = 10;
        let maxCol = 0;
        let minRow = 10;
        let maxRow = 0;

        for(let i = 0; i < grid.length; i++){
            for(let j = 0; j < grid[0].length; j++){
                if(grid[i][j]){
                    if(i < minRow){
                        minRow = i;
                        selected = true;
                    }
                    if(i > maxRow){
                        maxRow = i;
                        selected = true;
                    }
                    if(j < minCol){
                        minCol = j;
                        selected = true;
                    }
                    if(j > maxCol){
                        maxCol = j;
                        selected = true;
                    }
                }
            }
        }
        if(selected) grid = grid.slice(minRow, maxRow + 1).map(row => row.slice(minCol, maxCol + 1));
        return selected;
    }

</script>

<div class="add-wrapper">

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
    <button class="save" on:click={()=> save()} > 
        <span class="material-symbols-outlined">
            save
        </span>
    
    </button>
</div>

<style lang="scss">
    .add-wrapper{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;
        padding: 10px;
    }



     .figure {
        background-color: var(--background);
        height: fit-content;
        color: #fff;
        padding: 1px;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
        aspect-ratio: 1/1;
        display: grid;
        margin-bottom: 5px;
    }

 

    .cell{
        background-color: #505050;
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid var(--border);
        border-radius: 2px;
        height: 100%;
        width: 100%;
        outline: none;
        cursor: pointer;
        transition: background-color 0.2s ease-in-out;
        padding: 1px 6px;

        &:hover{
            background-color: var(--hover)
        }
    }

    .alive{
        background-color: var(--accent);
    }

    .save{
        width: fit-content;
        height: fit-content;
        background-color: var(--accent);
        color: var(--background);
        border-radius: 5px;
        align-self: flex-end;
        border: none;
        cursor: pointer;
        &:hover{
            background-color: var(--background);
            color: var(--accent);
        }
        display: grid;
        place-items: center;
        padding: 5px;

        .material-symbols-outlined {
            font-variation-settings:
            'FILL' 0,
            'wght' 400,
            'GRAD' 0,
            'opsz' 48;
            color: inherit;
            font-size: 16px;
        }


    }

</style>

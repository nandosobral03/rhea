<script lang="ts">
	import { activeFigure } from "$lib/stores";
	import { createEventDispatcher, onMount } from "svelte";
    export let grid: boolean[][];
    export let id: number;
    let active: boolean;
    activeFigure.subscribe((value) => {
        active = value.id === id;
    });

    let max = grid.length > grid[0].length ? grid.length : grid[0].length;

    let gridWidth = Array.from({ length: max }, (_, i) => i);
    let gridHeight = Array.from({ length: max }, (_, i) => i);
    
    const dispatch = createEventDispatcher();

    let isFilled = (i: number, j: number) => {
        if (grid[i] && grid[i][j]) return true;
        return false;
    }

    let setActive = () => {
        if(active){
            activeFigure.set({
                id: 0,
                grid: [[true]]
            });
            return
        }
        activeFigure.set({
            id: id,
            grid: grid
        });
    }


    const remove = () => {
        activeFigure.set({
            id: 0,
            grid: [[true]]
        });
        dispatch("delete", id);
    }
</script>

<div class ="figure-wrapper"
    class:active={active}
        >
    <div class="figure" 
    on:click={
    () => setActive()
    }
    on:contextmenu={(e) => {
        e.preventDefault();
        remove();
    }}

        on:keydown={(e) => {
            if(e.key === "Enter") active = !active;
        }}
        style="grid-template-columns: repeat({gridWidth.length}, 1fr); grid-template-rows: repeat({gridHeight.length}, 1fr);"
        >
        {#each gridWidth as i}
            {#each gridHeight as j}
                <div class="cell"
                    class:alive={isFilled(i,j)}/>
                {/each}
            {/each}
    </div>
</div>

<style lang="scss">
     .figure {
        height: fit-content;
        padding: 1px;
        align-items: center;
        justify-content: center;
        padding: 5px;
        border-radius: 5px;
        aspect-ratio: 1/1;
        display: grid;
    }

    .active{
        border: 2px solid var(--border-active);
        border-radius: 5px;
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
    }

    .alive{
        background-color: var(--accent);
    }

  
</style>

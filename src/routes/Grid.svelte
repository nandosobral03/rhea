<script lang="ts">
	import { activeFigure, playing } from "$lib/stores";
	import { onMount } from "svelte";
    export let grid: boolean[][];
    export let gridWidth: number;
    export let gridHeight: number;
    let playingValue: boolean;

    let currentFigure: { grid: any; id?: number; };

    activeFigure.subscribe((value) => {
        currentFigure = value;

    });

    playing.subscribe((value) => {
        playingValue = value;
    });

    let currentI = 0;
    let currentJ = 0;
    let hovered: string[] = [];
    onMount(() =>{
            let grid = document.getElementById("grid")!;

            activeFigure.subscribe((value) => {
                currentFigure = value;
                removeHover();
                setHover(0, 0, true);
            });

            grid.addEventListener('mousedown', (e) => {
                if(playingValue){
                    let prev = playingValue;
                    playing.set(false);
                    document.addEventListener('mouseup', (e) => {
                        playing.set(prev);
                    }, {once: true});
                }
            })
        }
    )


    const setActive = (i: number, j: number) => {
       for(let x = 0; x < currentFigure.grid.length; x++){
           for(let y = 0; y < currentFigure.grid[0].length; y++){
                if(currentFigure.grid[x][y]){
                    grid[(i+x) % grid.length][(j+y) % grid[0].length] = true
                }
           }
       }
    };

    const setInactive = (i: number, j: number) => {
        for(let x = 0; x < currentFigure.grid.length; x++){
           for(let y = 0; y < currentFigure.grid[0].length; y++){
                if(currentFigure.grid[x][y]){
                    grid[(i+x) % grid.length][(j+y) % grid[0].length] = false
                }
           }
       }
    };


    const setHover = (i:number, j:number, readParams = false) => {
        if(readParams){
           i = currentI;
           j = currentJ;
        }else{
            currentI = i;
            currentJ = j;
        }
        for(let x = 0; x < currentFigure.grid.length; x++){
           for(let y = 0; y < currentFigure.grid[0].length; y++){
                if(currentFigure.grid[x][y]){
                    hovered.push(((i+x) % grid.length) + "-" + ((j+y) % grid[0].length));
                    document.getElementById(((i+x) % grid.length) + "-" + ((j+y) % grid[0].length))?.classList.add("hover")
                }
           }
       }
    };

    const removeHover = () => {
        for(let cell of hovered){
            document.getElementById(cell)?.classList.remove("hover")
        }
    }; 

</script>



<div style="grid-template-columns: repeat({gridWidth}, 1fr); grid-template-rows: repeat({gridHeight}, 1fr);" id="grid">
    {#each grid as row, i}
        {#each row as _, j}
            <button
                id={i + "-" + j}
                on:click={(e) => {
                    if(e.button === 0){
                        setActive(i, j);
                    }
                }}
                class:alive={grid[i][j]}
                on:keydown={(e) => {
                    if (e.key === " ") {
                        e.preventDefault();
                    }
                    if( e.key === "Enter"){
                        grid[i][j] = !grid[i][j];
                    }
                }}

                on:mouseenter={(e) => {
                    setHover(i, j);
                    if (e.buttons === 1) {
                        setActive(i, j);
                    }
                    if (e.buttons === 2) {
                        setInactive(i, j);
                    }
                }}

                on:mouseleave={(e) => {
                    removeHover();
                }}

                on:contextmenu={(e) => {
                    e.preventDefault();
                    setInactive(i, j);
                }}


            />
        {/each}
    {/each}
</div>

<style lang="scss">
    div {
        background-color: var(--background);
        height: fit-content;
        color: #fff;
        padding: 1px;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
        padding: 10px;
        aspect-ratio: 1/1;
        display: grid;
        margin:10px;
    
    }

    button{
        background-color: var(--primary);
        display: flex;
        align-items: center;
        justify-content: center;
        border: 1px solid   var(--border);
        height: 100%;
        width: 100%;
        outline: none;
        cursor: pointer;
    }


    .alive{
        background-color: var(--accent);
        color: #505050;
    }

    @media (max-width: 751px) {
        div {
            height: unset;
            width: 90svw;
            aspect-ratio: 1/1;
        }
    }
</style>
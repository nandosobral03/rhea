<script lang="ts">
	import { activeFigure } from "$lib/stores";
    export let grid: boolean[][];
    export let gridWidth: number;
    export let gridHeight: number;
    let currentFigure: { grid: any; id?: number; };

    activeFigure.subscribe((value) => {
        currentFigure = value;
    });

    const setActive = (i: number, j: number) => {
       for(let x = 0; x < currentFigure.grid.length; x++){
           for(let y = 0; y < currentFigure.grid[0].length; y++){
                if(currentFigure.grid[x][y]){
                    grid[(i+x) % grid.length][(j+y) % grid[0].length] = true
                }
           }
       }
    };

    const setHover = (i: number, j: number) => {
        for(let x = 0; x < currentFigure.grid.length; x++){
           for(let y = 0; y < currentFigure.grid[0].length; y++){
                if(currentFigure.grid[x][y]){
                    document.getElementById(((i+x) % grid.length) + "-" + ((j+y) % grid[0].length))?.classList.add("hover")
                }
           }
       }
    };

    const removeHover = (i: number, j: number) => {
        for(let x = 0; x < currentFigure.grid.length; x++){
           for(let y = 0; y < currentFigure.grid[0].length; y++){
                document.getElementById(((i+x) % grid.length) + "-" + ((j+y) % grid[0].length))?.classList.remove("hover")
           }
       }
    }; 

</script>



<div style="grid-template-columns: repeat({gridWidth}, 1fr); grid-template-rows: repeat({gridHeight}, 1fr);">
    {#each grid as row, i}
        {#each row as _, j}
            <button
                id={i + "-" + j}
                on:click={() => {
                    setActive(i, j);
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
                        grid[i][j] = false;
                    }
                }}

                on:mouseleave={(e) => {
                    removeHover(i, j);
                }}

                on:contextmenu={(e) => {
                    e.preventDefault();
                }}


            />
        {/each}
    {/each}
</div>

<style lang="scss">
    div {
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

    button{
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

       
    }

    .hover{
            transition: background-color 0.2s ease-in-out;
            background-color: red;

    }

    .alive{
        background-color: #fff;
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
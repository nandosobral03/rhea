<script lang="ts">
    export let grid: boolean[][];
    export let gridWidth: number;
    export let gridHeight: number;
</script>



<div style="grid-template-columns: repeat({gridWidth}, 1fr); grid-template-rows: repeat({gridHeight}, 1fr);">
    {#each grid as row, i}
        {#each row as _, j}
            <button
                on:click={() => {
                    grid[i][j] = !grid[i][j];
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
                    if (e.buttons === 1) {
                        grid[i][j] = true;
                    }
                    if (e.buttons === 2) {
                        grid[i][j] = false;
                    }
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
        transition: background-color 0.2s ease-in-out;
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
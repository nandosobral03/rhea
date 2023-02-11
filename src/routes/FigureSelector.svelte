<script lang="ts">
	import Figure from "./Figure.svelte";
    import AddFigure from "./AddFigure.svelte";
	import { savedFigures } from "$lib/stores";
    type FigureType = {id: number, name: string, grid: boolean[][]};

    let figures: FigureType[] = [];
    savedFigures.subscribe((value) => {
        figures = value;
    });

    let reload = false;
   let adding = false;
    
    const add = (f:boolean[][]) => {
        adding = false;
        savedFigures.update((figures) => {
            figures.push({id: figures.length + 2, name: "New Figure", grid: f});
            return figures;
        });

    }

    const deleteFigure = (id: number) => {
        savedFigures.update((figures) => {
            figures = figures.filter((f) => f.id !== id);
            return figures;
        });
        reload = !reload;
    }
</script>


<div class="wrapper">
    {#if !adding}
        <div class="actions">
            <button on:click={() => adding = true}>
                <span class="material-symbols-outlined">
                    add_circle
                </span>
        </button>
        </div>
    {/if}
    {#if adding}
        <AddFigure on:save={(f) => add(f.detail)}/>
    {/if}

    {#key reload}
        {#each figures as figure}
            <Figure grid={figure.grid} name={figure.name} id={figure.id} on:delete={() => deleteFigure(figure.id)}/>
        {/each}
    {/key}
</div>

<style lang="scss">
    .wrapper{
        position: fixed;
        right: clamp(5px, 3%, 10px);
        height: 90%;
        width: fit-content;
        min-width: 260px;
        background-color: #505050;
        border-radius: 5px;
        overflow: auto;
    }
    .actions{
        display: flex;
        position: fixed;
        top: 0;
        right: 0;
        justify-content: flex-end;
        padding: 5px;
        button{
            background-color: transparent;
            border: none;
            color: #fff;
            line-height: 100%;
            aspect-ratio: 1/1;
            padding: 2px;
            display: flex;
            align-items: center;
            cursor: pointer;
            outline: none;
            &:hover{
                background-color: #fff;
                color: #505050;
                border-radius: 5px;
            }
        }
    }
</style>
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
            localStorage.setItem("figures", JSON.stringify(figures));
            return figures;
        });

    }

    const deleteFigure = (id: number) => {
        savedFigures.update((figures) => {
            figures = figures.filter((f) => f.id !== id);
            localStorage.setItem("figures", JSON.stringify(figures));
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
                    add
                </span>
        </button>
        </div>
    {/if}
    {#if adding}
        <AddFigure on:save={(f) => add(f.detail)} on:close = {() => adding = false}/>
    {/if}

    {#key reload}
        {#each figures as figure}
            <Figure grid={figure.grid} id={figure.id} on:delete={() => deleteFigure(figure.id)}/>
        {/each}
    {/key}
   


</div>




<style lang="scss">
    .wrapper{
        height: 100%;
        width: fit-content;
        min-width: 190px;
        background-color: var(--background);
        border-radius: 5px; 
        overflow-y: auto;
        padding: 5px;
    }
    .actions{
        width: 100%;
        justify-content: flex-end;
        padding: 5px;
        button{
            border: none;
            background-color: var(--accent);
            color: var(--background);
            line-height: 100%;
            width: 100%;
            padding: 2px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            outline: none;
            border-radius: 5px;
            &:hover{
                background-color: var(--hover);
            }
        }
    }

   
</style>
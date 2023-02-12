<script lang="ts">
	import { createEventDispatcher, onMount } from "svelte";
	import { playing, speed } from "../lib/stores";
        
    const dispatch = createEventDispatcher();
    
    speed.subscribe((value) => {

    })

    $: playing 

</script>

<div>
    {#if $playing}
        <button class="material-symbols-outlined" on:click={() => playing.set(false)} on:keydown={(e) => e.preventDefault()}> pause </button>
    {:else}
        <button class="material-symbols-outlined" on:click={() => playing.set(true)} on:keydown={(e) => e.preventDefault()}> play_arrow </button>
    {/if}

    <button class="material-symbols-outlined" on:click={() => dispatch('random')} on:keydown={(e) => e.preventDefault()}> shuffle </button>

    <button class="material-symbols-outlined" on:click={() => dispatch('reset')} on:keydown={(e) => e.preventDefault()}> stop </button>

    <button class="material-symbols-outlined" on:click={() => dispatch('nextStep')} on:keydown={(e) => e.preventDefault()}> step_over </button>

    <div class="range-input">
        <span class="progress-before" style="width: {($speed - 800) / 12}%"></span>
        <input type="range" min="800" max="2000" step="10" bind:value={$speed}>
        <span class="progress-after" style="width: {100 - (($speed - 800) / 12)}%"></span>
    </div>
</div>



<style lang="scss">
    *{
        user-select: none;
    }
    div{
        display: flex;
        gap: 10px;
    }

    button{
        font-size: 2rem;
        background-color: transparent;
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        outline: none;
        cursor: pointer;
        border-radius: 5px;
        color: var(--text);
        &:hover{
            background-color: var(--button-hover);
            color: var(--text-hover)
        }
    }

    .range-input{
        position: relative;
    }

    .progress-before{
        position: absolute;
        top: 11px;
        left: 0;
        width: 50%;
        height: 8px;
        border-radius: 12px;
        background-color: var(--accent);
    }

    .progress-after{
        position: absolute;
        top: 11px;
        right: 0;
        width: 50%;
        height: 8px;
        border-radius: 12px;
        background-color: var(--background);
    }



    input[type="range"] {
        -webkit-appearance: none;
        appearance: none;
        background-color: transparent;
        cursor: pointer;
        width: 100%;
        &:focus{
            outline: none;
        }
        &::-webkit-slider-runnable-track {
            // background-color: var(--background);
            height: 8px;
            border-radius: 12px;
            position: relative;
            z-index: 1;
        }
        &::-moz-range-track {
            // background-color: var(--background);
            height: 8px;
            border-radius: 12px;
            position: relative;
            z-index: 1;
        }   
        &::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            height: 16px;
            width: 16px;
            border-radius: 100%;

            background-color: var(--primary);
            outline: 2px solid var(--accent);

            margin-top: -5px;
            z-index: 1;
        }
        &::-moz-range-thumb {
            -webkit-appearance: none;
            appearance: none;
            height: 16px;
            width: 16px;
            border-radius: 100%;

            background-color: var(--primary);
            outline: 2px solid var(--background);

            z-index: 1;
        }

    }




    .material-symbols-outlined {
        font-variation-settings:
        'FILL' 0,
        'wght' 400,
        'GRAD' 0,
        'opsz' 48;
        color: var(--text)
    }


</style>
<script lang="ts">
	import { createEventDispatcher, onMount } from "svelte";
	import { playing, speed } from "../lib/stores";
        
    const dispatch = createEventDispatcher();
    let playingValue: boolean = false;


    playing.subscribe((value) => {
        playingValue = value;
    });

    onMount(() => {
        document.addEventListener('mousedown', (e) => {
            if(playingValue){
                let prev = playingValue;
                playing.set(false);
                document.addEventListener('mouseup', (e) => {
                    playing.set(prev);
                }, {once: true});
            }
        });

        
    });


    $: playing 

</script>

<div>
    {#if $playing}
        <button class="material-symbols-outlined" on:click={() => playing.set(false)}> pause </button>
    {:else}
        <button class="material-symbols-outlined" on:click={() => playing.set(true)}> play_arrow </button>
    {/if}

    <button class="material-symbols-outlined" on:click={() => dispatch('random')}> shuffle </button>

    <button class="material-symbols-outlined" on:click={() => dispatch('reset')}> stop </button>

    <button class="material-symbols-outlined" on:click={() => dispatch('nextStep')}> step_over </button>

    <input type="range" min="250" max="1500" step="10" bind:value={$speed}>

</div>

<style lang="scss">
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
        &:hover{
            background-color: #303030;
        }
    }


.material-symbols-outlined {
    font-variation-settings:
    'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 48;
    color: #fff;;
}


</style>
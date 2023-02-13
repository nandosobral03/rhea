<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { activeFigure, playing, savedFigures, speed } from '../lib/stores';
	import Controls from './Controls.svelte';
	import FigureSelector from './FigureSelector.svelte';
	import Grid from './Grid.svelte';
	import Loading from './Loading.svelte';

	let sizes = [20, 30, 50];
	let innerWidth: number;
	$: gridWidth = innerWidth > 750 ? sizes[2] : innerWidth > 500 ? sizes[1] : sizes[0];
	$: gridHeight = innerWidth > 750 ? sizes[2] : innerWidth > 500 ? sizes[1] : sizes[0];
	$: grid = Array.from({ length: gridHeight }, () =>
		Array.from({ length: gridWidth }, () => false)
	);

	let currentInterval: NodeJS.Timer | undefined;
	let intervalNumber: number;
	let playingValue: boolean = false;
	let currentFigure: { id: number; grid: boolean[][]; };
	let loading = true;
	activeFigure.subscribe((value) => {
		currentFigure = value;
	});


	speed.subscribe((value) => {
		intervalNumber = 1500 - value * 0.98;
		if (playingValue) {
			if (currentInterval) clearInterval(currentInterval);
			currentInterval = setInterval(() => {
				nextStep();
			}, intervalNumber);
		}
	});

	playing.subscribe((value) => {
		playingValue = value;
		if (currentInterval) clearInterval(currentInterval);

		if (value) {
			currentInterval = setInterval(() => {
				nextStep();
			}, intervalNumber);
		} else {
			clearInterval(currentInterval);
		}
	});

	onMount(() => {
		loading = false;

		innerWidth = window.innerWidth;
		function onResize() {
			innerWidth = window.innerWidth;
		}


		window.addEventListener('resize', onResize);

		document.addEventListener('keydown', (e) => {
			if (e.key === 'Escape') nextStep();
		});

		document.addEventListener('keydown', (e) => {
			if (e.key === ' ') playing.set(!playingValue);
			if (e.key === 'e') rotateCurrentFigure("r");
			if (e.key === 'q') rotateCurrentFigure("l");
		});



		const saved = localStorage.getItem('figures');
		if (saved) {
			const parsedFigures = JSON.parse(saved);
			if (parsedFigures.length > 0) {
				savedFigures.set(parsedFigures);
			}
		}
	});


	const rotateCurrentFigure = (direction:"r" | "l") =>{
		if(!currentFigure) return;
		let max = Math.max(currentFigure.grid.length, currentFigure.grid[0].length);
		let newGrid = Array.from({ length: max }, () =>
			Array.from({ length: max }, () => false)
		);

		if(direction === "r"){
			for (let i = 0; i < currentFigure.grid.length; i++) {
				for (let j = 0; j < currentFigure.grid[0].length; j++) {
					newGrid[j][currentFigure.grid.length - i - 1] = currentFigure.grid[i][j];
				}
			}
		}else{
			for (let i = 0; i < currentFigure.grid.length; i++) {
				for (let j = 0; j < currentFigure.grid[0].length; j++) {
					newGrid[currentFigure.grid[0].length - j - 1][i] = currentFigure.grid[i][j];
				}
			}
		}

		currentFigure.grid = newGrid;
		activeFigure.set(currentFigure);
	}

	onDestroy(() => {
		clearInterval(currentInterval);

	});

	const nextStep = () => {
		let newGrid = Array.from({ length: gridHeight }, () =>
			Array.from({ length: gridWidth }, () => false)
		);
		for (let i = 0; i < gridHeight; i++) {
			for (let j = 0; j < gridWidth; j++) {
				if (grid[i][j]) {
					let neightbours = countNeighbours(i, j);
					if (neightbours === 2 || neightbours === 3) newGrid[i][j] = true;
				} else {
					let neightbours = countNeighbours(i, j);
					if (neightbours === 3) newGrid[i][j] = true;
				}
			}
		}
		grid = newGrid;
	};

	const countNeighbours = (i: number, j: number) => {
		let aliveNeighbours = 0;
		let prevI = i > 0 ? i - 1 : gridHeight - 1;
		let nextI = i < gridHeight - 1 ? i + 1 : 0;
		let prevJ = j > 0 ? j - 1 : gridWidth - 1;
		let nextJ = j < gridWidth - 1 ? j + 1 : 0;
		let iRange = [prevI, i, nextI];
		let jRange = [prevJ, j, nextJ];

		for (let x of iRange) {
			for (let y of jRange) {
				if (x === i && y === j) continue;
				if (grid[x][y]) aliveNeighbours++;
			}
		}

		return aliveNeighbours;
	};

	const generateGrid = () => {
		playing.set(false);
		let newGrid = Array.from({ length: gridHeight }, () =>
			Array.from({ length: gridWidth }, () => false)
		);

		return newGrid;
	};

	const generateRandomGrid = () => {
		let newGrid = Array.from({ length: gridHeight }, () =>
			Array.from({ length: gridWidth }, () => Math.random() > 0.5)
		);
		return newGrid;
	};

	let isOpen = false;
</script>

<svelte:window bind:innerWidth />

<div class="wrapper">
	{#if loading}
		<div class="loading">
			<Loading/>
		</div>
	{:else}
		<Grid {grid} {gridWidth} {gridHeight} />
	<Controls
		on:reset={() => (grid = generateGrid())}
		on:random={() => (grid = generateRandomGrid())}
		on:nextStep={nextStep}
	/>
	{/if}

	<div class="selector" class:open={isOpen}>
		<FigureSelector />
		<button
			class="handle"
			on:click={() => {
				isOpen = !isOpen;
			}}
		>
			<span class="material-symbols-outlined"> {
                !isOpen ? 'arrow_back_ios' : 'arrow_forward_ios'
                } </span>
		</button>
	</div>
</div>

<style lang="scss">
	.wrapper {
		width: calc(100% - 20px);
		height: calc(100% - 20px);
		box-sizing: content-box;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 10px;
		padding: 10px;
	}

	.handle {
		position: absolute;
		left: -25px;
		width: 25px;
		height: 50px;
		padding: 0px;
		top: calc(50% - 25px);
		background-color: var(--background);
		border: none;
		display: flex;
		align-items: center;
		justify-content: center;
		border-top-left-radius: 10px;
		border-bottom-left-radius: 10px;
		cursor: pointer;
		z-index: 1;
		user-select: none;
		.material-symbols-outlined {
			font-size: 16px;
			color: var(--accent);
		}
	}

	.selector {
		display: flex;
		position: fixed;
		right: clamp(5px, 3%, 10px);
		height: 90%;
		border-radius: 5px;
		width: fit-content;
		transform: translateX(200px);
		transition: transform 0.5s ease;
	}

	.selector.open {
		transform: translateX(0px);
		transition: transform 0.5s ease;
	}

	.loading{
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	
</style>

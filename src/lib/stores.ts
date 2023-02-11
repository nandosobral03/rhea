import { writable } from "svelte/store";
type FigureType = {id:number, name:string, grid:boolean[][] };

export const playing = writable(false);
export const speed = writable(875);
export const activeFigure = writable({
    id: 0,
    grid:[[true]]
});

export const savedFigures = writable<FigureType[]>(

    [{id: 1, name: "Glider", grid: [[false, true, false], [false, false, true], [true, true, true]]},
     {id: 2, name: "Glider Gun", grid: [[false,true,true,true,false],[true,true,true,true,true],[false,true,true,true,false],[false,false,false,false,false,]]},
        {id: 3, name: "Pulsar", grid: [[false,false,false,false,false,false,false,false]]},
    
    
    ]    

);

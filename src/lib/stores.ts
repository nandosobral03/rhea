import { writable } from "svelte/store";
type FigureType = {id:number, name:string, grid:boolean[][] };

export const playing = writable(false);
export const speed = writable(1275);
export const activeFigure = writable({
    id: 0,
    grid:[[true]]
});

export const savedFigures = writable<FigureType[]>(

    [{id: 1, name: "Glider", grid: 
    [
        [false, true, false], 
        [false, false, true], 
        [true, true, true]]},
      {id: 2, name: "LWSS", grid:
        [  
        [ false, false, true, true, false],
        [ true, true, false, true, true],
        [ true, true, true, true, false],
        [ false, true, true, false, false]
        ]},

        { id: 3, name: "MWSS", grid:
        [
            [false,false,false,false,false,false],
            [false,true,true,true,false,false],
            [true,true,true,true,true,false],
            [true,true,true,false,true,true],
            [false,false,false,true,true,false]
        ]},
        {
            id: 4, name: "Diehard", grid:
            [
                [false, false, false, false, false, false, false, false],
                [false, false, false, false, false, false, false, false],
                [false, false, false, false, false, false, true, false],
                [true,true, false, false, false, false, false, false],
                [false, true, false, false, false, true, true, true],
                [false, false, false, false, false, false, false, false],
                [false, false, false, false, false, false, false, false],
        
        
            ]
        },
        {
            id: 5, name: "Block", grid:
            [ 
                [true,true,true,true,true],
                [true,true,true,true,true],
                [true,true,true,true,true],
                [true,true,true,true,true],
                [true,true,true,true,true]
            ]
        },
        {
            id: 6, name: "Line", grid:
            [
                [true,true,true,true,true],
            ]
        }


    
    ]    

);

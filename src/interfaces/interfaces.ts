export interface stateInterface{
    direction: string;
    snakeDotsPos: number[][];
    food: number[]
}

export interface actionInterface{
    type: string;
    payload?: string;
}
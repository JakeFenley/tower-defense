interface Enemies {
    spawn: (level: number) => void;
    reset: () => void;
    move: () => void;
    draw: () => void;
}
declare function enemies(ctx: CanvasRenderingContext2D): Enemies;
export default enemies;

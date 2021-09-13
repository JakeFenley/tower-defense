export interface EnemyConfigProps {
    health?: number;
    speed?: number;
    imgSrc?: string;
}
export interface Enemy {
    move: () => void;
    getImg: () => HTMLImageElement;
    getCoords: () => {
        x: number;
        y: number;
    };
    imgLoaded: () => boolean;
}
export default function enemy(level: number): Enemy;

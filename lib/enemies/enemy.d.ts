export interface EnemyConfigProps {
    health?: number;
    speed?: number;
    imageSrc?: string;
}
export interface Enemy {
    move: () => void;
    getImage: () => HTMLImageElement;
    getCoords: () => {
        x: number;
        y: number;
    };
    imageLoaded: () => boolean;
}
export default function enemy(level: number): Enemy;

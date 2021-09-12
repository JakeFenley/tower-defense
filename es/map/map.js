import { ROAD_PATH_COORDS, TILE_SQ, TREE_COORDS } from './map-settings';
function buildGrass(width, height) {
    let grass = [];
    for (let x = 0; x < width / TILE_SQ; x++) {
        for (let y = 0; y < height / TILE_SQ; y++) {
            grass.push({
                x: x,
                y: y,
                imageSrc: '/assets/grass_tile.png',
            });
        }
    }
    return grass;
}
function buildRoad() {
    const road = ROAD_PATH_COORDS.map((tile) => {
        return Object.assign(Object.assign({}, tile), { imageSrc: '/assets/desert_tile.png' });
    });
    return road;
}
function buildTrees() {
    const road = TREE_COORDS.map((tile) => {
        return Object.assign(Object.assign({}, tile), { imageSrc: '/assets/chestnut_tree.png' });
    });
    return road;
}
function initMap(canvas, ctx) {
    const { width, height } = canvas;
    const _base = buildGrass(width, height);
    const _road = buildRoad();
    const _trees = buildTrees();
    const _map = [..._base, ..._road, ..._trees];
    const _images = {};
    const draw = () => {
        Object.keys(_images).forEach((key) => {
            const image = _images[key];
            if (image.loaded) {
                ctx.drawImage(image.image, image.x * TILE_SQ, image.y * TILE_SQ, TILE_SQ, TILE_SQ);
            }
        });
    };
    const _makeHash = (x, y, src) => {
        const imgPathSplit = src.split('/');
        return 'x_' + x + '_y_' + y + '_img_' + imgPathSplit[imgPathSplit.length - 1];
    };
    const _makeImages = () => {
        _map.forEach((tile) => {
            const img = new Image();
            img.src = tile.imageSrc;
            const hash = _makeHash(tile.x, tile.y, img.src);
            _images[hash] = {
                image: img,
                loaded: false,
                x: tile.x,
                y: tile.y,
            };
            img.onload = () => {
                _images[hash].loaded = true;
            };
        });
    };
    _makeImages();
    return { draw: draw };
}
export default initMap;
//# sourceMappingURL=map.js.map